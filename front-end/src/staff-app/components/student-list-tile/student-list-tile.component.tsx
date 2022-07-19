import React from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Images } from "assets/images"
import { Colors } from "shared/styles/colors"
import { Person, PersonHelper } from "shared/models/person"
import { RollStateSwitcher } from "staff-app/components/roll-state/roll-state-switcher.component"

interface Props {
  isRollMode?: boolean
  student: Person
  order:string
}
export const StudentListTile: React.FC<Props> = ({ isRollMode, student, order }) => {
  return (
    <S.Container>
      <S.Avatar url={Images.user_alt}></S.Avatar>
      <S.Content>
        <div>{PersonHelper.getFullName(student,order)}</div>
      </S.Content>
      {isRollMode && (
        <S.Roll>
          <RollStateSwitcher />
        </S.Roll>
      )}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin-top: 0.5px;
    padding-right: ${Spacing.u2};
    display: flex;
    border-bottom:solid 1px #dee2e6;
    background-color: #fff;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Avatar: styled.div<{ url: string }>`
    width: 60px;
    height:60px;
    background-image: url(${({ url }) => url});
    background-size: cover;
    background-position: 50%;
    align-self: stretch;
    margin:3px;
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.added.site};
    font-weight: ${FontWeight.strong};
  `,
  Roll: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u4};
  `,
}
