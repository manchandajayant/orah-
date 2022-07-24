import React, { useState, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Header: React.FC = () => {
    const [navTrueOnMWeb, setNavTrueOnMWeb] = useState<Boolean>(false)
    return (
        <>
            <S.Hamburger onClick={() => setNavTrueOnMWeb(!navTrueOnMWeb)}>
                <FontAwesomeIcon icon="bars" size="2x" />
            </S.Hamburger>
            <S.SideBar navTrue={navTrueOnMWeb}>
                <S.HeaderItems>
                    <S.Logo>
                        <img src="https://uploads-ssl.webflow.com/5b0c6e0c417228ad9bf005d9/5fbf8b3c7c62831b52ac1de5_orahLogoArtboard%201.svg" width={"130px"} />
                    </S.Logo>
                    <S.Navcontainer>
                        <NavItem to="/" setNavTrueOnMWeb={setNavTrueOnMWeb}>
                            Home
                        </NavItem>
                        <NavItem to="daily-care" setNavTrueOnMWeb={setNavTrueOnMWeb}>
                            Daily Care
                        </NavItem>
                        <NavItem to="activity" setNavTrueOnMWeb={setNavTrueOnMWeb}>
                            Activity
                        </NavItem>
                    </S.Navcontainer>
                </S.HeaderItems>
            </S.SideBar>
        </>
    )
}

interface ChildrenProps {
    setNavTrueOnMWeb: Dispatch<SetStateAction<Boolean>>
    to: string
}

const NavItem: React.FC<ChildrenProps> = (props) => {
    const activeStyle = ({ isActive }: { isActive: boolean }) => ({
        textDecoration: "none",
        fontWeight: FontWeight.strong,
        color: "#000",
        display: "block",
        padding: "18px 20px 17px",
        backgroundColor: isActive ? Colors.added.siteHover : "#fff",
    })
    return (
        <NavLink to={props.to} style={activeStyle} onClick={() => props.setNavTrueOnMWeb(false)}>
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
    Hamburger: styled.div`
        display: none;
        @media screen and (max-width: 800px) {
            display: block;
            width: 80%;
            margin: 4%;
        }
    `,
    Navcontainer: styled.div`
        display: block;
        height: 100px;
    `,
    Logo: styled.div`
        margin: 30px;
        margin-top: 30px;
    `,
    SideBar: styled.nav<{ navTrue: Boolean }>`
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
            display: ${(props) => (props.navTrue ? "block" : "none")};
            width: 100%;
            text-align: center;
        }
    `,
    HeaderItems: styled.nav`
        display: block;
        color: "#000";
    `,
}
