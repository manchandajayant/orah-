import React, { useContext } from "react"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, FontWeight } from "shared/styles/styles"

import { RolllStateType } from "shared/models/roll"
import { RollContext } from "context/student-context-api"

import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import useCheckMobileScreen from "shared/hooks/check-mobile-screen"

interface Props {
    stateList: StateList[]
    onItemClick?: (type: ItemType) => void
    size?: number
}
export const RollStateList: React.FC<Props> = ({ stateList, size = 14, onItemClick }) => {
    const { dispatch } = useContext(RollContext)
    const onClick = (type: ItemType) => {
        dispatch({ type })
        if (onItemClick) {
            onItemClick(type)
        }
    }
    // check for mobile screen
    const isMobileForNav = useCheckMobileScreen()
    if(isMobileForNav){
        size = 10
    }

    return (
        <S.ListContainer>
            {stateList.map((s, i) => {
                if (s.type === "all") {
                    return (
                        <S.ListItem key={i}>
                            <FontAwesomeIcon icon="users" size="sm" style={{ cursor: "pointer" }} onClick={() => onClick(s.type)} />
                            <span>{s.count}</span>
                        </S.ListItem>
                    )
                }

                return (
                    <S.ListItem key={i}>
                        <RollStateIcon type={s.type} size={size} onClick={() => onClick(s.type)} />
                        <span>{s.count}</span>
                    </S.ListItem>
                )
            })}
        </S.ListContainer>
    )
}

const S = {
    ListContainer: styled.div`
        display: flex;
        align-items: center;
    `,
    ListItem: styled.div`
        display: flex;
        align-items: center;
        margin-right: ${Spacing.u2};

        span {
            font-weight: ${FontWeight.strong};
            margin-left: ${Spacing.u2};
        }
    `,
}

export interface StateList {
    type: ItemType
    count: number
}

type ItemType = RolllStateType | "all"
