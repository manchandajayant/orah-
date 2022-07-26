import React from "react"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BorderRadius } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"

import { RolllStateType } from "shared/models/roll"
import { Person } from "shared/models/person"

interface Props {
    type: RolllStateType
    size?: number
    onClick?: () => void
    student?: Person
}
export const RollStateIcon: React.FC<Props> = (props) => {
    let { type, size = 20, onClick } = props

    return (
        <S.Icon size={size} border={type === "unmark"} bgColor={getBgColor(type)} clickable={Boolean(onClick)} onClick={onClick}>
            <FontAwesomeIcon icon="check" size={size > 14 ? "sm" : "xs"} />
        </S.Icon>
    )
}

function getBgColor(type: RolllStateType) {
    switch (type) {
        case "unmark":
            return "#fff"
        case "present":
            return "#76BA99"
        case "absent":
            return "#F37878"
        case "late":
            return "#FFDCAE"
        default:
            return "#76BA99"
    }
}

const S = {
    Icon: styled.div<{ size: number; border: boolean; bgColor: string; clickable: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: ${({ bgColor }) => bgColor};
        border: 2px solid ${({ border }) => (border ? Colors.dark.lighter : "transparent")};
        border-radius: ${BorderRadius.rounded};
        width: ${({ size }) => size}px;
        height: ${({ size }) => size}px;
        cursor: ${({ clickable }) => (clickable ? "pointer" : undefined)};
    `,
}
