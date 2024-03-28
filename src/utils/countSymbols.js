export const countSymbols = (data, handler) => {
  const paragraphs = data.texts.slice(1);
  let symbolsAmount = 0;
  
  for (let i = 0; i <= paragraphs.length; i++) {
    const paragraphSymbols = data.texts[i].text.length;
    symbolsAmount = paragraphSymbols + symbolsAmount;
    if (symbolsAmount <= 550) {
      handler(i);
    } else {
      return;
    }
  }
};
