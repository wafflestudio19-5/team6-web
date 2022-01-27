export const calculateTimeDifference = (
  create: string | undefined,
  bringUp: string | undefined
) => {
  const now = new Date();
  if (!!create && !!bringUp) {
    const init = new Date(create);
    const bump = new Date(bringUp);
    if (init.getTime() - bump.getTime() === 0) {
      if ((now.getTime() - init.getTime()) / 1000 < 60)
        return (
          Math.floor((now.getTime() - init.getTime()) / 1000).toString() +
          "초 전"
        );
      else if ((now.getTime() - init.getTime()) / (1000 * 60) < 60)
        return (
          Math.floor(
            (now.getTime() - init.getTime()) / (1000 * 60)
          ).toString() + "분 전"
        );
      else if ((now.getTime() - init.getTime()) / (1000 * 60 * 60) < 24)
        return (
          Math.floor(
            (now.getTime() - init.getTime()) / (1000 * 60 * 60)
          ).toString() + "시간 전"
        );
      else
        return (
          Math.floor(
            (now.getTime() - init.getTime()) / (1000 * 60 * 60 * 24)
          ).toString() + "일 전"
        );
    } else {
      if ((now.getTime() - bump.getTime()) / 1000 < 60)
        return (
          "끌올 " +
          Math.floor((now.getTime() - bump.getTime()) / 1000).toString() +
          "초 전"
        );
      else if ((now.getTime() - bump.getTime()) / (1000 * 60) < 60)
        return (
          "끌올 " +
          Math.floor(
            (now.getTime() - bump.getTime()) / (1000 * 60)
          ).toString() +
          "분 전"
        );
      else if ((now.getTime() - bump.getTime()) / (1000 * 60 * 60) < 24)
        return (
          "끌올 " +
          Math.floor(
            (now.getTime() - bump.getTime()) / (1000 * 60 * 60)
          ).toString() +
          "시간 전"
        );
      else
        return (
          "끌올 " +
          Math.floor(
            (now.getTime() - bump.getTime()) / (1000 * 60 * 60 * 24)
          ).toString() +
          "일 전"
        );
    }
  } else return null;
};

export const calculateTimeDifferenceForProfile = (
  current: string | undefined
) => {
  if (!!current) {
    const now = new Date();
    const late = new Date(current);
    if ((now.getTime() - late.getTime()) / 1000 < 60)
      return (
        Math.floor((now.getTime() - late.getTime()) / 1000).toString() + "초 전"
      );
    // 초 단위
    else if ((now.getTime() - late.getTime()) / (1000 * 60) < 60)
      return (
        Math.floor((now.getTime() - late.getTime()) / (1000 * 60)).toString() +
        "분 전"
      );
    // 분 단위
    else if ((now.getTime() - late.getTime()) / (1000 * 60 * 60) < 24)
      return (
        Math.floor(
          (now.getTime() - late.getTime()) / (1000 * 60 * 60)
        ).toString() + "시간 전"
      );
    else
      return (
        Math.floor(
          (now.getTime() - late.getTime()) / (1000 * 60 * 60 * 24)
        ).toString() + "일 전"
      );
  } else return null;
};

// 행정동 주소 <~~동>만 걸러내는 함수
export const toShortDivision = (division: string) => {
  const splitDivision = division.split(" ");
  return splitDivision[splitDivision.length - 1];
};

/* phone input을 xxx-xxxx-xxxx 형태로 format */
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  // 숫자가 아닌 부분 지워서 숫자로만 이루어진 문자열로 바꾼다.
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  /* 입력한 숫자 개수가 3개 이하일 경우 */
  if (phoneNumberLength < 4) return phoneNumber;
  /* 입력한 숫자 개수가 4개 이상 7개 이하일 경우 */
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  /* 입력한 숫자 개수 7개 이상일 경우, 11개 입력한 경우 그 이상 입력 안 됨. */
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    7
  )}-${phoneNumber.slice(7, 11)}`;
};
