function getWordsFromNumber(n, translations) {
  if (`numbers.${n}` in translations) {
    return translations[`numbers.${n}`];
  }
  return n;
}

export default getWordsFromNumber;
