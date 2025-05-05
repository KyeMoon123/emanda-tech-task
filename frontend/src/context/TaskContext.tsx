import React, {createContext, useContext} from 'react';
import {TaskResponseDto} from "@/Api/schemas";
import {useCreateTask, useFindAllNestedTasks} from "@/Api/tasks";
import toast from "react-hot-toast";

interface TaskContextType {
    tasks: TaskResponseDto[] | undefined;
    addTask: (title: string, parentId?: number) => void;
    tasksLoading: boolean;
    isCreatingTask: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * TaskProvider is a context provider for managing tasks.
 * @param children
 * @constructor
 */
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {data: tasks, isError, isLoading, refetch: refetchTasks} = useFindAllNestedTasks();
    const createTask = useCreateTask()
    const addTask = async (title: string, parentId?: number) => {
        if (!title) {
            toast.error('Task title is required');
            return;
        }
        await createTask.mutateAsync({data: {title, parentId}}, {
            onSuccess: async () => {
                await refetchTasks();
            },
            onError: (error) => {
                console.error('Error creating task:', error);
            }
        })
    };

    return <TaskContext.Provider value={{
        tasks,
        addTask,
        tasksLoading: isLoading,
        isCreatingTask: createTask.isPending
    }}>{children}</TaskContext.Provider>;
};

export const useTasks = (): TaskContextType => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used within TaskProvider');
    return context;
};
