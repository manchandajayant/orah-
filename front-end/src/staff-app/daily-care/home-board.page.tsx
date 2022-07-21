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
import {RollContext} from "Context/student-context-api"
export const HomeBoardPage: React.FC = () => {
  const {state,sortedDataArray,dispatch} = useContext(RollContext)
  // console.log(first,dispatch)
  const [isRollMode, setIsRollMode] = useState(false)
  const [onLoadSort, setOnLoadSort] = useState<Boolean>(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [sortedStudentsArray, setSortedStudentsArray] = useState<Person[] | undefined>([])
  const [ascendOrDescend, setAscendOrDescend] = useState<string>("ascend")
  const [order, setOrder] = useState<string>("first")
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

  // function which recieves action
  const onClickSort = (action: sortAction) => {
    dispatch('present')
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


  const searchForStudents = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(e.target.value.length >= 1) {
      let filtered:Person[] | undefined = data?.students.filter((person:Person)=>{
        let str:string = person.first_name.toLocaleLowerCase() + person.last_name.toLocaleLowerCase()
        return str.includes(e.target.value.toLocaleLowerCase())
      })
      setSortedStudentsArray(filtered)
    } else {
      setSortedStudentsArray(data?.students)
    }
  }

  return (
    <>
      <S.PageContainer>
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
type sortAction = "ascend" | "descend" | "first" | "last"
interface ToolbarProps {
  ascendOrDescend: string
  searchForStudents: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickSort: (action: sortAction, value?: string) => void
  onItemClick: (action: ToolbarAction, value?: string) => void
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, ascendOrDescend, onClickSort,searchForStudents } = props
  return (
    <S.ToolbarContainer>
      <S.LeftSideContainer>
        Sort By:
        <S.Options>
          <S.Option onClick={() => onClickSort("first")}>First Name</S.Option>
          <S.Option onClick={() => onClickSort("last")}>Last Name</S.Option>
        </S.Options>
        <S.IconContainer onClick={() => onClickSort(ascendOrDescend === "ascend" ? "descend" : "ascend")}>
          <FontAwesomeIcon icon={ascendOrDescend === "ascend" ? "sort-alpha-down" : "sort-alpha-up"} />
        </S.IconContainer>
      </S.LeftSideContainer>
      <div>
        <input type="text" onChange={searchForStudents}/>
      </div>
      <S.Button onClick={() => onItemClick("roll")}><img src={Images.attendance} width={"30px"} height={"30px"}/></S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Open Sans", sans-serif;
    border:solid 1px #DFDFDE;
    border-radius:${BorderRadius.default};
    width: 60%;
    margin: 2% 0 0 27%;
    @media screen and (max-width: 800px){
      width:80%;
      margin: ${Spacing.u4} auto 600px;
    }
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    background-color: ${Colors.added.base};
    padding: 6px 14px;
    font-family: "Open Sans", sans-serif;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  IconContainer: styled.span`
    margin-left: 10px;
    cursor: pointer;
  `,
  Options:styled.div`
    display:block
  `,
  Option:styled.span`
    display:block
  `,
  LeftSideContainer:styled.div`
  display:flex
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
