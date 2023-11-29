// src/components/Task/Task.tsx

import React, { useState } from 'react';

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

    const handleEdit = () => {
        onUpdateTask(task.id, editedText);
        setIsEditing(false);
    };

    return (
        <div>
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
