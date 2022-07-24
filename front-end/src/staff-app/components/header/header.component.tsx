import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"

export const Header: React.FC = () => {
    return (
        <S.SideBar>
            <S.HeaderItems>
                <S.Logo>
                    <img src="https://uploads-ssl.webflow.com/5b0c6e0c417228ad9bf005d9/5fbf8b3c7c62831b52ac1de5_orahLogoArtboard%201.svg" width={"130px"} />
                </S.Logo>
                <S.Navcontainer>
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="daily-care">Daily Care</NavItem>
                    <NavItem to="activity">Activity</NavItem>
                </S.Navcontainer>
            </S.HeaderItems>
        </S.SideBar>
    )
}

const NavItem: React.FC<{ to: string }> = (props) => {
    const activeStyle = ({ isActive }: { isActive: boolean }) => ({
        textDecoration: "none",
        fontWeight: FontWeight.strong,
        color: "#000",
        display: "block",
        padding: "18px 20px 17px",
        backgroundColor: isActive ? Colors.added.siteHover : "#fff",
    })
    return (
        <NavLink to={props.to} style={activeStyle}>
            {props.children}
        </NavLink>
    )
}

const S = {
    Header: styled.header`
        display: flex;
        align-items: center;
        height: 56px;
        background-color: ${Colors.gradients.dark};
        color: #fff;
    `,
    Navcontainer: styled.div`
        display: block;
        height: 100px;
    `,
    Logo: styled.div`
        margin: 30px;
        margin-top: 30px;
    `,
    SideBar: styled.nav`
        background: #fff;
        top: 0;
        color: #656565;
        box-shadow: none;
        border-right: 1px solid #e5e5e5;
        width: 220px;
        margin: 0 50px 50px 0;
        position: fixed;
        left: 0;
        height: 100vh;
        z-index: 3;
        color: #0b152f;
        transition: all 0.3s;
        border-radius: 0;
        @media screen and (max-width: 1000px) {
            display: none;
        }
    `,
    HeaderItems: styled.nav`
        display: block;
        color: "#000";
    `,
}
