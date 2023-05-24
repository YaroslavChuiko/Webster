import { FormControl, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

export type TFilter = {
  query: string;
};

type Props = {
  onSubmit: (data: TFilter) => void;
  onReset: () => void;
  placeholder: string;
};

const SearchForm = ({ onSubmit, onReset, placeholder }: Props) => {
  const {
    register,
    reset,
    formState: { isSubmitted },
    handleSubmit,
  } = useForm<TFilter>({ defaultValues: { query: '' } });

  const resetHandler = () => {
    reset();
    onReset();
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <HStack>
          <InputGroup>
            <InputLeftElement>
              <Icon as={HiOutlineSearch} boxSize={5} />
            </InputLeftElement>
            <Input
              id="query"
              variant="filled"
              focusBorderColor="pink.500"
              placeholder={placeholder}
              {...register('query')}
            />
          </InputGroup>
          {isSubmitted && (
            <IconButton
              type="button"
              onClick={resetHandler}
              aria-label="search-btn"
              icon={<Icon as={HiOutlineX} boxSize={5} />}
            />
          )}
        </HStack>
      </FormControl>
    </form>
  );
};

export default SearchForm;
