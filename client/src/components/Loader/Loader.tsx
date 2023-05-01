import { Center, Spinner } from '@chakra-ui/react';

type Props = {
  isFullScreen?: boolean;
};

const Loader = ({ isFullScreen = false }: Props) => {
  if (!isFullScreen) {
    return <Spinner size="lg" speed=".6s" />;
  }

  return (
    <Center>
      <Spinner sx={{ w: 100, h: 100 }} speed=".6s" thickness="4px" />
    </Center>
  );
};

export default Loader;
