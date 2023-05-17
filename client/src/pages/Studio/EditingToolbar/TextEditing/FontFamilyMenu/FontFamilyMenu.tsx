import { Button, Menu, MenuButton, MenuList, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useGetFontListQuery from '~/hooks/use-get-font-list-query';
import useStageObject from '~/hooks/use-stage-object';
import FontFamilyMenuItem from './FontFamilyMenuItem';

type Props = {
  id: string;
  fontFamily: string;
};

const FontFamilyMenu = ({ id, fontFamily }: Props) => {
  const { updateOne } = useStageObject();
  const { fontList, isLoaded } = useGetFontListQuery();
  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();

  return (
    <Menu closeOnSelect={true} isOpen={isMenuOpen} onOpen={openMenu} onClose={closeMenu}>
      <MenuButton as={Button} fontFamily={fontFamily} rightIcon={<ChevronDownIcon />}>
        {fontFamily}
      </MenuButton>
      <MenuList maxH="300px" overflowY="auto">
        {isLoaded
          ? fontList.map((font, index) => (
              <FontFamilyMenuItem
                key={index}
                font={font}
                onClick={() => {
                  updateOne({
                    id,
                    data: {
                      fontFamily: font.family,
                      fontVariants: font.variants,
                      webFont: true,
                    },
                  });
                  closeMenu();
                }}
              />
            ))
          : 'Loading...'}
      </MenuList>
    </Menu>
  );
};

export default FontFamilyMenu;
