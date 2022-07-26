import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Images } from "assets/images"

import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import DropDownComponent from "staff-app/components/dropdown-sort/dropdown"
import CenterModal from "shared/components/center-modal"

import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { RollContext } from "context/student-context-api"


export const HomeBoardPage: React.FC = () => {
    const navigate = useNavigate()
    const { loadState, state, dispatch } = useContext<RollContext>(RollContext)

    const [isRollMode, setIsRollMode] = useState(false)
    const [onLoadSort, setOnLoadSort] = useState<Boolean>(false)
    const [createARoll, setCreateARoll] = useState<Boolean>(false)
    const [sortedStudentsArray, setSortedStudentsArray] = useState<Person[] | undefined>([])
    const [ascendOrDescend, setAscendOrDescend] = useState<string>("ascend")
    const [order, setOrder] = useState<string>("first")
    const [noResultsFound, setNoResultsFound] = useState<Boolean>(false)

    const [saveRoll, data, loadStateSaveRoll] = useApi<{}>({ url: "save-roll" })

    useEffect(() => {
        if (loadState === "loaded" && state.all_data) {
            setSortedStudentsArray(state.all_data)
            setOnLoadSort(true)
        }
    }, [loadState, state])

    useEffect(() => {
        if (loadStateSaveRoll === "loaded" && createARoll) {
            setCreateARoll(false)
            navigate("/staff/activity", { replace: true })
        }
    }, [loadStateSaveRoll])

    const onToolbarAction = (action: ToolbarAction) => {
        if (action === "roll") {
            setIsRollMode(true)
        }
    }

    const onActiveRollAction = (action: ActiveRollAction) => {
        if (action === "exit") {
            setIsRollMode(false)
        }
        if (action === "complete") {
            setIsRollMode(false)
            if (state.studentRolls.length > 0) {
                setCreateARoll(true)
                dispatch({ type: "reset_all_data", payload: {} })
                saveRoll(state.studentRolls)
            }
        }
    }

    // function which recieves action
    const onClickSort = (action: sortAction) => {
        setAscendOrDescend(action)
        if (action === "ascend") {
            sortFunction(action, order)
        } else if (action === "descend") {
            sortFunction(action, order)
        } else if (action === "first") {
            setOrder("first")
            setAscendOrDescend("ascend")
            sortFunction("ascend", action)
        } else {
            setOrder("last")
            setAscendOrDescend("ascend")
            sortFunction("ascend", action)
        }
    }

    // common sorting function
    const sortFunction = (action: string, order: string): void => {
        let students: Person[] | undefined = sortedStudentsArray?.sort((a: Person, b: Person): number => {
            return action === "ascend"
                ? a[order === "first" ? "first_name" : "last_name"] < b[order === "first" ? "first_name" : "last_name"]
                    ? -1
                    : 1
                : b[order === "first" ? "first_name" : "last_name"] < a[order === "first" ? "first_name" : "last_name"]
                ? -1
                : 1
        })
        setSortedStudentsArray(students)
    }

    const searchForStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Fix for names with spaces
        if (e.target.value.length >= 1) {
            let filtered: Person[] | undefined = state?.all_data?.filter((person: Person) => {
                let str: string = person.first_name.toLocaleLowerCase()+ " " +person.last_name.toLocaleLowerCase()
                return str.includes(e.target.value.toLocaleLowerCase())
            })
            setSortedStudentsArray(filtered)
        } else {
            setSortedStudentsArray(state?.all_data)
        }
    }
    useEffect(()=>{
        if(sortedStudentsArray && sortedStudentsArray?.length  < 1){
            setNoResultsFound(true)
        } else {
            setNoResultsFound(false)
        }    
    },[sortedStudentsArray])
    return (
        <>
            <S.PageContainer>
                <S.Heading>Students List</S.Heading>
                {!(loadState === "error") && (
                    <Toolbar onItemClick={onToolbarAction} ascendOrDescend={ascendOrDescend} onClickSort={onClickSort} searchForStudents={searchForStudents} />
                )}

                {loadState === "loading" && (
                    <CenteredContainer>
                        <FontAwesomeIcon icon="spinner" size="2x" spin />
                    </CenteredContainer>
                )}

                {loadState === "loaded" && onLoadSort && (
                    <>
                        {sortedStudentsArray?.map((s) => (
                            <StudentListTile key={s.id} isRollMode={isRollMode} student={s} order={order} />
                        ))}
                    </>
                )}

                {loadState === "error" && (
                    <CenteredContainer>
                        <h1>Sorry, we are not able to load the data at the moment</h1>
                        <h3>Please come back a little later</h3>
                    </CenteredContainer>
                )}

                {noResultsFound  && (
                    <CenteredContainer>
                        <h3>No student found by this name.</h3>
                    </CenteredContainer>
                )}

                {loadStateSaveRoll === "loading" && createARoll && <CenterModal />}

                {loadStateSaveRoll === "error" && (
                    <CenteredContainer>
                        <h1>Sorry, we could not record your activity</h1>
                        <h3>Please try again later</h3>
                    </CenteredContainer>
                )}
            </S.PageContainer>
            <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
        </>
    )
}

type ToolbarAction = "roll" | "sort"
export type sortAction = "ascend" | "descend" | "first" | "last"

interface ToolbarProps {
    ascendOrDescend: string
    searchForStudents: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClickSort: (action: sortAction, value?: string) => void
    onItemClick: (action: ToolbarAction, value?: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { onItemClick, ascendOrDescend, onClickSort, searchForStudents } = props
    return (
        <S.ToolbarContainer>
            <S.InputMobile type="text" onChange={searchForStudents} placeholder={"Search for students..."} />
            <S.LeftSideContainer>
                <S.Options>
                    <DropDownComponent onClickSort={onClickSort} />
                </S.Options>
                <S.IconContainer onClick={() => onClickSort(ascendOrDescend === "ascend" ? "descend" : "ascend")}>
                    <img src={Images.sort} height={30} width={30} />
                </S.IconContainer>
                <S.ButtonMobile onClick={() => onItemClick("roll")}>
                    <img src={Images.attendance} width={"25px"} height={"25px"} />
                </S.ButtonMobile>
            </S.LeftSideContainer>
            <div>
                <S.Input type="text" onChange={searchForStudents} placeholder={"Search for students..."} />
            </div>
            <S.Button onClick={() => onItemClick("roll")}>
                <img src={Images.attendance} width={"25px"} height={"25px"} />
            </S.Button>
        </S.ToolbarContainer>
    )
}

const S = {
    PageContainer: styled.div`
        display: flex;
        flex-direction: column;
        font-family: "Nunito Sans", sans-serif;
        width: 60%;
        margin: 2% 0 10% 27%;
        @media screen and (max-width: 800px) {
            width: 80%;
            margin: ${Spacing.u4} auto 5%;
        }
    `,
    ToolbarContainer: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        background-color: ${Colors.added.base};
        padding: 6px 14px;
        font-family: "Nunito Sans", sans-serif;
        font-weight: ${FontWeight.strong};
        border-radius: ${BorderRadius.default};
        @media screen and (max-width: 800px) {
            display: block;
            text-align: center;
        }
    `,
    Heading: styled.div`
        display: flex;
        justify-content: center;
        font-size: 26px;
        margin-left: 4%;
        margin-bottom: 7%;
    `,
    Input: styled.input`
        width: 100%;
        font-size: 14px;
        padding: 6px 6px;
        border-width: 1px;
        border-style: solid;
        margin: 0;
        border-radius: 20px;
        &::-webkit-input-placeholder {
            font-size: 12px;
            font-family: "Nunito Sans", sans-serif;
            padding-left: 5px;
        }
        @media screen and (max-width: 800px) {
            display: none;
        }
    `,
    MobileInputDiv: styled.div`
        display: none;
    `,
    InputMobile: styled.input`
        display: none;
        @media screen and (max-width: 800px) {
            width: 93%;
            display: block;
            font-size: 14px;
            padding: 6px 6px;
            border-width: 1px;
            border-style: solid;
            margin-top: 7px;
            margin-bottom: 17px;
            border-radius: 20px;
            &::-webkit-input-placeholder {
                font-size: 12px;
                font-family: "Nunito Sans", sans-serif;
                padding-left: 5px;
            }
        }
    `,
    IconContainer: styled.span`
        margin-left: 10px;
        cursor: pointer;
        margin-top: 7px;
    `,
    Options: styled.div`
        display: block;
        margin-top: 7px;
    `,
    Option: styled.span`
        display: block;
    `,
    LeftSideContainer: styled.div`
        display: flex;
    `,
    Button: styled.button`
        && {
            padding: ${Spacing.u2};
            font-family: "Nunito Sans", sans-serif;
            font-weight: ${FontWeight.strong};
            border-radius: ${BorderRadius.default};
            background-color:transparent;
            border:none;
            color:#fff;
            font-weight:bolder;
            cursor: pointer;
            @media screen and (max-width: 800px) {
                display: none;
            }
        }
    `,
    ButtonMobile: styled.button`
        && {
            display: none;
            background-color:transparent;
            border:none;
            color:#fff;
            font-weight:bolder;
            cursor: pointer;
            @media screen and (max-width: 800px) and (min-width: 450px) {
                display: inline-block;
                padding: ${Spacing.u2};
                margin-left: 40%;
                font-weight: ${FontWeight.strong};
                border-radius: ${BorderRadius.default};
            }
            @media screen and (max-width: 450px) {
                display: inline-block;
                padding: ${Spacing.u2};
                margin-left: 30%;
                font-weight: ${FontWeight.strong};
                border-radius: ${BorderRadius.default};
            }
        }
    `,
}
