import { Button, Menu, MenuButton, MenuList, useDisclosure } from '@chakra-ui/react';
// import { useInView } from 'react-intersection-observer';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { InView } from 'react-intersection-observer';
import useGetFontListQuery from '~/hooks/use-get-font-list-query';

const FontFamilySelect = () => {
  const { fontList, isLoaded } = useGetFontListQuery();
  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();

  return (
    <Menu closeOnSelect={true} isOpen={isMenuOpen} onOpen={openMenu} onClose={closeMenu}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList maxH="300px" overflowY="auto">
        {/* <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem> */}
        {isLoaded
          ? fontList.map((font: any, index) => (
              <InView
                key={index}
                as="option"
                rootMargin="50px"
                value={font.family}
                onChange={(inView) => {
                  // const option = entry.target as HTMLOptionElement;
                  if (inView) console.log('In view:', font.family);
                }}
              >
                {font.family}
              </InView>
            ))
          : 'Loading...'}
      </MenuList>
    </Menu>
  );
};

export default FontFamilySelect;
