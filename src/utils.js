function getWordsFromNumber(n, translations) {
  if (`numbers.${n}` in translations) {
    return translations[`numbers.${n}`];
  }
  return n;
}

function formatDateCy(date) {
  // days are 0-indexed, starting from Sunday
  const days = [
    'Dydd Sul',
    'Dydd Llun',
    'Dydd Mawrth',
    'Dydd Mercher',
    'Dydd Iau',
    'Dydd Gwener',
    'Dydd Sadwrn',
  ];

  // months are 0-indexed, starting from January
  const months = [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ];

  return `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

function formatDate(date, locale) {
  let formattedDate = date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (locale == 'cy' && Intl.DateTimeFormat.supportedLocalesOf('cy').length == 0) {
    formattedDate = formatDateCy(date);
  }

  return formattedDate;
}

export { getWordsFromNumber, formatDateCy, formatDate };
