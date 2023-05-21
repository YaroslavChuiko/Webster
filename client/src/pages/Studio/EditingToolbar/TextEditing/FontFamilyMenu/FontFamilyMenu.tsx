import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, Portal, useDisclosure } from '@chakra-ui/react';
import useGetFontListQuery from '~/hooks/use-get-font-list-query';
import useStageObject from '~/hooks/use-stage-object';
import { GoogleFont } from '~/types/google-font-type';
import FontFamilyMenuList from './FontFamilyMenuList';

type Props = {
  id: string;
  fontFamily: string;
};

const FontFamilyMenu = ({ id, fontFamily }: Props) => {
  const { updateOne } = useStageObject();
  const { fontList, isLoaded } = useGetFontListQuery();
  const { isOpen: isMenuOpen, onOpen: openMenu, onClose: closeMenu } = useDisclosure();

  const handleMenuItemClick = (font: GoogleFont) => {
    updateOne({
      id,
      data: {
        fontFamily: font.family,
        fontVariants: font.variants,
        webFont: true,
      },
    });
    closeMenu();
  };

  return (
    <Menu isOpen={isMenuOpen} onOpen={openMenu} onClose={closeMenu}>
      <MenuButton as={Button} fontFamily={fontFamily} variant="outline" rightIcon={<ChevronDownIcon />}>
        {fontFamily}
      </MenuButton>
      <Portal>
        <FontFamilyMenuList fontList={fontList} isLoaded={isLoaded} handleMenuItemClick={handleMenuItemClick} />
      </Portal>
    </Menu>
  );
};

export default FontFamilyMenu;
