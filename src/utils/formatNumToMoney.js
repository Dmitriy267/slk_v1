// Перевод числа в денежный формат
export const formatNum = (num) => {
  if (num) {
    const numStr = num.toLocaleString('ru-RU');
    return numStr;
  }
};
