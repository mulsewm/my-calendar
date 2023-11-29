// src/components/NavBar/NavBar.styles.ts

import styled from '@emotion/styled'; // or 'styled-components'

export const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ff9f00; // Orange background color
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
    display: flex;
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
    display: flex;
    align-items: center;
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
