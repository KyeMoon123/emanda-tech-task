import React from 'react';
import {useTasks} from '../context/TaskContext';
import {TaskItem} from './TaskItem';


/**
 * A component that displays a list of tasks.
 * @constructor
 */
export const TaskList: React.FC = () => {
    const {tasks} = useTasks();
    const topLevelTasks = tasks?.filter((task) => !task?.parentId);

    // Empty state
    if (topLevelTasks?.length == 0) return (
        <div className={'text-center mt-4 bg-white p-4 rounded'}>
            <p>No top-level tasks found.</p>
            <p className={'text-gray-600'}>You can add a new task using the button above.</p>
            <p className={'text-gray-600'}>Tasks can be nested, so you can create subtasks under existing tasks.</p>
        </div>
    )

    return (
        <div>
            {topLevelTasks?.map((task) => <TaskItem key={task.id} task={task}/>)}
        </div>
    );
};