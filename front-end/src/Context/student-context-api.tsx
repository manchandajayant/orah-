import React, { createContext, useReducer, ReactNode, useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"

interface state {
  // present: number,
  // absent: number,
  // late: number,
  // total: number,
  studentRolls: any
  all_podcasts: any
}

const initialState: state = {
  // present: 0,
  // absent: 0,
  // late: 0,
  // total: 0,
  studentRolls: [],
  all_podcasts: [],
}

export type Action = { type: "all_data"; payload: {} }
export type State = typeof initialState
export type sortedDataArray = Person[] | undefined
export type Dispatch = (action: Action) => void

// Change this to define types properly
export const RollContext = createContext<any>({} as any)

const rollReducer = (state: State, action: Action) => {
  console.log(action)
  switch (action.type) {
    case "all_data":
      return { ...state, ["all_data"]: action.payload }
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
      dispatch({ type: "all_data", payload: { newStudentsArray } })
      setsortedDataArray(students)
    }
  }, [loadState])

  return <RollContext.Provider value={{ state, dispatch, sortedDataArray, loadState }}>{children}</RollContext.Provider>
}
