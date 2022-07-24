import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { Images } from "assets/images"
import { RollContext } from "context/student-context-api"
import DropDownComponent from "staff-app/components/dropdown-sort/dropdown"

export const HomeBoardPage: React.FC = () => {
    const store = useContext(RollContext)
    const { loadState, state } = useContext(RollContext)

    const [isRollMode, setIsRollMode] = useState(false)
    const [onLoadSort, setOnLoadSort] = useState<Boolean>(false)
    // const [getStudents, data] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
    const [saveRoll, responseSaveRoll, loadingState] = useApi<{}>({ url: "save-roll" })
    const [sortedStudentsArray, setSortedStudentsArray] = useState<Person[] | undefined>([])
    const [ascendOrDescend, setAscendOrDescend] = useState<string>("ascend")
    const [order, setOrder] = useState<string>("first")

    // useEffect(() => {
    //   void getStudents()
    // }, [getStudents])

    useEffect(() => {
        if (loadState === "loaded" && state.all_data) {
            setSortedStudentsArray(state.all_data)
            setOnLoadSort(true)
        }
    }, [loadState, state])

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
                saveRoll(state.studentRolls)
            }
        }
    }

    // function which recieves action
    const onClickSort = (action: sortAction) => {
        // dispatch("rollCall")
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
                let str: string = person.first_name.toLocaleLowerCase() + person.last_name.toLocaleLowerCase()
                return str.includes(e.target.value.toLocaleLowerCase())
            })
            setSortedStudentsArray(filtered)
        } else {
            setSortedStudentsArray(state?.all_data)
        }
    }

    return (
        <>
            <S.PageContainer>
                <S.Heading>Students List</S.Heading>
                <Toolbar onItemClick={onToolbarAction} ascendOrDescend={ascendOrDescend} onClickSort={onClickSort} searchForStudents={searchForStudents} />

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
                        <div>Failed to load</div>
                    </CenteredContainer>
                )}
            </S.PageContainer>
            <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
        </>
    )
}

type ToolbarAction = "roll" | "sort"
export type sortAction = "ascend" | "descend" | "first" | "last" | "First Name" | "Last Name"

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
            margin-bottom:17px;
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
    Button: styled(Button)`
        && {
            padding: ${Spacing.u2};
            font-family: "Nunito Sans", sans-serif;
            font-weight: ${FontWeight.strong};
            border-radius: ${BorderRadius.default};
            @media screen and (max-width: 800px) {
                display: none;
            }
        }
    `,
    ButtonMobile: styled(Button)`
        && {
            display: none;
            @media screen and (max-width: 800px) and (min-width: 450px) {
                display: inline-block;
                padding: ${Spacing.u2};
                margin-left: 40%;
                font-family: "Nunito Sans", sans-serif;
                font-weight: ${FontWeight.strong};
                border-radius: ${BorderRadius.default};
            }
            @media screen and (max-width: 450px) {
                display: inline-block;
                padding: ${Spacing.u2};
                margin-left: 30%;
                font-family: "Nunito Sans", sans-serif;
                font-weight: ${FontWeight.strong};
                border-radius: ${BorderRadius.default};
            }
        }
    `,
}
