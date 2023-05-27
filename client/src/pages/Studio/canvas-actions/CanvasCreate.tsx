import { Box, Button, useDisclosure } from '@chakra-ui/react';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import CanvasCreateForm from './CanvasCreateForm';

const CanvasCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box sx={{ w: '100%' }}>
      <Button variant="ghost" colorScheme="pink" onClick={onOpen} sx={{ w: '100%' }}>
        Create a stage
      </Button>
      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Create a Stage">
        <CanvasCreateForm />
      </DrawerWrapper>
    </Box>
  );
};

export default CanvasCreate;
