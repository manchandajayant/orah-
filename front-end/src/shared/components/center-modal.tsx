import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { BorderRadius } from "shared/styles/styles"
import styled from "styled-components"
import { CenteredContainer } from "./centered-container/centered-container.component"

const CenterModal = () => {
    return (
        <S.ModalOverLay>
            <S.Modal>
                <CenteredContainer>
                    <FontAwesomeIcon icon="spinner" size="2x" spin />
                    <S.h5>Please wait while we record your activity</S.h5>
                    <S.h6>You will be redirected to activity page afterwards</S.h6>
                </CenteredContainer>
            </S.Modal>
        </S.ModalOverLay>
    )
}

const S = {
    ModalOverLay: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 300vw;
        height: 100vh;
        background-color: rgba(128, 128, 128, 0.5);
    `,
    Modal: styled.div`
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        height: 200px;
        width: 400px;
        background-color: white;
        border: solid 1px #e7d7d7;
        border-radius: ${BorderRadius.default};
        @media screen and (max-width: 800px) {
            height: 200px;
            width: 380px;
        }
    `,
    h5: styled.div`
        @media screen and (max-width: 800px) {
            font-size: 12px;
            margin-top:13px;
            margin-bottom:9px;
        }
    `,
    h6: styled.div`
        @media screen and (max-width: 800px) {
            font-size: 10px;
        }
    `,
}

export default CenterModal
