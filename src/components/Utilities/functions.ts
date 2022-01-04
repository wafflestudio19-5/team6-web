export const calculateTimeDifference = (current: string | undefined) => {
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
