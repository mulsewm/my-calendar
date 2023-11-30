// src/components/NavBar/NavBar.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUsers, faCalendarWeek, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import * as S from './Navbar.styles';

interface NavBarProps {
    onViewChange: (view: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onViewChange }) => {
    return (
        <S.NavBarContainer>
            <S.Branding>
                Social Calendar
            </S.Branding>
            <S.NavControls>
            <S.NavButton>
                    <FontAwesomeIcon icon={faPlane} style={{ color:'darkblue', marginRight: '8px' }} />
                    Travidux, LLC
                </S.NavButton>
                <S.NavButton>
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                    Team Visible
                </S.NavButton>
             
            </S.NavControls>
            <S.ViewOptions>
                <S.ViewButton onClick={() => onViewChange('week')}>
                    <FontAwesomeIcon icon={faCalendarWeek} />
                    Week
                </S.ViewButton>
                <S.ViewButton onClick={() => onViewChange('month')}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    Month
                </S.ViewButton>
            </S.ViewOptions>
        </S.NavBarContainer>
    );
};

export default NavBar;
