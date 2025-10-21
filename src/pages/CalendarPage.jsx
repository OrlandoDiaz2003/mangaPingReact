import React from 'react';
import CalendarCard from '../components/CalendarCard';

export default function CalendarPage(){
    return (
        <>
            <main>
                <div>
                    <h1 className="calendar-title">Calendar Page</h1>
                    <CalendarCard />
                </div>
            </main>
        </>
    )
}