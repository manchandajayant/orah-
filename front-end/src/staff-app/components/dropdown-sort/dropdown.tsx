import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { sortAction } from "staff-app/daily-care/home-board.page"
const Main = styled("div")`
    font-family: sans-serif;
`
const DropDownContainer = styled("div")`
    width: 10.5em;
    margin: 0 auto;
`

const DropDownHeader = styled("div")`
    padding: 0.5em 1em 0.4em 1em;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    cursor: pointer;
`

const DropDownListContainer = styled("div")`
    position: fixed;
    width: inherit;
    cursor: pointer;
`

const DropDownList = styled("div")`
    padding: 0;
    margin: 0;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    font-size: 0.8rem;
    font-weight: 500;
`

const ListItem = styled("div")`
    padding: 0.8em 0 0.8em 0.8em;
    &:hover {
        background-color: rgb(247, 247, 247);
    }
`

const IconContainer = styled("span")`
    padding-top: 1.3px;
`

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
        <Main>
            <DropDownContainer>
                <DropDownHeader onClick={toggling}>
                    <span>{selectedOption || "First Name"}</span>
                    <IconContainer>
                        <FontAwesomeIcon icon={"angle-down"} />
                    </IconContainer>
                </DropDownHeader>
                {isOpen && (
                    <DropDownListContainer>
                        <DropDownList>
                            {options.map((option: any) => (
                                <ListItem key={Math.random()} onClick={() => onOptionClicked(option)}>
                                    {option === "first" ? "First Name" : "Last Name"}
                                </ListItem>
                            ))}
                        </DropDownList>
                    </DropDownListContainer>
                )}
            </DropDownContainer>
        </Main>
    )
}

export default DropDownComponent
