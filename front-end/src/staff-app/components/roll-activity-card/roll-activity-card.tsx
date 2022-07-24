import React from "react"
import styled from "styled-components"
import { Colors } from "shared/styles/colors"
import { Spacing, BorderRadius } from "shared/styles/styles"
import { Activity } from "shared/models/activity"
import moment from 'moment';

interface CardProps {
  data: Activity[]
}

const CardComponent: React.FC<CardProps> = ({ data }) => {
  return (
    <S.CardContainer>
      {data?.map((activity: Activity, index: number) => {
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
              <S.Date>{moment(activity.date).format('MMMM Do, YYYY') + '  ' + moment(activity.date).format('hh:mm A')}</S.Date>
            </S.Section>
            <S.Section>
              <S.CircleContainer>
                <S.Circles color={Colors.gradients.colorsForRoll[0]}></S.Circles>
                <S.CircleNumber><S.Span>Present : </S.Span> {obj.present}</S.CircleNumber>
              </S.CircleContainer>
              <S.CircleContainer>
                <S.Circles color={Colors.gradients.colorsForRoll[1]}></S.Circles>
                <S.CircleNumber><S.Span>Late : </S.Span>{obj.late}</S.CircleNumber>
              </S.CircleContainer>
              <S.CircleContainer>
                <S.Circles color={Colors.gradients.colorsForRoll[2]}></S.Circles>
                <S.CircleNumber><S.Span>Absent : </S.Span>{obj.absent}</S.CircleNumber>
              </S.CircleContainer>
            </S.Section>
          </S.Card>
        )
      })}
    </S.CardContainer>
  )
}

const S = {
  CardContainer: styled.div`
  width: 100%;
  height: auto;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
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
    font-weight:bold;
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
    color:#808080;
  `,
  Circles: styled.span`
    height: 25px;
    width: 25px;
    background-image: ${(props) => props.color};
    border-radius: 50%;
    display: flex;
    margin: ${Spacing.u3};
  `,
  Span:styled.span`
    /* font-weight:700; */
    color:#808080;
  `
}

export default CardComponent
