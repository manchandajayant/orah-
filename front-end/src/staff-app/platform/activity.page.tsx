import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { Spacing, BorderRadius } from "shared/styles/styles"
import { RollContext } from "context/student-context-api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import CardComponent from "staff-app/components/roll-activity-card/roll-activity-card"

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
                <>{state.all_activity?.activity?.length < 1 ? <div>You have no rolls at the moment</div> : <CardComponent data={state?.all_activity?.activity} />}</>
            )}

            {loadStateActivity === "error" && (
                <CenteredContainer>
                    <div>Failed to load</div>
                </CenteredContainer>
            )}
        </S.Container>
    )
}

const S = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        font-family: "Nunito Sans", sans-serif;
        width: 60%;
        margin: 2% 0 10% 27%;
        @media screen and (max-width: 800px) {
            width: 80%;
            margin: ${Spacing.u4} auto 600px;
        }
    `,
    ActivityLog: styled.div`
        display: flex;
        justify-content: center;
        font-size: 26px;
        margin-bottom: 7%;
        @media screen and (max-width: 800px) {
            width: 80%;
            margin-left: 10%;
        }
    `,
    CardContainer: styled.div`
        width: 100%;
        height: auto;
        @media screen and (max-width: 800px) {
            width: 80%;
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
