// src/components/Calendar/Calendar.tsx

import React, { useState, useEffect } from 'react';
import DayCell from './DayCell';
import Navbar from '../Navbar/Navbar';
import * as S from './Calendar.styles';
import { CalendarHeader, ViewControls, CalendarGrid, WeekdayFooter, FooterItem  } from './Calendar.styles';
import html2canvas from 'html2canvas';

interface Holiday {
    date: string;
    localName: string;

}
const Calendar: React.FC = () => {
    // State to store the current view mode and current date
    const [viewMode, setViewMode] = useState('month'); // 'week' or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [currentFilter, setCurrentFilter] = useState<'week' | 'month'>('week'); // 'week' or 'month'
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Current month (0-11)
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Day labels

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
        const daysToShow = [];
        let startDate;

        if (currentFilter === 'week') {
            startDate = getWeekStartDate(currentDate);
            for (let i = 0; i < 7; i++) {
                daysToShow.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
            }
        } else {
            // When the month filter is applied, show the first week of that month
            const startMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
            startDate = getWeekStartDate(startMonth);
            for (let i = 0; i < 7; i++) { // Show only the first week of the selected month
                daysToShow.push(new Date(startMonth.getFullYear(), startMonth.getMonth(), startMonth.getDate() + i));
            }
        }

        return daysToShow;
    };


    const daysToShow = calculateDaysToShow();

    // Handler for view mode change
    const handleViewChange = (view: string) => {
        setViewMode(view);
    };
    const handleDownloadAsPng = async () => {
        // Assuming you have a ref to the calendar element
        const calendarElement = document.getElementById('calendar');
        
        if (calendarElement) {
          // Convert the calendar element to a canvas using html2canvas
          const canvas = await html2canvas(calendarElement);
          // Create an image from the canvas
          const image = canvas.toDataURL('image/png');
          // Create a link to download the image
          const link = document.createElement('a');
          link.href = image;
          link.download = 'calendar.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
    return (
        <>
            {/* navbar */}

            
            <Navbar onViewChange={handleViewChange} onDownloadAsPng={handleDownloadAsPng} />
            <div id='calendar'>

            <CalendarHeader>
                <select value={currentMonth} onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                    ))}
                </select>
                <ViewControls>

                    <button className={currentFilter === 'week' ? 'active' : ''} onClick={() => setCurrentFilter('week')}>
                        Week
                    </button>
                    <button className={currentFilter === 'month' ? 'active' : ''} onClick={() => setCurrentFilter('month')}>
                        Month
                    </button>

                </ViewControls>
            </CalendarHeader>
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
            <WeekdayFooter>
        {['1', '2', '3', '4', '5', '6', '7'].map((num) => (
          <FooterItem key={num}>{num}</FooterItem>
        ))}
      </WeekdayFooter>
            </div>
        </>
    );
};

export default Calendar;
