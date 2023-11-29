
import React from 'react';
import DayCell from './DayCell';
interface CalendarProps {
    text: string;
    color: string;
  }
const Calendar: React.FC = () => {
    const startDate = new Date(); // Replace with the actual start date of the calendar
    const totalDays = 30; // Replace with the actual number of days in the calendar view

    const renderDayCells = () => {
        const dayCells = [];
        for (let i = 0; i < totalDays; i++) {
            const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
            dayCells.push(<DayCell key={i} date={date} />);
        }
        return dayCells;
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gridGap: '10px',
            padding: '10px',
            backgroundColor: '#f7f7f7'
        }}>
        {renderDayCells()}
    </div>
    );
};

export default Calendar;
