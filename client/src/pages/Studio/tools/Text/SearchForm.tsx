import { CloseIcon } from '@chakra-ui/icons';
import { FormControl, HStack, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

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
            <Input id="query" placeholder={placeholder} {...register('query')} />
          </InputGroup>
          {isSubmitted && (
            <IconButton type="button" onClick={resetHandler} aria-label="search-btn" icon={<CloseIcon />} />
          )}
        </HStack>
      </FormControl>
    </form>
  );
};

export default SearchForm;
