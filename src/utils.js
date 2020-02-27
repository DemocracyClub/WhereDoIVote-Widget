function getWordsFromNumber(n, translations) {
  let word;
  switch (n) {
    case 1:
      word = translations['numbers.one'];
      break;
    case 2:
      word = translations['numbers.two'];
      break;
    case 3:
      word = translations['numbers.three'];
      break;
    case 4:
      word = translations['numbers.four'];
      break;
    case 5:
      word = translations['numbers.five'];
      break;
    case 6:
      word = translations['numbers.six'];
      break;
    case 7:
      word = translations['numbers.seven'];
      break;
    case 8:
      word = translations['numbers.eight'];
      break;
    case 9:
      word = translations['numbers.nine'];
      break;
    case 10:
      word = translations['numbers.ten'];
      break;
    default:
      word = 'an unknown number of';
  }
  return word;
}

export default getWordsFromNumber;
