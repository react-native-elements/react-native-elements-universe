import React from 'react';
import { render } from '@testing-library/react-native';
import Example from '../../../dist/Example';

test('Example Component', () => {
  const component = render(<Example />);
  expect(component).toBeTruthy();
});
