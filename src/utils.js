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

function formatPrimaryStationObject(station) {
  const stationProperties = station.properties;
  let address = stationProperties.address.replace(/\n+/g, ', ');

  if (stationProperties.postcode) {
    address += ', ' + stationProperties.postcode;
  }

  return {
    address: address,
    location: station?.geometry?.coordinates,
  };
}

function formatAlternativeStationObject(station) {
  let address = station.name + ', ' + station.address.replace(/\n+/g, ', ');

  if (station.postcode) {
    address += ', ' + station.postcode;
  }

  return {
    address: address,
    location: station?.location?.coordinates,
    opening_times: station.opening_times,
  };
}

export {
  getWordsFromNumber,
  formatDateCy,
  formatDate,
  formatPrimaryStationObject,
  formatAlternativeStationObject,
};
