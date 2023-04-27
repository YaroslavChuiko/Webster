import {
  Box,
  Flex,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue,
  ChakraProvider,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { extendTheme } from '@chakra-ui/react';
import { ChevronLeftIcon, SettingsIcon, SmallAddIcon, ExternalLinkIcon, DownloadIcon } from '@chakra-ui/icons';
function Navbar() {
  const customTheme = extendTheme({
    components: {
      Button: {
        variants: {
          'navbar-transparent': {
            color: 'white',
            bg: 'transparent',
            _hover: {
              bg: useColorModeValue('teal.300', 'teal.400'),
            },
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        bgGradient="linear(to-r, teal.300, blue.300, blue.400, blue.500, blue.500, purple.600, purple.600, purple.600)"
        pt="2"
        pb="2"
        align="center"
      >
        <Box>
          <Button colorScheme="blue" mr="4" ml="1" as={Link as never} to="/home" variant="navbar-transparent">
            <ChevronLeftIcon w={8} h={8} />
            <Text ml="2">Home</Text>
          </Button>
          <Menu>
            <MenuButton as={Button} colorScheme="blue" mr="4" ml="1" variant="navbar-transparent">
              File
            </MenuButton>
            <MenuList mt="01">
              <Text ml="2" p="2">
                Some dynamic text about the page
              </Text>
              <Text ml="1" pt="0" pb="2" pl="2" opacity="0.5">
                Current user data
              </Text>
              <MenuItem>
                <SmallAddIcon mr={2} />
                Create new design
              </MenuItem>
              <MenuItem>
                <ExternalLinkIcon mr={2} />
                Import
              </MenuItem>
              <MenuItem>
                <DownloadIcon mr={2} />
                Download
              </MenuItem>
              <Divider mt={2} mb={2} />
              <MenuItem>
                <SettingsIcon mr={2} />
                Some settings
              </MenuItem>
              <Divider mt={2} mb={2} />
              <MenuItem>Some other options</MenuItem>
              <MenuItem>Something else</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />
        <Box>
          <Button colorScheme="blue" mr="4">
            Login
          </Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Navbar;
