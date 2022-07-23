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
    if(loadStateActivity){
      void loadStateActivityCall()
    }
  }, [])


  return (
    <S.Container>
      <S.ActivityLog>Activity Log</S.ActivityLog>
      {loadStateActivity === "loading" && (
        <CenteredContainer>
          <FontAwesomeIcon icon="spinner" size="2x" spin />
        </CenteredContainer>
      )}

      {loadStateActivity === "loaded" && (
        <>{state.all_activity?.activity?.length < 1 ? <div>You have no rolls at the moment</div> :
        <div>Here is a list of students</div>
        
        
        }
        </>
        
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
  ActivityLog:styled.div`
    display:flex;
    justify-content:center
  `
}
