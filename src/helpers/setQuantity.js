export const checkWindowWidth = (mobile, desktop) => {
  const screenWidth = window.screen.width;

  if (screenWidth <= 550) {
    return mobile;
  } else {
    return desktop;
  }
};
