// Task.d.ts

declare module 'Task' {
    const Task: React.ComponentType<{ key: number; task: { id: number; text: string }; onUpdateTask: (id: number, newText: string) => void }>;
    export default Task;
}