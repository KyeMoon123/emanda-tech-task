import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = new QueryClient({});
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </React.StrictMode>
)
;
