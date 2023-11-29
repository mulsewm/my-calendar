// src/components/Task/Task.styles.ts

import styled from '@emotion/styled'; // or 'styled-components'

export const TaskItem = styled.div`
    background-color: #e4f0f6; // a light blue background for tasks
    border-radius: 3px;
    padding: 6px;
    margin-top: 5px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1); // an inset shadow for a subtle border effect
    word-break: break-word;
`;

export const EditInput = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
`;

export const SaveButton = styled.button`
    background-color: #0079bf; // blue color for the save button
    color: white;
    border: none;
    padding: 5px 10px;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
        background-color: #026aa7;
    }
`;
