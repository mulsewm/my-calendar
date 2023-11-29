import React, { useState,useEffect } from 'react';

interface TaskProps {
    task: {
        id: number;
        text: string;
    };
    onUpdateTask: (id: number, newText: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdateTask }) => {
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


    return (
        <div style={{ backgroundColor: taskColor }}>
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
    );
};

export default Task;