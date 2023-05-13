import { RGBColor } from 'react-color';

export const getRGBAString = (rbga: RGBColor) => {
  if (rbga.a) {
    return `rgba(${rbga.r}, ${rbga.g}, ${rbga.b}, ${rbga.a})`;
  }
  return `rgb(${rbga.r}, ${rbga.g}, ${rbga.b})`;
};
