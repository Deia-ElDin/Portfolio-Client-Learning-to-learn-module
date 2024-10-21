import { fireEvent } from '@testing-library/react';

export const testOpacitySlider = (form, slider, sliderValue) => {
  expect(slider).toHaveAttribute('value', '70');
  expect(form).toHaveStyle('background-color: rgba(0, 0, 0, 0.7)');

  fireEvent.change(slider, { target: { value: sliderValue } });
  expect(slider).toHaveAttribute('value', `${sliderValue}`);
  expect(form).toHaveStyle(
    `background-color: rgba(0, 0, 0, ${sliderValue / 100})`
  );
};
