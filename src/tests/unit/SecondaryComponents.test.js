import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { cleanup, render } from '@testing-library/react';

import WarningBanner from '../../WarningBanner';
afterEach(cleanup);

jest.mock(`!!raw-loader!./widget-styles.css`, () => '.DCWidget {margin: 0; }', {
  virtual: true,
});

describe('WarningBanner Component', () => {
  it('Should display a message if the app is serving mock data', async () => {
    const WarningBannerWrapper = render(<WarningBanner dataSource="mock" />);
    expect(WarningBannerWrapper.getByTestId('data-warning')).toHaveTextContent(
      'This application is serving mock data'
    );
  });
  it('Should not render in production', async () => {
    const WarningBannerWrapper = render(<WarningBanner dataSource="prod" />);
    expect(WarningBannerWrapper.queryByTestId('data-warning')).toBeNull();
  });
});

describe('WarningBanner Component Accessibility', () => {
  it('Should have a role of alert', async () => {
    const WarningBannerWrapper = render(<WarningBanner dataSource="mock" />);
    expect(WarningBannerWrapper.getByTestId('data-warning')).toHaveAttribute('role', 'alert');
  });
  it('Should use an accessible emoji', async () => {
    const WarningBannerWrapper = render(<WarningBanner dataSource="sandbox" />);
    expect(WarningBannerWrapper.queryByTestId('warning-emoji')).toHaveAttribute('role', 'img');
    expect(WarningBannerWrapper.queryByTestId('warning-emoji')).toHaveAttribute(
      'aria-label',
      'warning'
    );
  });
});
