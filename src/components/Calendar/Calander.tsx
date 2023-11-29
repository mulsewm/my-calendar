// src/components/Calendar/Calendar.tsx

import React, { useState } from 'react';
import DayCell from './DayCell';
import Navbar from '../Navbar/Navbar'; // Assuming NavBar is properly set up
import * as S from './Calendar.styles';

const Calendar: React.FC = () => {
    // State to store the current view mode and current date
    const [viewMode, setViewMode] = useState('month'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());

    // Function to get the start date of the week
    const getWeekStartDate = (date: Date) => {
        const startDate = new Date(date);
        const day = startDate.getDay();
        const diff = startDate.getDate() - day + (day === 0 ? -6 : 0); // adjust when week starts
        return new Date(startDate.setDate(diff));
    };

    // Calculate the days to display based on the view mode
    const calculateDaysToShow = () => {
        let daysToShow = [];
        let startDate;

        if (viewMode === 'week') {
            startDate = getWeekStartDate(currentDate);
            for (let i = 0; i < 7; i++) {
                daysToShow.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
            }
        } else { // 'month' view
            const startMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            startDate = getWeekStartDate(startMonth);
            // assuming 6 weeks coverage in a month view
            for (let i = 0; i < 42; i++) {
                daysToShow.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
            }
        }

        return daysToShow;
    };

    const daysToShow = calculateDaysToShow();

    // Handler for view mode change
    const handleViewChange = (view: string) => {
        setViewMode(view);
    };

    return (
        <>
            <Navbar onViewChange={handleViewChange} />
            <S.CalendarGrid>
                {daysToShow.map((day, index) => (
                    <DayCell key={index} date={day} viewMode={viewMode} />
                ))}
            </S.CalendarGrid>
        </>
    );
};

export default Calendar;
