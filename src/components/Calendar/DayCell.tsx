
import React, { useState } from 'react';
import Task from '../Task/Task';
import * as S from './DayCell.styles';


interface Label {
  text: string;
  color: string; // Hex color code
}

interface TaskType {
  id: number;
  text: string;
  date: string;
  labels: Label[]; 
}

interface Holiday {
  date: string;
  localName: string;
}

interface DayCellProps {
  date: Date;
  tasks: TaskType[];
  holidays: Holiday[];
  viewMode: string;
  onAddTask: (newTask: TaskType) => void; // Callback for adding a new task
  onUpdateTask: (updatedTask: TaskType) => void; // Callback for updating a task
}


const DayCell: React.FC<DayCellProps> = ({ date, tasks, holidays, viewMode, onAddTask, onUpdateTask }) => {

  // const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    const newTask = {
      id: Date.now(), 
      text: newTaskText,
      date: date.toISOString().split('T')[0],
      labels: [], // Add labels as needed
    };
    onAddTask(newTask); // Use the callback to add the new task
    setNewTaskText('');
  };

  const handleUpdateTask = (taskId: number, newText: string) => {
    const updatedTask = tasks.find(task => task.id === taskId);
    if (updatedTask) {
      updatedTask.text = newText;
      onUpdateTask(updatedTask); 
    }
  };

  return (
    <S.Cell>
        <S.DateLabel>{date.toDateString()}</S.DateLabel>
      {holidays.map((holiday, index) => (
        <S.HolidayLabel key={index}>{holiday.localName}</S.HolidayLabel>
      ))}
     <div>
            {tasks.map(task => (
                <Task key={task.id} task={task} onUpdateTask={handleUpdateTask} />
            ))}
          
              <S.TaskInput
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="What do u got today...?"
            />
            <S.AddTaskButton onClick={handleAddTask}>+</S.AddTaskButton>

        </div>
    </S.Cell>
  );
};

export default DayCell;
