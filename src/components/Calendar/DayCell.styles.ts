// src/components/Calendar/DayCell.styles.ts

import styled from '@emotion/styled'; // or 'styled-components'

export const Cell = styled.div`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    overflow: hidden;
    position: relative;
    min-height: 120px; 
`;

export const DateLabel = styled.div`
    font-weight: bold;
    margin-bottom: 8px;
`;

export const TaskInput = styled.input`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    width: calc(100% - 20px); // Subtracting padding
    margin-bottom: 8px;
`;

export const AddTaskButton = styled.button`
    background-color: #0079bf;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #026aa7;
    }
    align-self: center;
`;
export const HolidayLabel = styled.div`
    color: red; // Style as needed
    font-weight: bold;
   
`;