import React from "react"
import moment from "moment"

import styled from "styled-components"
import { Colors } from "shared/styles/colors"
import { Spacing, BorderRadius } from "shared/styles/styles"

import { Activity } from "shared/models/activity"
import BarChart from "shared/components/donought-chart-activity"

interface CardProps {
    data: Activity
}

export type obj = {
    [key: string]: number
}

const CardComponent: React.FC<CardProps> = ({ data }) => {
    var obj: obj = {}
    data?.entity?.student_roll_states.forEach((s) => {
        if (s.roll_state in obj) {
            obj[s.roll_state] += 1
        } else {
            obj[s.roll_state] = 1
        }
    })

    return (
        <S.CardContainer>
            <S.Card>
                <S.Section>
                    <S.Name>{data.entity.name}</S.Name>
                    <S.Total>Total: {data.entity.student_roll_states.length}</S.Total>
                    <S.Date>{moment(data.date).format("MMMM Do, YYYY") + "  " + moment(data.date).format("hh:mm A")}</S.Date>
                </S.Section>
                <S.SectionCircles>
                    <BarChart data={obj}/>
                    {/* <S.CircleContainer>
                        <S.Circles color={Colors.gradients.colorsForRoll[0]}></S.Circles>
                        <S.CircleNumber>
                            {obj.present ? obj.present : "--"}
                        </S.CircleNumber>
                    </S.CircleContainer>
                    <S.CircleContainer>
                        <S.Circles color={Colors.gradients.colorsForRoll[1]}></S.Circles>
                        <S.CircleNumber>
                            {obj.late ? obj.late : "--"}
                        </S.CircleNumber>
                    </S.CircleContainer>
                    <S.CircleContainer>
                        <S.Circles color={Colors.gradients.colorsForRoll[2]}></S.Circles>
                        <S.CircleNumber>
                            {obj.absent ? obj.absent : "--"}
                        </S.CircleNumber>
                    </S.CircleContainer> */}
                </S.SectionCircles>
            </S.Card>
        </S.CardContainer>
    )
}

const S = {
    CardContainer: styled.div`
        width: 100%; 
        margin-top:7%;
        @media screen and (max-width: 800px) {
            width: 100%;
        }
    `,
    Card: styled.div`
        background-color: #fff;
        /* height: 600px; */
        /* width: 100%; */
        border-radius: ${BorderRadius.default};
        font-family: "Nunito Sans", sans-serif;
        display: flex;
        justify-content: space-between;
        border: 1px solid #e5e5e5;
        margin-bottom: 3%;
        @media screen and (max-width: 800px) {
            display: block;
        }
    `,
    Section: styled.div`
        font-family: "Nunito Sans", sans-serif;
    `,
    Name: styled.div`
        width: 100%;
        height: auto;
        line-height: ${Spacing.u10};
        font-weight: bold;
        font-size: 22px;
        margin: ${Spacing.u5} ${Spacing.u5} ${Spacing.u1} ${Spacing.u5};
        @media screen and (max-width: 800px) {
            margin: ${Spacing.u5} ${Spacing.u5} 0 ${Spacing.u5};
            font-size: 14px;
        }
    `,
    Date: styled.div`
        font-family: "Nunito Sans", sans-serif;
        margin: ${Spacing.u3} ${Spacing.u5};
        font-size: 14px;
        @media screen and (max-width: 800px) {
            font-size: 12px;
        }
    `,
    SectionCircles: styled.div`
        font-family: "Nunito Sans", sans-serif;
        @media screen and (max-width: 800px) {
            display: flex;
        }
    `,
    Total: styled.div`
        font-family: "Nunito Sans", sans-serif;
        margin-left: ${Spacing.u5};
        font-size: 16px;
        @media screen and (max-width: 800px) {
            font-size: 12px;
        }
    `,
    CircleContainer: styled.div`
        display: flex;
    `,
    CircleNumber: styled.span`
        font-family: "Nunito Sans", sans-serif;
        margin: 15px;
        color: #808080;
        font-size: 14px;
        @media screen and (max-width: 800px) {
            font-size: 12px;
            margin: ${Spacing.u2} 0 0 ${Spacing.u3};
        }
    `,
    Circles: styled.span`
        height: 25px;
        width: 25px;
        background-image: ${(props) => props.color};
        border-radius: 50%;
        display: flex;
        margin: ${Spacing.u3};
        @media screen and (max-width: 800px) {
            height: 15px;
            width: 15px;
            margin: ${Spacing.u2} 0 0 ${Spacing.u3};
        }
    `,
    Span: styled.span`
        /* font-weight:700; */
        color: #808080;
    `,
}

export default CardComponent
