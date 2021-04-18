import React from 'react';
import { render } from '@testing-library/react-native';
import CircularSlider from './../CircularSlider';

test('CircularSlider Component', () => {
  const component = render(<CircularSlider />);
  expect(component).toBeTruthy();
});
