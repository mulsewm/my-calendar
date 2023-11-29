// src/components/Task/Task.styles.ts

import styled from '@emotion/styled';

export const TaskItem = styled.div`
    background-color: #e2e4e6;
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
    cursor: pointer;
    word-break: break-all;
`;

export const EditInput = styled.input`
    width: calc(100% - 16px); // Full width minus padding
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 4px 8px;
    margin-bottom: 8px;
`;

export const SaveButton = styled.button`
    background-color: #5aac44;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #519839;
    }
`;
