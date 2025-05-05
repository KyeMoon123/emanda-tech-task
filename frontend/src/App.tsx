import React, {useState} from 'react';
import {TaskProvider, useTasks} from './context/TaskContext';
import {TaskList} from './components/TaskList';
import Button from "@/Components/Button";
import PageHeader from "@/Components/PageHeader";
import {Toaster} from 'react-hot-toast';

const Main = () => {
    const [title, setTitle] = useState('');
    const {addTask, isCreatingTask} = useTasks();

    return (
        <div className={'bg-gray-100 min-h-screen p-4'}>
            <PageHeader
                title={'Task Tracker'}
                subtitle={'Manage your tasks efficiently'}
            />
            <div>
                <input
                    type="text"
                    className="border border-gray-300 rounded p-2 mr-2 w-1/2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Task"
                />
                <Button
                    label="Add Task"
                    loading={isCreatingTask}
                    onClick={() => {
                        addTask(title);
                        setTitle('');
                    }}
                />
            </div>
            <div className={'mt-4 bg-white p-4 rounded shadow'}>
                <TaskList/>
            </div>
        </div>
    );
};

const App = () => (
    <TaskProvider>
        <Main/>
        <Toaster/>
    </TaskProvider>
);

export default App;
