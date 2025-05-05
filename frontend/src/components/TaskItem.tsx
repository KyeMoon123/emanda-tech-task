import React, {useState} from 'react';
import {TaskResponseDto} from '@/Api/schemas/taskResponseDto';
import {useTasks} from '../context/TaskContext';
import Button from "@/Components/Button";

/**
 * A component that displays a single task and its subtasks.
 * @param task - The task to display.
 * @constructor
 */
export const TaskItem: React.FC<{ task: TaskResponseDto }> = ({task}) => {
    const [subtaskTitle, setSubtaskTitle] = useState('');
    const {addTask} = useTasks(); // Access tasks to find subtasks
    const [showSubtasks, setShowSubtasks] = useState(true);

    return (
        <div
            className={`border vb rounded-lg p-3 my-2`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <strong>{task.title}</strong>
                </div>
                {
                    task.subtasks && task.subtasks.length > 0 &&
                    (<Button
                        label={showSubtasks ? 'Hide Subtasks' : 'Show Subtasks'}
                        onClick={() => setShowSubtasks(!showSubtasks)}
                    />)
                }
            </div>
            <div className="mt-2">
                <input
                    value={subtaskTitle}
                    onChange={(e) => setSubtaskTitle(e.target.value)}
                    placeholder="Subtask Title"
                    className="mr-2 border rounded p-2 w-1/4"
                />
                <Button
                    label="Add Subtask"
                    onClick={() => {
                        addTask(subtaskTitle, task.id);
                        setSubtaskTitle('');
                    }}
                />
            </div>
            {showSubtasks && task.subtasks && task.subtasks.length > 0 && (
                <div className="mt-4">
                    {task.subtasks.map((subtask) => (
                        <TaskItem key={subtask.id} task={subtask}/>
                    ))}
                </div>
            )}
        </div>
    );
};
