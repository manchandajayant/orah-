import React, { useState, useEffect } from "react"
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

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [onLoadSort, setOnLoadSort] = useState<Boolean>(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [sortedStudentsArray, setSortedStudentsArray] = useState<Person[] | undefined>([])
  const [ascendOrDescend, setAscendOrDescend] = useState<String>("ascend")
  useEffect(() => {
    void getStudents()
  }, [getStudents])

  useEffect(() => {
    if (loadState === "loaded") {
      let students: Person[] | undefined = data?.students.sort((a: Person, b: Person): number => {
        return a.first_name < b.first_name ? -1 : 1
      })
      setSortedStudentsArray(students)
      setOnLoadSort(true)
    }
  }, [loadState])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  const onClickSort = (action: sortAction) => {
    setAscendOrDescend(action)
    if (action === "ascend") {
      let students: Person[] | undefined = sortedStudentsArray?.sort((a: Person, b: Person): number => {
        return a.first_name < b.first_name ? -1 : 1
      })
      setSortedStudentsArray(students)
    } else {
      let students: Person[] | undefined = sortedStudentsArray?.sort((a: Person, b: Person): number => {
        return b.first_name < a.first_name ? -1 : 1
      })
      setSortedStudentsArray(students)
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} ascendOrDescend={ascendOrDescend} onClickSort={onClickSort} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && onLoadSort && (
          <>
            {sortedStudentsArray?.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
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
type sortAction = "ascend" | "descend"
interface ToolbarProps {
  ascendOrDescend: String
  onClickSort: (action: sortAction, value?: string) => void
  onItemClick: (action: ToolbarAction, value?: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, ascendOrDescend, onClickSort } = props
  return (
    <S.ToolbarContainer>
      <div>
        First Name
        <S.IconContainer onClick={() => onClickSort(ascendOrDescend === "ascend" ? "descend" : "ascend")}>
          <FontAwesomeIcon icon={ascendOrDescend === "ascend" ? "sort-alpha-down" : "sort-alpha-up"} />
        </S.IconContainer>
      </div>
      <div>Search</div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Open Sans", sans-serif;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-family: "Open Sans", sans-serif;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  IconContainer: styled.span`
    margin-left: 10px;
    cursor: pointer;
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-family: "Open Sans", sans-serif;
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
