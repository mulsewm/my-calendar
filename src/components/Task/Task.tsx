        import React, { useState, useEffect } from 'react';
        import Label from '../Label/Label';
        import { Draggable } from 'react-beautiful-dnd';

        interface TaskProps {
            task: TaskType;
            index: number;
            onUpdateTask: (id: number, newText: string) => void;
        }
        export interface TaskType {
            id: number;
            text: string;
            date?: string;
            taskColor?: string;
            labels: Label[];
        }



        const Task: React.FC<TaskProps> = ({ task, index, onUpdateTask }) => {
            const [isEditing, setIsEditing] = useState(false);
            const [editedText, setEditedText] = useState(task.text);
            const [taskColor, setTaskColor] = useState<string>('#000'); // Set initial color

            const getRandomColor = () => {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            };

            useEffect(() => {
                setTaskColor(getRandomColor());
            }, []);

            const handleEdit = () => {
                onUpdateTask(task.id, editedText);
                setIsEditing(false);
            };

            const renderLabels = () => {
                return task.labels.map((label, index) => (
                    <div key={index} style={{ backgroundColor: label.color, color: '#fff', padding: '2px 5px', borderRadius: '5px', margin: '2px' }}>
                        {label.text}
                    </div>
                ));
            };

            return (

                <Draggable draggableId={task.id.toString()} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, }}
                    >

                            {isEditing ? (

                                <>
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <button onClick={handleEdit}>Save</button>
                                </>
                            ) : (
                                <>
                                    <span onDoubleClick={() => setIsEditing(true)}>{task.text}</span>
                                </>
                            )}
                        </div>
                    )}
                </Draggable>

            );
        };

        export default Task;