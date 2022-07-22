import React, { createContext, useReducer, ReactNode, useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"
import { RollInput } from "shared/models/roll"
interface state {
  // present: number,
  // absent: number,
  // late: number,
  // total: number,
  studentRolls: any
}

const initialState: state = {
  // present: 0,
  // absent: 0,
  // late: 0,
  // total: 0,
  studentRolls: [],
}

export type Action = { type: "all_data"; payload: {} } | { type: "student_rolls"; payload: {} }
export type State = typeof initialState
export type sortedDataArray = Person[] | undefined
export type Dispatch = (action: Action) => void

// Change this to define types properly
export const RollContext = createContext<any>({} as any)

const rollReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "all_data":
      return { ...state, [action.type]: action.payload }
    case "student_rolls":
      // change to correct type
      let val: any = action.payload
      let arr = state.studentRolls.filter((v: { student_id: number; roll_state: string }) => 
        v.student_id == val.student_id 
      )
      if (arr.length) {
        if (val.roll_state === arr[0]?.roll_state) {
          return state
        } else {
          return {
            ...state,
            studentRolls: state.studentRolls.map((m: { student_id: number; roll_state: string }) =>
            val.student_id === m.student_id ? { ...m, roll_state: val.roll_state } : m
            ),
          }
        }
      }
      return { ...state, studentRolls: [...state.studentRolls, val] }
    default:
      return state
    // case "present":
    //   return {
    //     ...state,
    //     present: state.present + 1,
    //   }
    // case "absent":
    //   return {
    //     ...state,
    //     absent: state.absent + 1,
    //   }
    // case "late":
    //   return {
    //     ...state,
    //     late: state.late + 1,
    //   }
    // case "all":
    //   return {...state,studentRolls:[...state.all_podcasts, "new"]}

    // case "rollCall":
    //     return {...state,studentRolls:[...state.studentRolls, "a new item"]}
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
