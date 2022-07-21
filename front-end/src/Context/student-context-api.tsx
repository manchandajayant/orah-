import React, { createContext, useReducer, ReactNode,useEffect, useState } from "react"
import { useApi } from "shared/hooks/use-api"
import { Person } from "shared/models/person"



const defaultState = {
  present: 0,
  absent: 0,
  late: 0,
  total: 0,
}

export type Action = "present" | "absent" | "late" | "all"
export type State = typeof defaultState
export type sortedDataArray = Person[] | undefined
export type Dispatch = (action: Action) => void

// Change this to define types properly
export const RollContext = createContext<any>({} as any)

const rollReducer = (state: State, action: Action) => {
  switch (action) {
    case "present":
      return {
        ...state,
        present: state.present + 1,
      }
    case "absent":
      return {
        ...state,
        absent: state.absent + 1,
      }
    case "late":
      return {
        ...state,
        late: state.late + 1,
      }
    case "all":
      return {
        ...state,
        all: state.total + 1,
      }
  }
}

export const RollProvider = ({ children }: { children: ReactNode }) => {
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [sortedDataArray, setsortedDataArray] = useState<Person[] | undefined>([])
  const [state, dispatch] = useReducer(rollReducer, defaultState)

  useEffect(() => {
    void getStudents()
  }, [])

  useEffect(() => {
    if (loadState === "loaded") {
      let students: Person[] | undefined = data?.students.sort((a: Person, b: Person): number => {
        return a.first_name < b.first_name ? -1 : 1
      })
      setsortedDataArray(students)
    }
  }, [loadState])
  
  
  return <RollContext.Provider value={{ state, dispatch, sortedDataArray,loadState }}>{children}</RollContext.Provider>
}
