import React, { useContext, useEffect, useState } from "react"

import styled from "styled-components"
import { BorderRadius, Spacing } from "shared/styles/styles"

import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import { RollContext } from "context/student-context-api"
import { StateList } from "staff-app/components/roll-state/roll-state-list.component"

export type ActiveRollAction = "filter" | "exit" | "complete"
interface Props {
    isActive: boolean
    onItemClick: (action: ActiveRollAction, value?: string) => void
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
    const { isActive, onItemClick } = props
    const [stateList, setStateList] = useState<StateList[]>([
        { type: "all", count: 0 },
        { type: "present", count: 0 },
        { type: "late", count: 0 },
        { type: "absent", count: 0 },
    ])
    const store = useContext(RollContext)

    useEffect(() => {
        setStateList((list: StateList[]): StateList[] =>
            list.map((obj: StateList) => {
                if (obj.type === "all") {
                    return { ...obj, count: store?.state?.studentRolls.length }
                }
                let count = store?.state?.studentRolls.filter((el: { student_id: number; roll_state: string }) => {
                    return el["roll_state"] === obj.type
                })
                return { ...obj, count: count?.length }
            })
        )
    }, [store.state])

    return (
        <S.Overlay isActive={isActive}>
            <S.Content>
                <S.Title>Class Attendance</S.Title>
                <div>
                    <RollStateList stateList={stateList} />
                    <div style={{ marginTop: Spacing.u6 }}>
                        <S.Button color="inherit" onClick={() => onItemClick("exit")}>
                            Exit
                        </S.Button>
                        <S.Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("complete")}>
                            Complete
                        </S.Button>
                    </div>
                </div>
            </S.Content>
        </S.Overlay>
    )
}

const S = {
    Overlay: styled.div<{ isActive: boolean }>`
        position: fixed;
        bottom: 0;
        left: 0;
        height: ${({ isActive }) => (isActive ? "120px" : 0)};
        width: 100%;
        background-color: rgba(34, 43, 74, 0.92);
        backdrop-filter: blur(2px);
        color: #fff;
    `,
    Content: styled.div`
        display: flex;
        justify-content: space-between;
        width: 52%;
        height: 100px;
        margin: ${Spacing.u3} auto 0;
        border: 1px solid #f5f5f536;
        border-radius: ${BorderRadius.default};
        padding: ${Spacing.u4};
    `,
    Title:styled.p`
        font-size:15px;
        @media screen and (max-width: 800px) {
             font-size:13px;
             margin-top:0;
        }
    `,
    Button:styled.button`
        font-size:15px;
        background-color:transparent;
        border:none;
        color:#fff;
        font-weight:bolder;
        cursor: pointer;
        @media screen and (max-width: 800px) {
             font-size:11px;
             margin-left:26px;
        }
    `
}
