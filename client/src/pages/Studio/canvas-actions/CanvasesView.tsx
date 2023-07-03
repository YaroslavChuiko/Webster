import {
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Box,
  VStack,
} from '@chakra-ui/react';
import Loader from '~/components/Loader/Loader';
import NothingFound from '~/components/NothingFound/NothingFound';
import { useGetCanvasesQuery } from '~/store/api/canvas-slice';
import CanvasViewItem from './CanvasViewItem';
import Pagination from '~/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { ICanvas } from '~/types/canvas';

const ITEMS_PER_PAGE = 5;

const CanvasesView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState(1);
  const [canvases, setCanvases] = useState<ICanvas[]>([]);
  const [total, setTotal] = useState(0);

  const { data, isLoading } = useGetCanvasesQuery({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (data) {
      setCanvases(data.canvases);
      setTotal(data.count);
    }
  }, [data]);

  return (
    <Box sx={{ w: '100%' }}>
      <Button variant="ghost" colorScheme="pink" onClick={onOpen} sx={{ w: '100%' }}>
        View all canvases
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent sx={{ p: 4 }}>
          <ModalHeader>All Created Canvases</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loader />
            ) : (
              <VStack spacing={4}>
                {canvases && canvases.length ? (
                  <>
                    {canvases.map((s) => (
                      <CanvasViewItem onClose={onClose} key={s.id} {...s} />
                    ))}
                    <Pagination
                      pagesCount={Math.ceil((total as number) / ITEMS_PER_PAGE)}
                      page={page}
                      setPage={setPage}
                    />
                  </>
                ) : (
                  <NothingFound message="You have no canvases. Please create one." />
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CanvasesView;
