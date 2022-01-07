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
export const toShortDivision = (division: any) => {
  return division.split(" ").at(-1);
};
