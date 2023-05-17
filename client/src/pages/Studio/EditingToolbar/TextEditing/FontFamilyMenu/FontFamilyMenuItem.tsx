import { InView } from 'react-intersection-observer';
import { GoogleFont } from '~/types/google-font-type';
import { loadGoogleFontsDefaultVariants } from '~/utils/load-google-fonts-default-variants';
import { css } from '@emotion/react';
import { useToken } from '@chakra-ui/react';

type Props = {
  font: GoogleFont;
  onClick: () => void;
};

const FontFamilyMenuItem = ({ font, onClick }: Props) => {
  const [gray200] = useToken('colors', ['gray.200']);

  return (
    <InView
      as="option"
      rootMargin="50px"
      value={font.family}
      css={css`
        font-family: ${font.family};
        padding: 5px 10px;
        transition: all 0.1s linear;
        &:hover {
          cursor: pointer;
          background-color: ${gray200};
        }
      `}
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
