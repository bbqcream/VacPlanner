import React, { useEffect, useState } from "react";
import * as S from "./style";
import { useChangeState } from "../../../../store/plannerState";
import { useSetColor } from "../../../../store/setColor";
import { useSelectTable } from "../../../../store/useSelectTable";

const SideBar = () => {
  const [isClose, setIsClose] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const { isConfirm } = useChangeState();
  const { bgColor, setBgColor } = useSetColor();
  const [bgImg, setBgImg] = useState<String>("");
  const { selectTable } = useSelectTable();

  const change: React.FC = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const uploadFile = files?.[0];
    if (uploadFile) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      setBgImg(uploadFile.name);
    }
  };

  const handleStopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.Container
      isClose={isClose}
      isConfirm={isConfirm}
      selectTable={selectTable}
      onClick={handleStopClick}
    >
      <S.Push
        src="/images/push.svg"
        onClick={() => setIsClose((prev) => !prev)}
        isClose={isClose}
      />
      <S.FuncWrapper isClose={isClose}>
        <S.FuncContainer>
          <S.Func>
            배경색 :
            <S.ChooseColor bgColor={bgColor}>
              <S.ColorBox
                type="color"
                onChange={(e) => setBgColor(e.target.value)}
                value={bgColor}
              />
              {bgColor}
            </S.ChooseColor>
          </S.Func>
          <S.Func>
            내용 :
            <S.DetailInput
              placeholder="이름을 입력해주세요."
              onChange={(e) => setName(e.target.value)}
            />
          </S.Func>
          <S.TimeFunc>
            시간 :
            <S.TimeWrapper>
              <S.TimeInput type="time" />-
              <S.TimeInput type="time" />
            </S.TimeWrapper>
          </S.TimeFunc>
          <S.Func>
            <S.Poster htmlFor="file">
              사진 :{" "}
              <S.ImageText>{bgImg ? `${bgImg}` : "이미지 업로드"}</S.ImageText>
            </S.Poster>
            <S.PosterInput
              type="file"
              name="file"
              id="file"
              onChange={change}
              accept=".jpg, .png,"
            />
          </S.Func>
        </S.FuncContainer>
        <S.DeleteButton>테이블 삭제</S.DeleteButton>
      </S.FuncWrapper>
    </S.Container>
  );
};

export default SideBar;
