import React, { useState } from "react"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { sortAction } from "staff-app/daily-care/home-board.page"

const options = ["first", "last"]

interface DropDownProps {
    onClickSort: (action: sortAction, value?: string) => void
}


export const DropDownComponent: React.FC<DropDownProps> = ({ onClickSort }) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>("")

    const toggling = () => setIsOpen(!isOpen)

    const onOptionClicked = (action: sortAction) => {
        onClickSort(action)
        action === "first" ? setSelectedOption("First Name") : setSelectedOption("Last Name")
        setIsOpen(false)
    }
   
    return (
        <S.Main>
            <S.DropDownContainer>
                <S.DropDownHeader onClick={toggling}>
                    <span>{selectedOption || "First Name"}</span>
                    <S.IconContainer>
                        <FontAwesomeIcon icon={"angle-down"} />
                    </S.IconContainer>
                </S.DropDownHeader>
                {isOpen && (
                    <S.DropDownListContainer>
                        <S.DropDownList>
                            {options.map((option: string) => (
                                <S.ListItem key={Math.random()} onClick={() => onOptionClicked(option as sortAction)}>
                                    {option === "first" ? "First Name" : "Last Name"}
                                </S.ListItem>
                            ))}
                        </S.DropDownList>
                    </S.DropDownListContainer>
                )}
            </S.DropDownContainer>
        </S.Main>
    )
}

const S = {
    Main: styled.div`
        font-family: sans-serif;
    `,
    DropDownContainer: styled.div`
        width: 10.5em;
        margin: 0 auto;
    `,
    DropDownHeader: styled.div`
        padding: 0.5em 1em 0.4em 1em;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        font-size: 0.8rem;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        cursor: pointer;
    `,
    DropDownListContainer: styled.div`
        position: fixed;
        width: inherit;
        cursor: pointer;
    `,
    DropDownList: styled.div`
        padding: 0;
        margin: 0;
        background: #ffffff;
        border: 2px solid #e5e5e5;
        box-sizing: border-box;
        font-size: 0.8rem;
        font-weight: 500;
    `,
    ListItem: styled.div`
        padding: 0.8em 0 0.8em 0.8em;
        &:hover {
            background-color: rgb(247, 247, 247);
        }
    `,
    IconContainer: styled.span`
        padding-top: 1.3px;
    `,
}

export default DropDownComponent
