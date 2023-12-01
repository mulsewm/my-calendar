// src/components/NavBar/NavBar.tsx

import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUsers, faCalendarWeek, faCalendarAlt, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import * as S from './Navbar.styles';
import html2canvas from 'html2canvas';



interface NavBarProps {
    onViewChange: (view: string) => void;
}


const Navbar: React.FC<NavBarProps & { onDownloadAsPng: () => void }> = ({ onViewChange, onDownloadAsPng }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };
   
      

    return (
        <S.NavBarContainer>
            <S.Branding>
                Social Calendar
            </S.Branding>
            <S.NavControls style={{ marginLeft: '-400px' }}>
                <S.NavButton>
                    <FontAwesomeIcon icon={faPlane} style={{ color: 'darkblue', marginRight: '8px' }} />
                    Travidux, LLC BC
                </S.NavButton>
                <S.NavButton>
                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: '8px' }} />
                    Team Visible
                </S.NavButton>
            </S.NavControls>
            <S.NavButton>
                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                Calendar
            </S.NavButton>
        <S.NavButton onClick={handleMenuClick}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
                
            </S.NavButton>
            {menuOpen && (
                <S.DropdownMenu>
                    <p onClick={() => {/* handle import logic */}}>Import</p>
                    <p onClick={() => {/* handle export logic */}}>Export</p>
                    <p onClick={onDownloadAsPng}>Download as PNG</p>
                </S.DropdownMenu>
            )}
        </S.NavBarContainer>
    );
};

export default Navbar;
