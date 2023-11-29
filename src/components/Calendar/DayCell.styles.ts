// src/components/Calendar/DayCell.styles.ts

import styled from '@emotion/styled'; 

export const Cell = styled.div`
    background-color: #efefef;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 16px;
    min-height: 120px; // adjust based on your content
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    overflow: hidden;
`;

export const AddTaskInput = styled.input`
    border: none;
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
`;

export const AddTaskButton = styled.button`
    background-color: #0079bf;
    color: white;
    border: none;
    padding: 8px 16px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #026aa7;
    }
`;
