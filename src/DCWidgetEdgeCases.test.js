import { cleanup, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';

import { renderEnglishWidget, typePostcode, submitPostcode, mockResponse } from './test-utils/test';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WhereDoIVote Widget', () => {
  beforeEach(async () => {
    renderEnglishWidget();
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
});
