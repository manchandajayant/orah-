import React, { useState, useContext,useEffect } from "react"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { RollContext } from "context/student-context-api"
import { Person } from "shared/models/person"
interface Props {
  initialState?: RolllStateType
  size?: number
  onStateChange?: (newState: RolllStateType) => void
  student: Person
}
export const RollStateSwitcher: React.FC<Props> = ({ initialState = "unmark", size = 40, onStateChange, student }) => {
  const { loadState, state, dispatch } = useContext(RollContext)
  // Set right data type
  const [rollState, setRollState] = useState<any>(initialState)

  useEffect(() => {
    setRollState(student.rollValue)
  }, [student])
  
  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }

  const onClick = () => {
    const next = nextState()
    setRollState(next)
    dispatch({ type: "student_rolls", payload: { student_id: student.id, roll_state: next } })
    if (onStateChange) {
      onStateChange(next)
    }
  }

  return <RollStateIcon type={rollState} size={size} onClick={onClick} student={student}/>
}
