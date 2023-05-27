import { Box, Button, useDisclosure } from '@chakra-ui/react';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import CanvasUpdateForm from './CanvasUpdateForm';

const CanvasUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box sx={{ w: '100%' }}>
      <Button variant="ghost" colorScheme="pink" onClick={onOpen} sx={{ w: '100%' }}>
        Update this stage
      </Button>
      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Update this Stage">
        <CanvasUpdateForm />
      </DrawerWrapper>
    </Box>
  );
};

export default CanvasUpdate;
