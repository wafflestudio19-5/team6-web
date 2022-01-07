export const calculateTimeDifference = (init: Date, bump: Date) => {
  const now = new Date();
  if (init.getTime() - bump.getTime() === 0) {
    if ((now.getTime() - init.getTime()) / 1000 < 60)
      return (
        Math.floor((now.getTime() - init.getTime()) / 1000).toString() + "초 전"
      );
    // 초 단위
    else if ((now.getTime() - init.getTime()) / (1000 * 60) < 60)
      return (
        Math.floor((now.getTime() - init.getTime()) / (1000 * 60)).toString() +
        "분 전"
      );
    // 분 단위
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
    // 초 단위
    else if ((now.getTime() - bump.getTime()) / (1000 * 60) < 60)
      return (
        "끌올 " +
        Math.floor((now.getTime() - bump.getTime()) / (1000 * 60)).toString() +
        "분 전"
      );
    // 분 단위
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
};
