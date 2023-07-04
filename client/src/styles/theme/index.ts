import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
  semanticTokens: {
    colors: {
      primary: {
        default: 'pink.500',
      },
    },
  },
});

export default theme;
