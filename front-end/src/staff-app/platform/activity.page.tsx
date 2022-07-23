import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Spacing, BorderRadius } from "shared/styles/styles"
import { RollContext } from "Context/student-context-api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Activity } from "shared/models/activity"
import { Colors } from "shared/styles/colors"

export const ActivityPage: React.FC = () => {
  const { loadStateActivity, state, loadStateActivityCall } = useContext(RollContext)

  useEffect(() => {
    if (loadStateActivity) {
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
        <>
          {state.all_activity?.activity?.length < 1 ? (
            <div>You have no rolls at the moment</div>
          ) : (
            <S.CardContainer>
              {state.all_activity?.activity?.map((activity: Activity, index: number) => {
                var obj: any = {}
                activity.entity.student_roll_states.forEach((s) => {
                  if (s.roll_state in obj) {
                    obj[s.roll_state] += 1
                  } else {
                    obj[s.roll_state] = 1
                  }
                })
                return (
                  <S.Card key={index}>
                    <S.Section>
                      <S.Name>{activity.entity.name}</S.Name>
                      <S.Total>Total: {activity.entity.student_roll_states.length}</S.Total>
                      <S.Date>{String(new Date(activity.date))}</S.Date>
                    </S.Section>
                    <S.Section>
                      <S.CircleContainer>
                        <S.Circles color={Colors.gradients.colorsForRoll[0]}></S.Circles>
                        <S.CircleNumber>Present: {obj.present}</S.CircleNumber>
                      </S.CircleContainer>
                      <S.CircleContainer>
                        <S.Circles color={Colors.gradients.colorsForRoll[1]}></S.Circles>
                        <S.CircleNumber>Late: {obj.late}</S.CircleNumber>
                      </S.CircleContainer>
                      <S.CircleContainer>
                        <S.Circles color={Colors.gradients.colorsForRoll[2]}></S.Circles>
                        <S.CircleNumber>Absent: {obj.absent}</S.CircleNumber>
                      </S.CircleContainer>
                    </S.Section>
                  </S.Card>
                )
              })}
            </S.CardContainer>
          )}
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
  ActivityLog: styled.div`
    display: flex;
    justify-content: center;
    font-size:26px;
    margin-left: 12%;
    margin-bottom: 7%;
  `,
  CardContainer: styled.div`
    width: 100%;
    height: auto;
    margin-left: 12%;
  `,
  Card: styled.div`
    background-color: #fff;
    width: 100%;
    height: auto;
    border-radius: ${BorderRadius.default};
    font-family: "Nunito Sans", sans-serif;
    display: flex;
    justify-content: space-between;
    border: 1px solid #e5e5e5;
    margin-bottom: 3%;
  `,
  Name: styled.div`
    width: 100%;
    height: auto;
    line-height: ${Spacing.u10};
    margin: ${Spacing.u5} ${Spacing.u5} 0 ${Spacing.u5};
  `,
  Date: styled.div`
    font-family: "Nunito Sans", sans-serif;
    margin: ${Spacing.u3} ${Spacing.u5};
  `,
  Section: styled.div`
    font-family: "Nunito Sans", sans-serif;
  `,
  Total: styled.div`
    font-family: "Nunito Sans", sans-serif;
    margin-left: ${Spacing.u5};
  `,
  CircleContainer: styled.div`
    display: flex;
  `,
  CircleNumber: styled.span`
    font-family: "Nunito Sans", sans-serif;
    margin: 15px;
    color: #0b152f;
  `,
  Circles: styled.span`
    height: 25px;
    width: 25px;
    background-image: ${(props) => props.color};
    border-radius: 50%;
    display: flex;
    margin: ${Spacing.u3};
  `,
}
