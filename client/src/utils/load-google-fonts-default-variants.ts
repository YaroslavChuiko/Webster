import { FONT_VARIANTS_TO_LOAD } from '~/consts/fonts';
import { loadGoogleFonts } from './load-google-fonts';

export const loadGoogleFontsDefaultVariants = async (fonts: string[]) => {
  const obj: Record<string, string[]> = {};
  fonts.forEach((fontFamily) => (obj[fontFamily] = FONT_VARIANTS_TO_LOAD));
  loadGoogleFonts(obj);
};
