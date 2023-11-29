import React from 'react';
import Calendar from './components/Calendar/Calander';
import Task from './components/Task/Task';
import Label from './components/Label/Label';
import Navbar from './components/Navbar/Navbar';
function App() {
  interface LabelProps {
    text: string;
    color: string;
  }
 
  const taskData = {
    id: 1,
    text: 'Sample Task',
  };

  const updateTask = (id: number, newText: string) => {
    console.log(`Updating task ${id} with text: ${newText}`);
  };
 

  return (
    <div className="App">
      <Calendar />
      {/* <Task task={taskData} onUpdateTask={updateTask} />
      <Label text="Sample Label" color="#ff0000" /> */}

    </div>
  );
}

export default App;
