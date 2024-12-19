import React, { useState } from "react";
import * as S from "./style";
import Header from "./elements/header";
import SetFooter from "./elements/footer/set";
import NotSetFooter from "./elements/footer/notSet";
import SideBar from "./elements/sideBar";
import { useChangeState } from "../../store/plannerState";
import { useSetColor } from "../../store/setColor";

const Home = () => {
  const [isButton, setIsButton] = useState<boolean>(true);
  const { isConfirm } = useChangeState();
  const { bgColor } = useSetColor();
  const footervalue = {
    isButton,
    setIsButton,
  };

  return (
    <S.Container>
      <S.Sign src="/images/sign.svg" />
      <SideBar />
      <S.MainContainer>
        <Header />
        <S.Content>
          <S.Table bgColor={bgColor}>
            {isConfirm ? null : "테이블이 비었어요!"}
          </S.Table>
        </S.Content>
        {isConfirm ? (
          <SetFooter footerValue={footervalue} />
        ) : (
          <NotSetFooter footerValue={footervalue} />
        )}
      </S.MainContainer>
    </S.Container>
  );
};

export default Home;
