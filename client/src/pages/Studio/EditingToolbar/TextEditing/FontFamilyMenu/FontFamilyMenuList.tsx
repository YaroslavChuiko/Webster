import { MenuList } from '@chakra-ui/react';
import { GoogleFont } from '~/types/google-font-type';
import FontFamilyMenuItem from './FontFamilyMenuItem';
import { memo } from 'react';

type Props = {
  fontList: GoogleFont[];
  isLoaded: boolean;
  handleMenuItemClick: (font: GoogleFont) => void;
};

const FontFamilyMenuList = memo(function FontFamilyMenuList({ fontList, isLoaded, handleMenuItemClick }: Props) {
  return (
    <MenuList maxH="300px" overflowY="auto">
      {isLoaded
        ? fontList.map((font, index) => (
            <FontFamilyMenuItem key={index} font={font} onClick={() => handleMenuItemClick(font)} />
          ))
        : 'Loading...'}
    </MenuList>
  );
});

export default FontFamilyMenuList;
