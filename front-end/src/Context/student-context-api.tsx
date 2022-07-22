import React, { createContext, useReducer, ReactNode, useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { RollInput } from "shared/models/roll"

interface state {
  fetched:any
  all_data: any
  studentRolls: any
}

const initialState: state = {
  fetched:[],
  all_data: [],
  studentRolls: [],
}

interface ActionType {
  type: string
  payload?: {}
}

// Refactor to add action type so that the action can be without a payload
export type Action = { type: "all_data"; payload: {} } | { type: "student_rolls"; payload: {} } | { type: "present" | "absent" | "late"; payload: {} }
export type State = typeof initialState
export type sortedDataArray = Person[] | undefined
export type Dispatch = (action: Action) => void

// Change this to define types properly
export const RollContext = createContext<any>({} as any)

const rollReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "all_data":
      return { ...state, all_data: action.payload, fetched:action.payload }
    case "present": case "absent": case "late":
      let all_students = state.fetched.students
      let filtered = all_students.filter((obj: Person) => {
        return obj.rollValue === action.type
      })
      console.log(filtered)
      if(filtered.length){
        return { ...state, all_data: { students: filtered } }
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
            studentRolls: state.studentRolls.map((m: { student_id: number; roll_state: string }) => (val.student_id === m.student_id ? { ...m, roll_state: val.roll_state } : m)),
            all_data: { students: state?.all_data.students.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)) },
            fetched:{ students: state?.fetched.students.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)) },
          }
        }
      }
      // console.log(state.all_data)
      return {
        ...state,
        studentRolls: [...state.studentRolls, val],
        all_data: { students: state?.all_data.students.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)) },
        fetched:{ students: state?.fetched.students.map((m: Person) => (val.student_id === m.id ? { ...m, rollValue: val.roll_state } : m)) },
      }
    default:
      return state
  }
}

export const RollProvider = ({ children }: { children: ReactNode }) => {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [sortedDataArray, setsortedDataArray] = useState<Person[] | undefined>([])
  const [state, dispatch] = useReducer(rollReducer, initialState)

  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (loadState === "loaded") {
      let students: Person[] | undefined = data?.students.sort((a: Person, b: Person): number => {
        return a.first_name < b.first_name ? -1 : 1
      })
      let newStudentsArray = students?.map((student: {}) => ({ ...student, rollValue: "unmark" }))
      dispatch({ type: "all_data", payload: { students: newStudentsArray } })
      setsortedDataArray(students)
    }
  }, [loadState])

  return <RollContext.Provider value={{ state, dispatch, sortedDataArray, loadState }}>{children}</RollContext.Provider>
}
