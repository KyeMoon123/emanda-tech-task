import React from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({title, subtitle}: PageHeaderProps) {
    return (
        <div className={'my-4 pb-10'}>
            <h1 className={'text-2xl font-bold'}>{title}</h1>
            <p className={'text-gray-600'}>{subtitle}</p>
        </div>
    )
}