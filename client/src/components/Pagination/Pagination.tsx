import { useState, useEffect } from 'react';
import { Flex, Circle } from '@chakra-ui/react';

type IProps = {
  pagesCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ pagesCount, page, setPage }: IProps) => {
  const [pagesArr, setPagesArr] = useState(getPagesArr());

  useEffect(() => {
    setPagesArr(getPagesArr());
  }, [pagesCount, page]);

  return (
    <Flex justify="flex-end" align="center" fontSize="14px">
      {pagesArr.map((index) => {
        if (index > 0) {
          return (
            <Circle
              key={index}
              size="26px"
              marginLeft="7px"
              cursor="pointer"
              transition="background-color, color, 0.2s linear"
              _hover={{
                bg: 'hover',
                color: 'text',
              }}
              bg={index == page ? 'pink.500' : 'gray.400'}
              color="white"
              fontWeight="600"
              onClick={() => {
                setPage(index);
              }}
            >
              {index}
            </Circle>
          );
        } else {
          return (
            <Flex key={index} align="flex-end" h="20px">
              <Circle bg="pink.500" size="3px" marginLeft="7px" />
              <Circle bg="pink.500" size="3px" marginLeft="7px" />
              <Circle bg="pink.500" size="3px" marginLeft="7px" />
            </Flex>
          );
        }
      })}
    </Flex>
  );

  function getPagesArr() {
    let tempPagesArr = [];

    if (pagesCount <= 3) {
      for (let i = 1; i <= pagesCount; i++) {
        tempPagesArr.push(i);
      }
    } else if (page - 2 <= 0) {
      tempPagesArr = [1, 2, 3, -1, pagesCount];
    } else if (page + 2 > pagesCount) {
      tempPagesArr = [1, -1, pagesCount - 2, pagesCount - 1, pagesCount];
    } else {
      tempPagesArr = [1, -1, page - 1, page, page + 1, -2, pagesCount];
    }

    return tempPagesArr;
  }
};

export default Pagination;
