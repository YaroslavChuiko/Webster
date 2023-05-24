import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `"Inter Variable", sans-serif`,
    body: `"Inter Variable", sans-serif`,
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
