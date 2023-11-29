// src/components/Calendar/Calendar.styles.ts

import styled from '@emotion/styled'; // or 'styled-components'

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr); // 7 days for a week
    grid-gap: 10px;
    padding: 10px;
    background-color: #f0f0f0;
`;
