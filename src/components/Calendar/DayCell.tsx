// src/components/Calendar/DayCell.tsx

import React, { useState } from 'react';
import Task from '../Task/Task';
import * as S from './DayCell.styles';

interface DayCellProps {
    date: Date;
}

const DayCell: React.FC<DayCellProps> = ({ date }) => {
    const [tasks, setTasks] = useState<Array<{ id: number; text: string }>>([]);
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = () => {
        const newTask = { id: Date.now(), text: newTaskText };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    };

    const handleUpdateTask = (id: number, newText: string) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
    };

    return (
        <S.Cell>
        <div>{date.toDateString()}</div>
        {tasks.map(task => (
            <Task key={task.id} task={task} onUpdateTask={handleUpdateTask} />
        ))}
        <S.AddTaskInput
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
        />
        <S.AddTaskButton onClick={handleAddTask}>Add Task</S.AddTaskButton>
    </S.Cell>
    );
};

export default DayCell;
