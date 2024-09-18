import { render } from '@testing-library/react';

import Pdp from './pdp';

describe('Pdp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pdp />);
    expect(baseElement).toBeTruthy();
  });
});
