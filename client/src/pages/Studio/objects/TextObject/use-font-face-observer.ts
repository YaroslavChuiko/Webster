import { useState, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

//https://github.com/iamskok/use-font-face-observer/tree/master

export type FontFace = {
  family: string;
  weight?:
    | `light`
    | `normal`
    | `bold`
    | `bolder`
    | `100`
    | `200`
    | `300`
    | `400`
    | `500`
    | `600`
    | `700`
    | `800`
    | `900`;
  style?: `normal` | `italic` | `oblique`;
  stretch?:
    | `normal`
    | `ultra-condensed`
    | `extra-condensed`
    | `condensed`
    | `semi-condensed`
    | `semi-expanded`
    | `expanded`
    | `extra-expanded`
    | `ultra-expanded`;
};

export type Options = {
  testString?: string;
  timeout?: number;
};

export type Config = {
  showErrors: boolean;
};

function useFontFaceObserver(
  fontFaces: FontFace[] = [],
  { testString, timeout }: Options = {},
  { showErrors }: Config = { showErrors: false },
): boolean {
  const [isResolved, setIsResolved] = useState(false);
  const fontFacesString = JSON.stringify(fontFaces);

  useEffect(() => {
    const promises = JSON.parse(fontFacesString).map(({ family, weight, style, stretch }: FontFace) =>
      new FontFaceObserver(family, {
        weight,
        style,
        stretch,
      }).load(testString, timeout),
    );

    Promise.all(promises)
      .then(() => setIsResolved(true))
      .catch(() => {
        if (showErrors) {
          console.error(`An error occurred during font loading`);
        }
      });
  }, [fontFacesString, testString, timeout, showErrors]);

  return isResolved;
}

export default useFontFaceObserver;
