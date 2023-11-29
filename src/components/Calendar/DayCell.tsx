// src/components/Calendar/DayCell.tsx

import React, { useState } from 'react';
import Task from '../Task/Task'; // Make sure you have this component
import * as S from './DayCell.styles';

interface TaskType {
    id: number;
    text: string;
}

const DayCell: React.FC<{ date: Date }> = ({ date }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = () => {
        if (newTaskText.trim() === '') {
            alert('Task cannot be empty');
            return;
        }
        const newTask = { id: Date.now(), text: newTaskText };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    };

    const handleUpdateTask = (taskId: number, newText: string) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, text: newText } : task));
    };

    return (
        <S.Cell>
            <S.DateLabel>{date.toDateString()}</S.DateLabel>
            {tasks.map(task => (
                <Task key={task.id} task={task} onUpdateTask={handleUpdateTask} />
            ))}
            <S.TaskInput
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new task"
            />
            <S.AddTaskButton onClick={handleAddTask}>+</S.AddTaskButton>
        </S.Cell>
    );
};

export default DayCell;
