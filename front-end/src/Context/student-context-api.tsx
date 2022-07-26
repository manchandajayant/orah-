import React, { createContext, useReducer, ReactNode, useEffect } from "react"

import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { Activity } from "shared/models/activity"
import { LoadState } from "shared/hooks/use-api"

// defines types properly
interface State {
    fetched: Person[]
    all_data: Person[]
    all_activity: Activity[]
    studentRolls: any /** this needs to set to its rightful state type */
    list_of_all_students: Person[]
}

const initialState: State = {
    fetched: [],
    all_data: [],
    studentRolls: [],
    all_activity: [],
    list_of_all_students: [],
}

// Refactor to add action type so that the action can be without a payload -- fixed, remove payload from roll calls
// To fix types of student_rolls to its righful data
export type Action =
    | { type: "all_data"; payload: Person[] }
    | { type: "student_rolls"; payload: {} }
    | { type: "all_activity"; payload: Activity[] }
    | { type: "reset_all_data"; payload?: {} }
    | { type: "present" | "absent" | "late" | "all" | "unmark"; payload?: {} }

export type Dispatch = (action: Action) => void

export interface RollContext {
    state: State
    dispatch: Dispatch
    loadState: LoadState
    loadStateActivity: LoadState
    loadStateActivityCall: () => void
}

export const RollContext = createContext<RollContext>({} as RollContext)

const rollReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "all_data":
            return { ...state, all_data: action.payload, fetched: action.payload, list_of_all_students: action.payload }
        case "all":
            return { ...state, all_data: state.fetched }
        case "all_activity":
            return { ...state, all_activity: action.payload }
        case "present":
        case "absent":
        case "late":
            let all_students = state.fetched
            let filtered = all_students.filter((obj: Person) => {
                return obj.rollValue === action.type
            })
            if (filtered.length) {
                return { ...state, all_data: filtered }
            }
            return state
        case "student_rolls":
            // change to correct type
            let val: any = action.payload
            let arr = state.studentRolls.filter((v: { student_id: number; roll_state: string }) => v.student_id == val.student_id)
            if (arr.length) {
                if (val.roll_state === arr[0]?.roll_state) {
                    return state
                } else {
                    return {
                        ...state,
                        studentRolls: state.studentRolls.map((m: { student_id: number; roll_state: string }) =>
                            val.student_id === m.student_id ? { ...m, roll_state: val.roll_state } : m
                        ),
                        all_data: state.all_data && state?.all_data.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)),
                        fetched: state.fetched && state?.fetched.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)),
                    }
                }
            }
            return {
                ...state,
                studentRolls: [...state.studentRolls, val],
                all_data: state.all_data && state?.all_data.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)),
                fetched: state.fetched && state?.fetched.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)),
            }
        case "reset_all_data":
            return { ...state, all_data: state.list_of_all_students,studentRolls:initialState.studentRolls }
        default:
            return state
    }
}

export const RollProvider = ({ children }: { children: ReactNode }) => {
    const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
    const [state, dispatch] = useReducer(rollReducer, initialState)
    const [getActivities, dataActivity, loadStateActivity] = useApi<{ activity: Activity[] }>({ url: "get-activities" })

    useEffect(() => {
        void getStudents()
    }, [getStudents])

    useEffect(() => {
        if (loadState === "loaded" && data) {
            let students: Person[] = data?.students.sort((a: Person, b: Person): number => {
                return a.first_name < b.first_name ? -1 : 1
            })
            let newStudentsArray: Person[] = students?.map((student: Person) => ({ ...student, rollValue: "unmark" }))
            dispatch({ type: "all_data", payload: newStudentsArray })
        }
    }, [loadState])

    const loadStateActivityCall = () => {
        void getActivities()
    }

    // Fix state for activity since UI shows older state first and then updates it
    useEffect(() => {
        if (loadStateActivity === "loaded" && dataActivity) {
            dispatch({ type: "all_activity", payload: dataActivity?.activity })
        }
    }, [loadStateActivity, getActivities])

    return <RollContext.Provider value={{ state, dispatch, loadState, loadStateActivity, loadStateActivityCall }}>{children}</RollContext.Provider>
}
