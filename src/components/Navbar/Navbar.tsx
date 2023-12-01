import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUsers, faCalendarAlt, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import * as S from './Navbar.styles';
import html2canvas from 'html2canvas';

interface NavBarProps {
    onViewChange: (view: string) => void;
    onDownloadAsPng: () => void;
    onExportToCsv: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ onViewChange, onDownloadAsPng, onExportToCsv }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null); 

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };



    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement; 
            if (menuRef.current && !menuRef.current.contains(target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <S.NavBarContainer>
            <S.Branding>
                Social Calendar
            </S.Branding>
            <S.NavControls style={{ marginLeft: '-400px' }}>
                <S.NavButton>
                    <FontAwesomeIcon icon={faPlane} style={{ color: 'darkblue'}} />
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
                <S.DropdownMenu ref={menuRef}>
                    <p onClick={() => {/* handle import logic */}}>Import</p>
                    <p onClick={onExportToCsv}>Export to CSV</p> 
                    <p onClick={onDownloadAsPng}>Download as PNG</p>
                </S.DropdownMenu>
            )}
        </S.NavBarContainer>
    );
};

export default Navbar;
