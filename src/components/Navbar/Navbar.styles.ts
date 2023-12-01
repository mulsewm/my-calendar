// src/components/NavBar/NavBar.styles.ts

import styled from '@emotion/styled'; 

export const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ff9f00; 
    padding: 10px 20px;
`;

export const Branding = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    cursor: pointer;
`;

export const NavControls = styled.div`
    display: flex-left;
    align-items: center;
  
`;

export const NavButton = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1em;
    margin: 0 5px;
    &:hover {
        opacity: 0.8;
    }
`;

export const ViewOptions = styled.div`
  button {
    background: none;
    border: none;
    color: white;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: #FFD700; /* Gold color */
    }

    &.active {
      border-bottom: 2px solid white;
    }
  }
`;
export const ViewButton = styled.button`
    background-color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 10px;
    margin-left: 5px;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        background-color: #eee;
    }
`;
export const DropdownMenu = styled.div`
  position: absolute;
  top: 0%; // Position it below the button
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000; 

  p {
    padding: 8px;
    margin: 0;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
  }
`;