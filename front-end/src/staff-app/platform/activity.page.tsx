import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Person } from "shared/models/person"
import { RollContext } from "Context/student-context-api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"

export const ActivityPage: React.FC = () => {
  const { loadStateActivity, state, loadStateActivityCall } = useContext(RollContext)

  useEffect(() => {
    void loadStateActivityCall()
  }, [])
  console.log(state)

  return (
    <S.Container>
      {loadStateActivity === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}

      {loadStateActivity === "loaded" && (
        <>{state.all_activity.activity.students.length > 1 ? <div>Here is a list of students</div> : <div>You have no rolls at the moment</div>}</>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
