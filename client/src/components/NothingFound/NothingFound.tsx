import { Flex, Heading } from '@chakra-ui/react';

type Props = {
  message: string;
};

const NothingFound = ({ message }: Props) => {
  return (
    <Flex minH="200px" alignItems="center" justifyContent="center" flexDirection="column" color="gray.500">
      {/* <Icon as={icon} boxSize="30px" mb="10px" /> */}
      <Heading as="h4" fontWeight="medium" fontSize="16px" mb="5px">
        {message}
      </Heading>
    </Flex>
  );
};
export default NothingFound;
