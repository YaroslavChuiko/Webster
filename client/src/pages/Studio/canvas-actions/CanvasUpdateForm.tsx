import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '~/hooks/use-app-selector';
import useRequestHandler from '~/hooks/use-request-handler';
import { useUpdateCanvasMutation } from '~/store/api/canvas-slice';
import { ICanvasPayload } from '~/types/canvas';
import { ICreate, createSchema } from '~/validation/canvas';

const CanvasUpdateForm = () => {
  const { stage } = useAppSelector((state) => state.frame);
  const [update, { isLoading }] = useUpdateCanvasMutation();
  const toast = useToast();

  const stageValues = {
    id: stage.id as string,
    name: stage.name as string,
    content: JSON.stringify(stage.content),
    description: stage.description as string,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreate>({
    defaultValues: { ...stageValues },
    resolver: zodResolver(createSchema),
  });

  const { handler: updateHandler } = useRequestHandler<ICanvasPayload & { id: string }>({
    f: update,
  });

  const onSubmit = async (data: ICreate) => {
    await updateHandler({
      ...stageValues,
      ...data,
    });

    toast({
      title: 'Your canvas was successfully updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
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

export default CanvasUpdateForm;
