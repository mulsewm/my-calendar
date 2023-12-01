import React, { useState,useEffect } from 'react';
import Label from '../Label/Label';

interface TaskProps {
    task: {
        id: number;
        text: string;
        labels: Label[]; 
    };
    onUpdateTask: (id: number, newText: string) => void;
}
export interface TaskType {
    id: number;
    text: string;
    date?: string; 
    taskColor?: string; 
    labels: Label[]; 
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

    const renderLabels = () => {
        return task.labels.map((label, index) => (
          <div key={index} style={{ backgroundColor: label.color, color: '#fff', padding: '2px 5px', borderRadius: '5px', margin: '2px' }}>
            {label.text}
          </div>
        ));
      };

    return (
        <div style={{ backgroundColor: taskColor, padding: '10px', margin: '5px 0', borderRadius: '5px' }}>
        {renderLabels()}
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