import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useCreateCanvasMutation } from '~/store/api/canvas-slice';
import { setStage } from '~/store/slices/frame-slice';
import { ICreate, createSchema } from '~/validation/canvas';

type Props = {
  content?: string;
};

const CanvasCreateForm = ({ content }: Props) => {
  const dispatch = useDispatch();
  const [create, { isLoading }] = useCreateCanvasMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  const onSubmit = async (data: ICreate) => {
    create({ ...data, content: content || '[]' })
      .unwrap()
      .then(({ id, name }) => {
        dispatch(setStage({ id, name }));
      })
      .catch((err) => console.error(err));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4">
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="name" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" placeholder="description" {...register('description')} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="200px" colorScheme="pink" isLoading={isLoading}>
          Save
        </Button>
      </VStack>
    </form>
  );
};

export default CanvasCreateForm;
