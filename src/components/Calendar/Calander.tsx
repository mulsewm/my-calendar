        // src/components/Calendar/Calendar.tsx

        import React, { useState, useEffect } from 'react';
        import DayCell from './DayCell';
        import Task from '../Task/Task';
        import Navbar from '../Navbar/Navbar';
        import * as S from './Calendar.styles';
        import Label from '../Label/Label';
        import { CalendarHeader, ViewControls, CalendarGrid, WeekdayFooter, FooterItem } from './Calendar.styles';
        import html2canvas from 'html2canvas';
        import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
        import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
        import { DragDropContext, DropResult } from 'react-beautiful-dnd';


        interface Holiday {
            date: string;
            localName: string;
        }

        interface TaskType {
            id: number;
            text: string;
            date: string;
            labels: Label[];
        }

        type TasksByDayType = {
            [key: string]: TaskType[];
        };

        const Calendar: React.FC = () => {
            // State to store the current view mode and current date
            const [viewMode, setViewMode] = useState('month'); // 'week' or 'month'
            const [currentDate, setCurrentDate] = useState(new Date());
            const [holidays, setHolidays] = useState<Holiday[]>([]);
            const [currentFilter, setCurrentFilter] = useState<'week' | 'month'>('week');
            const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
            const [daysToShow, setDaysToShow] = useState<Date[]>([]);
            const [allTasks, setAllTasks] = useState<TaskType[]>([]);
            const [tasksByDay, setTasksByDay] = useState<TasksByDayType>({});

            const getWeekStartDate = (date: Date) => {
                const startDate = new Date(date);
                const day = startDate.getDay();
                const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); 
                return new Date(startDate.setDate(diff));
            };

            // Then use the function to set the initial state
            const [weekStartDate, setWeekStartDate] = useState<Date>(getWeekStartDate(new Date()));


            const collectTasks = (newTasks: TaskType[]) => {
                setAllTasks([...allTasks, ...newTasks]);
            };
            // const [allTasks, setAllTasks] = useState<TaskType[]>([

            // ]);


            const fetchTasksForDay = (date: Date): TaskType[] => {
                const dateString = date.toISOString().split('T')[0];
                return allTasks.filter(task => task.date === dateString);
            };
            const handleAddTask = (newTask: TaskType) => {
                setAllTasks(prevTasks => [...prevTasks, newTask]);

                const dayKey = newTask.date;
                setTasksByDay(prevTasksByDay => {
                    const updatedTasks = prevTasksByDay[dayKey] ? [...prevTasksByDay[dayKey], newTask] : [newTask];
                    return { ...prevTasksByDay, [dayKey]: updatedTasks };
                });
            };


            const handleUpdateTask = (updatedTask: TaskType) => {
                setAllTasks(allTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
            };



            useEffect(() => {
                const fetchHolidays = async () => {
                    const year = currentDate.getFullYear();
                    const countryCode = 'US'; //US is selected or hardcoded
                    try {
                        const response = await fetch(`https://date.nager.at/Api/v2/PublicHolidays/${year}/${countryCode}`);
                        if (response.ok) {
                            const data: Holiday[] = await response.json();
                            setHolidays(data);
                        } else {
                            console.error('Failed to fetch holidays');
                        }
                    } catch (error) {
                        console.error('Error fetching holidays:', error);
                    }

                };
                fetchHolidays();
                const days = calculateDaysToShow();
                setDaysToShow(days);

                const groupedTasks = allTasks.reduce<TasksByDayType>((acc, task) => {
                    const dayKey = task.date; // Assuming task.date is in ISO string format
                    acc[dayKey] = acc[dayKey] ? [...acc[dayKey], task] : [task];
                    return acc;
                }, {});

                setTasksByDay(groupedTasks);
            }, [allTasks, currentDate, currentFilter, currentMonth, weekStartDate]);




            const calculateDaysToShow = () => {
                let daysToShow = [];
                if (currentFilter === 'week') {
                    for (let i = 0; i < 7; i++) {
                        const newDate = new Date(weekStartDate);
                        newDate.setDate(newDate.getDate() + i);
                        daysToShow.push(newDate);
                    }
                } else if (currentFilter === 'month') {
                    
                    const startDate = new Date(currentDate.getFullYear(), currentMonth, 1);
                    // Get the number of days in the month
                    const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
                    for (let i = 0; i < daysInMonth; i++) {
                        daysToShow.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
                    }
                }

                return daysToShow;
            };


            // Handler for view mode change
            const handleViewChange = (view: string) => {
                setViewMode(view);
            };
            const handleDownloadAsPng = async () => {

                const calendarElement = document.getElementById('calendar');

                if (calendarElement) {
                    const canvas = await html2canvas(calendarElement);
                    // Create an image from the canvas
                    const image = canvas.toDataURL('image/png');
                    // Create a link to download the image
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = 'calendar.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            };

            // Export to CSV function
            const exportToCsv = () => {
                console.log("Exporting tasks:", allTasks);

                let csvContent = "data:text/csv;charset=utf-8,";
                csvContent += "Date, Task ID, Task Text, Task Color\n"; // Column headers

                allTasks.forEach(task => {
                    const row = `${task.date}, ${task.id}, "${task.text}"\n`;
                    csvContent += row;
                });
                // Create a Blob with the CSV content
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "calendar_tasks_data.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
            // Week navigation functions
            const moveToPreviousWeek = () => {
                setWeekStartDate((prevStartDate) => {
                    const newStartDate = new Date(prevStartDate);
                    newStartDate.setDate(newStartDate.getDate() - 7);
                    return newStartDate;
                });
            };

            const moveToNextWeek = () => {
                setWeekStartDate((prevStartDate) => {
                    const newStartDate = new Date(prevStartDate);
                    newStartDate.setDate(newStartDate.getDate() + 7);
                    return newStartDate;
                });
            };




            const updateTasksInDay = (day: Date, updatedTasks: TaskType[]) => {
                setTasksByDay(prevTasksByDay => {
                    const dayKey = day.toISOString().split('T')[0];
                    return {
                        ...prevTasksByDay,
                        [dayKey]: updatedTasks,
                    };
                });
            };


            const onDragEnd = (result: DropResult) => {
                const { destination, source, draggableId } = result;

                if (!destination) return;

                const startDayKey = source.droppableId;
                const finishDayKey = destination.droppableId;

                const startTasks = tasksByDay[startDayKey] || [];
                const finishTasks = startDayKey === finishDayKey ? startTasks : (tasksByDay[finishDayKey] || []);

                if (!tasksByDay[startDayKey]) {
                    console.error(`No tasks found for day: ${startDayKey}`);
                    return;
                }
                const draggedTaskIndex = startTasks.findIndex(task => task.id === parseInt(draggableId, 10));

                if (draggedTaskIndex === -1) return;
                if (draggedTaskIndex === -1) {
                    console.error("Dragged task not found");
                    return;
                }

                const [movedTask] = startTasks.splice(draggedTaskIndex, 1);
                finishTasks.splice(destination.index, 0, movedTask);

                const newTasksByDay = {
                    ...tasksByDay,
                    [startDayKey]: startTasks,
                    [finishDayKey]: finishTasks
                };

                setTasksByDay(newTasksByDay);
            };





            return (
                <>
                    {/* navbar */}


                    <Navbar onViewChange={handleViewChange} onDownloadAsPng={handleDownloadAsPng} onExportToCsv={exportToCsv} />
                    <div id='calendar'>

                        <CalendarHeader>
                            <select value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                                ))}
                            </select>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button
                                    onClick={moveToPreviousWeek}
                                    style={{
                                        background: 'darkgray',
                                        border: 'none',
                                        padding: '5px',
                                        cursor: 'pointer',
                                        marginRight: '5px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                                <button
                                    onClick={moveToNextWeek}
                                    style={{
                                        background: 'darkgray',
                                        border: 'none',
                                        padding: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </div>
                            <ViewControls>
                                <button
                                    className={currentFilter === 'week' ? 'active' : ''}
                                    onClick={() => setCurrentFilter('week')}>
                                    Week
                                </button>
                                <button
                                    className={currentFilter === 'month' ? 'active' : ''}
                                    onClick={() => {
                                        setCurrentFilter('month');
                                    }}>
                                    Month
                                </button>
                            </ViewControls>

                        </CalendarHeader>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <S.CalendarGrid>
                                {daysToShow.map((day, index) => {
                                    const tasksForDay = fetchTasksForDay(day);
                                    return (
                                        <DayCell
                                            key={index}
                                            date={day}
                                            tasks={tasksForDay}
                                            holidays={holidays.filter(holiday => holiday.date === day.toISOString().split('T')[0])}
                                            viewMode={viewMode}
                                            onAddTask={handleAddTask}
                                            onUpdateTask={handleUpdateTask}
                                        />
                                    );
                                })}
                            </S.CalendarGrid>
                            <WeekdayFooter>
                                {['1', '2', '3', '4', '5', '6', '7'].map((num) => (
                                    <FooterItem key={num}>{num}</FooterItem>
                                ))}
                            </WeekdayFooter>
                        </DragDropContext>
                    </div>

                </>
            );
        };

        export default Calendar;
