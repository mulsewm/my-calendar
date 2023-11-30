    // src/components/Calendar/Calendar.tsx

    import React, { useState, useEffect } from 'react';
    import DayCell from './DayCell';
    import Navbar from '../Navbar/Navbar';
    import * as S from './Calendar.styles';
    interface Holiday {
        date: string;
        localName: string;
       
    }
    const Calendar: React.FC = () => {
        // State to store the current view mode and current date
        const [viewMode, setViewMode] = useState('month'); // 'week' or 'month'
        const [currentDate, setCurrentDate] = useState(new Date());
        const [holidays, setHolidays] = useState<Holiday[]>([]);

        useEffect(() => {
            const fetchHolidays = async () => {
                const year = currentDate.getFullYear();
                const countryCode = 'US'; //US is selected hardcoded
                try {
                    const response = await fetch(`https://date.nager.at/Api/v2/PublicHolidays/${year}/${countryCode}`);
                    if (response.ok) {
                        const data: Holiday[] = await response.json();
                        setHolidays(data);
                    } else {
                        console.error('Failed to fetch holidays');
                    }
                } catch (error) {
                    console.error('Error fetching holidays:', error);
                }
            };

            fetchHolidays();
        }, [currentDate]);

        // Function to get the start date of the week
        const getWeekStartDate = (date: Date) => {
            const startDate = new Date(date);
            const day = startDate.getDay();
            const diff = startDate.getDate() - day + (day === 0 ? -6 : 0); // adjust when week starts
            return new Date(startDate.setDate(diff));
        };

        
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
    {daysToShow.map((day, index) => {
        const dayString = day.toISOString().split('T')[0];
        const dayHolidays = holidays.filter(holiday => holiday.date === dayString);

        return (
            <DayCell
                key={index}
                date={day}
                holidays={dayHolidays}
                viewMode=''
            />
        );
    })}
</S.CalendarGrid>
            </>
        );
    };

    export default Calendar;
