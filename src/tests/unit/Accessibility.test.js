import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import en_messages from '../../translations/en';
import { renderWithReactIntl } from '../utils/test';
import { Accessibility } from '../../Accessibility';

jest.mock(`!!raw-loader!./dc-widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

jest.mock(`!!raw-loader!./ec-widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('Accessibility component', () => {
  test('renders empty component with no props', () => {
    const { container } = renderWithReactIntl(<Accessibility messages={en_messages} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('shows list component with props', () => {
    const { queryByText } = renderWithReactIntl(
      <Accessibility
        nearby_parking={true}
        disabled_parking={true}
        hearing_loop={false}
        messages={en_messages}
      />
    );

    expect(screen.getByText('nearby parking')).toBeInTheDocument();
    expect(screen.getByText('disabled parking')).toBeInTheDocument();
    expect(queryByText('a hearing loop installed')).toBeNull();
    expect(queryByText('publicly accessible toilets')).toBeNull();
  });
});
