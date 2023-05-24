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
      // hover: {
      //   default: 'blue.800',
      // },
      // tertiary: {
      //   default: 'purple.500',
      // },
      // text: {
      //   default: 'white',
      // },
    },
  },
  // components: {
  //   Button: {
  //     variants: {
  //       'navbar-transparent': {
  //         color: 'white',
  //         bg: 'transparent',
  //         _hover: {
  //           bg: 'pink.400',
  //         },
  //       },
  //     },
  //   },
  // },
});

export default theme;
