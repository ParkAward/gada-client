import React, { FC, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PlaneIcon } from 'components/icons';
import { Outlet, Link } from 'react-router-dom';
import useDetectClose from 'hooks/useDetectClose';

const Header: FC = () => {
    const myPageRef = useRef<any>(null);
    const boardRef = useRef<any>(null);
    const [myPageIsOpen, setmyPageIsOpen] = useDetectClose(myPageRef, false);
    const [boardIsOpen, setBoardIsOpen] = useDetectClose(boardRef, false);

    const myPageHandler = () => {
        setmyPageIsOpen(!myPageIsOpen);
        setBoardIsOpen(false);
    };
    const boardHandler = () => {
        setBoardIsOpen(!boardIsOpen);
        setmyPageIsOpen(false);
    };
    const removeMenu = () => {
        setBoardIsOpen(false);
        setmyPageIsOpen(false);
    }
    return (
        <>
            <HeaderContainer>
                <PlaneIcon
                    width="49px"
                    height="46px"
                    style={planeIconStyle}
                />
                <HeaderTitle>여행가다</HeaderTitle>
                <Menu>
                    <MyPageContainer>
                        <DropdownButton onClick={myPageHandler}>
                            마이페이지
                        </DropdownButton>
                        <Nav
                            ref={myPageRef}
                            myPageIsOpen={myPageIsOpen}
                        >
                            <Ul
                                onClick={removeMenu}
                                onKeyDown={removeMenu}>
                                <Li>
                                    <LinkWrapper to="/">정보</LinkWrapper>
                                </Li>
                                <Li>
                                    <LinkWrapper to="/main">내 계획</LinkWrapper>
                                </Li>
                            </Ul>
                        </Nav>
                    </MyPageContainer>
                    <BoardContainer>
                        <DropdownButton onClick={boardHandler}>
                            게시판
                        </DropdownButton>
                        <Nav
                            ref={boardRef}
                            myPageIsOpen={boardIsOpen}
                        >
                            <Ul
                                onClick={removeMenu}
                                onKeyDown={removeMenu}
                            >
                                <Li>
                                    <LinkWrapper to="/board">전체</LinkWrapper>
                                </Li>
                                <Li>
                                    <LinkWrapper to="/board">공유내역</LinkWrapper>
                                </Li>
                            </Ul>
                        </Nav>
                    </BoardContainer>
                    <DropdownContainer
                        onClick={removeMenu}
                        onKeyDown={removeMenu}
                    >
                        <LinkNoDropDown to="/">로그아웃</LinkNoDropDown>
                    </DropdownContainer>
                </Menu>
            </HeaderContainer>
            <Outlet />
        </>
    )
}

export default Header;

const planeIconStyle = {
    marginBottom: '10px',
    marginLeft: '30px'
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #60A5F8;
    font-family: 'Jalnan';
    letter-spacing: 1px;
`;

const HeaderTitle = styled.h1`
    font-size: 30px;
    color: white;
    cursor: default;
`;

const Menu = styled.div`
    margin-left: auto;
    margin-right: 50px;
    display: flex;
    color: white;
    font-size: 19px;
`

const DropdownContainer = styled.div`
    position: relative;
    width: 100px;
    text-align: center;
`

const MyPageContainer = styled(DropdownContainer)``

const BoardContainer = styled(DropdownContainer)`
    margin-left: 10px;
`

const DropdownButton = styled.div`
    cursor: pointer;
`

const Nav = styled.nav<{ myPageIsOpen: any }>`
    background: #60A5F8;
    position: absolute;
    top: 52px;
    left: 0;
    width: 100px;
    text-align: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    z-index: 9;

    &:after {
        content: '';
        height: 0;
        width: 0;
        position: absolute;
        top: -10px;
        right: 37px;
        border: 12px solid transparent;
        border-top-width: 0;
        border-bottom-color: #60A5F8;
    }



    ${({ myPageIsOpen }) =>
        myPageIsOpen &&
        css`
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        `
    };
`

const Ul = styled.ul`
    & > li:last-of-type {
        margin-bottom: 13px;
    }
`
const Li = styled.li``

const LinkWrapper = styled(Link)`
    font-size: 16px;
    margin-top: 13px;
    display: block;
    text-decoration: none;
    color: white;
`

const LinkNoDropDown = styled(Link)`
    display: block;
    text-decoration: none;
    font-size: 19px;
    color: white;
`