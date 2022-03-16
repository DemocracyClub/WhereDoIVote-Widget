import { waitForElement, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from '../../translations/en';
import cy_messages from '../../translations/cy';
import {
  renderWidget,
  renderWelshWidget,
  renderEnglishWidget,
  renderElectionsWidget,
  renderLegacyWidget,
  typePostcode,
  submitPostcode,
  mockResponse,
} from '../utils/test';

jest.mock(`!!raw-loader!./dc-widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

jest.mock(`!!raw-loader!./ec-widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

afterEach(cleanup);

describe('ElectionInformationWidget General', () => {
  let getByLabelText, getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByLabelText = wrapper.getByLabelText;
    getByTestId = wrapper.getByTestId;
  });

  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const ErrorMessage = await waitForElement(() => document.querySelector('#eiw-error'));

    expect(ErrorMessage).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should give error message malformed postcode is entered', async () => {
    let enteredPostcode = 'aaaa';
    typePostcode(enteredPostcode);
    submitPostcode();
    const ErrorMessage = await waitForElement(() => document.querySelector('#eiw-error'));
    expect(ErrorMessage).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should allow user to start again', async () => {
    let enteredPostcode = 'AA11AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    await waitForElement(() => document.querySelector('.NoUpcomingElection'));
    fireEvent.click(getByLabelText(en_messages['general.start-again']));
    const EnterPostcode = await waitForElement(() => getByTestId('postcode-selector'));
    expect(EnterPostcode).toHaveTextContent(en_messages['postcode.enter-postcode']);
  });

  it("should display 'No upcoming election' message if there isn't an upcoming date", async () => {
    let enteredPostcode = 'AA11AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const NoUpcomingElection = await waitForElement(() =>
      document.querySelector('.NoUpcomingElection')
    );
    expect(NoUpcomingElection).toHaveTextContent(en_messages['elections.unknown']);
  });

  it("should display 'Cancelled Election' for a countermanded election", async () => {
    let enteredPostcode = 'CO168EZ';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Notification = await waitForElement(() => document.querySelector('.Notification'));
    expect(Notification).toHaveTextContent('Cancelled Election');
  });
});

describe('ElectionInformationWidget PollingStation', () => {
  let getByTestId;
  let wrapper;
  beforeEach(async () => {
    wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should show single polling station for multiple ballots on same day', async () => {
    let enteredPostcode = 'LE42TY';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    await waitForElement(() => document.querySelector('.PollingStation'));
    const PollingStations = document.querySelectorAll('.PollingStation');
    expect(PollingStations.length).toBe(1);
  });

  it('shows a title if it finds a polling station', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const YourPollingStation = await waitForElement(() =>
      document.querySelector('.PollingStation')
    );
    expect(YourPollingStation).toHaveTextContent(en_messages['station.your-station']);
  });

  it('renders address of polling station', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const StationAddress = await waitForElement(() => getByTestId('address'));
    expect(StationAddress).toHaveTextContent('York Room');
  });
});

describe('ElectionInformationWidget Address picker', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should load address picker if multiple addresses returned', async () => {
    let enteredPostcode = 'TN48XA';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();

    const firstAddressPickerOption = await waitForElement(() =>
      document.querySelector('#id_address option:first-child')
    );
    expect(firstAddressPickerOption).toHaveTextContent('1 LANGTON ROAD, TUNBRIDGE WELLS');
  });

  it('renders "My address is not in the list" option', async () => {
    let enteredPostcode = 'TN48XA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();

    const lastAddressPickerOption = await waitForElement(() =>
      document.querySelector('#id_address option:last-child')
    );
    expect(lastAddressPickerOption).toHaveTextContent(en_messages['address.not-in-list']);
  });

  it('should show polling station for address chosen from picker', async () => {
    let enteredPostcode = 'TN48XA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const rusthall = await waitForElement(() =>
      document.querySelector('#id_address option:nth-child(27)')
    );
    fireEvent.change(getByTestId('address-select'), {
      target: { value: rusthall.innerHTML },
    });
    const button = await waitForElement(() => getByTestId('address-button'));
    let addressId = '10000066465';
    mockResponse('address', addressId);
    fireEvent.click(button);
    const pollingStation = await waitForElement(() => document.querySelector('.PollingStation'));
    expect(pollingStation).toHaveTextContent('Your polling station');
  });
});

describe('ElectionInformationWidget Electoral Services', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it("should present council to get in touch with when station isn't found", async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    act(() => {
      submitPostcode();
    });
    let councilDetails = await waitForElement(() => getByTestId('council-details'));
    expect(councilDetails).toHaveTextContent(en_messages['general.website']);
    expect(councilDetails).toHaveTextContent(en_messages['general.phone']);
    expect(councilDetails).toHaveTextContent(en_messages['general.email']);
  });

  it('should present NI Electoral Office for N09 postcodes', async () => {
    let enteredPostcode = 'AA15AA';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const results = await waitForElement(() => getByTestId('station-not-found'));
    expect(results).toHaveTextContent(
      'get in touch with The Electoral Office for Northern Ireland'
    );
  });
});

describe('ElectionInformationWidget Welsh Widget', () => {
  beforeEach(async () => {
    renderWelshWidget();
  });

  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#eiw-error'));

    expect(newContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });

  it('should give error message malformed postcode is entered', async () => {
    let enteredPostcode = 'aaaa';
    typePostcode(enteredPostcode);
    submitPostcode();
    const newContent = await waitForElement(() => document.querySelector('#eiw-error'));
    expect(newContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });
});

describe('ElectionInformationWidget Toggleable English Widget', () => {
  let container, getByTestId;

  beforeEach(async () => {
    const wrapper = renderEnglishWidget();
    container = wrapper.container;
    getByTestId = wrapper.getByTestId;
  });

  function chooseLanguage(locale) {
    fireEvent.click(getByTestId(`${locale}-selector`));
  }

  it('should let you translate the widget to Welsh', async () => {
    chooseLanguage('cy');
    submitPostcode();
    const translatedContent = await waitForElement(() => document.querySelector('#eiw-error'));
    expect(translatedContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });

  it('should let you translate the widget to Welsh and back to English again', async () => {
    chooseLanguage('cy');
    submitPostcode();
    chooseLanguage('en');
    const translatedContent = await waitForElement(() => container.querySelector('#eiw-error'));
    expect(translatedContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });
});

describe('ElectionInformationWidget Toggleable Welsh Widget', () => {
  let container, getByTestId;

  beforeEach(async () => {
    const wrapper = renderWelshWidget();
    container = wrapper.container;
    getByTestId = wrapper.getByTestId;
  });

  function chooseLanguage(locale) {
    fireEvent.click(getByTestId(`${locale}-selector`));
  }

  it('should let you translate the widget to English', async () => {
    chooseLanguage('en');
    submitPostcode();
    const translatedContent = await waitForElement(() => document.querySelector('#eiw-error'));
    expect(translatedContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });

  it('should let you translate the widget to English and back to Welsh again', async () => {
    chooseLanguage('en');
    submitPostcode();
    chooseLanguage('cy');
    const translatedContent = await waitForElement(() => container.querySelector('#eiw-error'));
    expect(translatedContent).toHaveTextContent(cy_messages['postcode.errors.invalid-postcode']);
  });
});

describe('ElectionInformationWidget Notifications', () => {
  let getByTestId;

  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should show voter ID requirement for DE13GB', async () => {
    let enteredPostcode = 'DE13GB';

    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const notificationContainer = await waitForElement(() =>
      document.querySelector('.PollingStation article')
    );
    expect(notificationContainer).toHaveTextContent('You need to show ID to vote at this election');
  });

  it('should show an uncontested election for SS30AA', async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const notification = await waitForElement(() => getByTestId('notification'));
    expect(notification).toHaveTextContent('Uncontested Election');
  });

  it('does not show notification when there is no event to be aware of', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const YourPollingStation = await waitForElement(() =>
      document.querySelector('.PollingStation')
    );
    let notification = document.querySelector('.Notification');
    expect(YourPollingStation).toHaveTextContent(en_messages['station.your-station']);
    expect(notification).toBe(null);
  });
});

describe('ElectionInformationWidget Directions', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('renders Google Maps only when no origin present', async () => {
    let enteredPostcode = 'AA22AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleMaps = await waitForElement(() => getByTestId('google-maps'));
    expect(GoogleMaps).toHaveTextContent(en_messages['directions.show-google-maps']);
  });

  it('renders Google Directions only when destination and origin present', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleDirections = await waitForElement(() => getByTestId('google-directions'));
    expect(GoogleDirections).toHaveTextContent(en_messages['directions.show-google-directions']);
  });

  it('does not render out directions when coordinates are not present', async () => {
    let enteredPostcode = 'AA21AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const YourPollingStation = await waitForElement(() =>
      document.querySelector('.PollingStation')
    );
    expect(YourPollingStation).toHaveTextContent(en_messages['station.your-station']);
    let GoogleButton = document.querySelector('.eiw-btn-primary');
    expect(GoogleButton).toBe(null);
  });
});

describe('ElectionInformationWidget Polling station unknown', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should show a station not found page for unknown polling stations', async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    act(() => {
      submitPostcode();
    });
    let stationNotFound = await waitForElement(() => getByTestId('station-not-found'));
    expect(stationNotFound).toHaveTextContent(en_messages['station.not-found']);
  });
});

describe('ElectionInformationWidget Standard Widget', () => {
  beforeEach(() => {
    renderWidget();
  });
  it('should not show general search text on standard widget', async () => {
    const SearchButton = await waitForElement(() => document.querySelector('.eiw-btn-primary'));
    expect(SearchButton).toHaveTextContent(en_messages['postcode.submit-postcode-polling-station']);
  });
  it('should not show candidates on the default widget', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.ElectionInformationWidget'));
    expect(Widget).not.toHaveTextContent('Candidates');
  });
});

describe('ElectionInformationWidget Everything Widget', () => {
  let getByTestId;
  beforeEach(() => {
    const widget = renderElectionsWidget();
    getByTestId = widget.getByTestId;
  });

  it('should show general search text on everything-enabled widget', async () => {
    const SearchButton = await waitForElement(() => document.querySelector('.eiw-btn-primary'));
    expect(SearchButton).toHaveTextContent(en_messages['postcode.submit-postcode-general']);
  });

  it('should show elections section for a postcode', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const ElectionInfo = await waitForElement(() => getByTestId('date-2018-11-22'));
    expect(ElectionInfo).toHaveTextContent('You will have one ballot paper to fill out');
  });

  it("shouldn't show candidates if election is cancelled", async () => {
    let enteredPostcode = 'CO168EZ';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.ElectionInformationWidget'));
    expect(Widget).toHaveTextContent('Tendring local election St Osyth');
    expect(Widget).toHaveTextContent(
      'The poll for this election has been rescheduled due to the sad death of one of the candidates.'
    );
    expect(Widget).not.toHaveTextContent('You will have one ballot paper to fill out');
  });
});

describe('ElectionInformationWidget Legacy Candidates Widget', () => {
  it('should render candidates with legacy candidates data-attribute', async () => {
    renderLegacyWidget();
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const Widget = await waitForElement(() => document.querySelector('.ElectionInformationWidget'));
    expect(Widget).toHaveTextContent('Candidates');
  });
});

describe('ElectionInformationWidget Accessibility', () => {
  let getByTestId;
  beforeEach(async () => {
    const wrapper = renderWidget();
    getByTestId = wrapper.getByTestId;
  });

  it('should include an h1 at the top level of the postcode selector', async () => {
    const PostcodeForm = await waitForElement(() => getByTestId('postcode-selector'));
    let label = `<h1><label class="form-label-bold" for="postcode">`;
    expect(PostcodeForm).toContainHTML(label);
  });

  it('should accept Enter instead of clicking the button', async () => {
    const PostcodeForm = await waitForElement(() => getByTestId('postcode-selector'));
    let button = `<button class="eiw-btn-primary" type="submit">${en_messages['postcode.submit-postcode-polling-station']}</button>`;
    expect(PostcodeForm).toContainHTML(button);
  });
  it('should have a "for" attribute on the postcode form label', async () => {
    const PostcodeForm = await waitForElement(() => getByTestId('postcode-selector'));
    let label = `<label class="form-label-bold" for="postcode">`;
    expect(PostcodeForm).toContainHTML(label);
  });
  it('includes descriptive titles on Google Directions link', async () => {
    let enteredPostcode = 'AA12AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleDirections = await waitForElement(() => getByTestId('google-directions'));
    expect(GoogleDirections).toHaveAttribute(
      'title',
      en_messages['directions.show-google-directions-title']
    );
  });
  it('includes descriptive titles on Google Maps link', async () => {
    let enteredPostcode = 'AA22AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    submitPostcode();
    const GoogleDirections = await waitForElement(() => getByTestId('google-maps'));
    expect(GoogleDirections).toHaveAttribute(
      'title',
      en_messages['directions.show-google-maps-title']
    );
  });

  it('should use an accessible title for unknown polling stations', async () => {
    let enteredPostcode = 'SS30AA';
    mockResponse('postcode', enteredPostcode);
    typePostcode(enteredPostcode);
    act(() => {
      submitPostcode();
    });
    let stationNotFound = await waitForElement(() => getByTestId('station-not-found'));
    const accessibleTitle = `<h1 class="eiw-header">Where to vote</h1>`;
    expect(stationNotFound).toContainHTML(accessibleTitle);
  });
});
