import { InView } from 'react-intersection-observer';
import { GoogleFont } from '~/types/google-font-type';
import { loadGoogleFontsDefaultVariants } from '~/utils/load-google-fonts-default-variants';

type Props = {
  font: GoogleFont;
  onClick: () => void;
};

const FontFamilyMenuItem = ({ font, onClick }: Props) => {
  return (
    <InView
      as="option"
      rootMargin="50px"
      value={font.family}
      style={{ fontFamily: font.family }}
      triggerOnce={true}
      onClick={onClick}
      onChange={(inView) => {
        if (inView) {
          loadGoogleFontsDefaultVariants([font.family]);
        }
      }}
    >
      {font.family}
    </InView>
  );
};

export default FontFamilyMenuItem;
