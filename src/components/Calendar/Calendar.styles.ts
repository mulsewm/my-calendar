
import styled from '@emotion/styled';

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 days a week */
  grid-template-rows: auto 1fr; 
  grid-gap: 10px;
  padding: 10px;
`;

export const DayCellContainer = styled.div`
  background-color: #FFF; 
  border: 1px solid #DDD; 
  min-height: 100px; 
  padding: 8px;
  border-radius: 4px; 
`;
export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ccccca; 
`;

export const ViewControls = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * {
    margin-right: 8px; 
  }

  & > button {
    padding: 5px 10px;
    background-color: gray; 
    color: black; 
    font-weight: bold; 
    border: none;
    cursor: pointer;
    
    &:active {
      background-color: #ccccca; 

    }
  }
  & > select {
    padding: 5px;
    background-color: #ccccca;
    border: 1px solid #ddd;
  }
`;
export const WeekdayFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); 
  background-color: #f0f0f0; 
  border-top: 1px solid #d0d0d0; 
`;

export const FooterItem = styled.div`
  padding: 10px 10px; 
  font-size: 0.9em;
  color: #333; 
  border-right: 1px solid #d0d0d0; 

  &:last-child {
    border-right: none; 
  }
`;