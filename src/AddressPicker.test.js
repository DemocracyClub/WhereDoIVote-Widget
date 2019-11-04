import React from 'react';
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from './translations/en';
import DemocracyClubWidget from './DemocracyClubWidget';

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WhereDoIVote Widget', () => {
  let container, getByTestId;

  beforeEach(async () => {
    const wrapper = render(<DemocracyClubWidget />);
    container = wrapper.container;
    getByTestId = wrapper.getByTestId;
  });

  // function typePostcode(postcode) {
  //   act(() => {
  //     fireEvent.change(container.querySelector('#postcode'), {
  //       target: { value: postcode },
  //     });
  //   });
  // }

  function submitPostcode() {
    act(() => {
      fireEvent.submit(getByTestId('postcode-selector'));
    });
  }

  it('should give error message when no postcode is entered', async () => {
    submitPostcode();
    const newContent = await waitForElement(() => container.querySelector('#dc_error'));

    expect(newContent).toHaveTextContent(en_messages['postcode.errors.invalid-postcode']);
  });
});

// it('renders addresses from list', () => {

//   const wrapper = shallow(<AddressPicker addressList={addresses} />);

//   expect(wrapper).toContainReact(<option value="foo.com">foo</option>);
//   expect(wrapper).toContainReact(<option value="bar.com">bar</option>);
// });

// it('renders "My address is not in the list" option', () => {
//   let addresses = [{ address: 'foo', url: 'foo.com' }];

//   const wrapper = shallow(<AddressPicker addressList={addresses} />);

//   expect(wrapper).toContainReact(
//     <option value="not-in-list">My address is not in the list</option>
//   );
// });
// });
