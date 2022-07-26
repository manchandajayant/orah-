import React,{useState} from 'react'

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { sortAction } from "staff-app/daily-care/home-board.page"

import { Activity } from "shared/models/activity"
import { BorderRadius } from 'shared/styles/styles'

interface CardProps {
    data: Activity[]
    onclickActivitySelect:(action:string)=>void
}


const DropdownActivity: React.FC<CardProps> = ({ data, onclickActivitySelect }) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [selectedOption, setSelectedOption] = useState<string>("")

    const toggling = () => setIsOpen(!isOpen)

    const onOptionClicked = (action: string) => {
        onclickActivitySelect(action)
        setSelectedOption(action)
        setIsOpen(false)
    }

    const options = data?.map((activity: Activity, index: number)=> activity.entity.name)

    return (
        <S.Main>
            <S.DropDownContainer>
                <S.DropDownHeader onClick={toggling}>
                    <span>{selectedOption ? selectedOption : "Select a roll"}</span>
                    <S.IconContainer>
                        <FontAwesomeIcon icon={"angle-down"} />
                    </S.IconContainer>
                </S.DropDownHeader>
                {isOpen && (
                    <S.DropDownListContainer>
                        <S.DropDownList>
                            {options.map((option: string) => (
                                <S.ListItem key={Math.random()} onClick={() => onOptionClicked(option as sortAction)}>
                                    {option}
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
        border-radius:${BorderRadius.default};
    `,
    DropDownContainer: styled.div`
        width: 40.5em;
        margin: 0 auto;
        @media screen and (max-width: 800px) {
            width: 20.25em;
        }
    `,
    DropDownHeader: styled.div`
        padding: 0.5em 1em 0.4em 1em;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
        border-radius:10px;
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
        border-radius:10px;
        overflow-y:scroll;
        max-height:300px;
        font-size: 0.8rem;
        font-weight: 500;
    `,
    ListItem: styled.div`
        padding: 0.8em 0 0.8em 0.8em;
        border: 0.5px solid #e5e5e5;
        &:hover {
            background-color: rgb(247, 247, 247);
        }
    `,
    IconContainer: styled.span`
        padding-top: 1.3px;
    `,
}

export default DropdownActivity