import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import useCustomToast from '~/hooks/use-custom-toast';
import { useLoginMutation } from '~/store/api/auth-slice';
import Logo from './Logo';

type FormValues = {
  email: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { toast } = useCustomToast();

  const [login, { isLoading }] = useLoginMutation();

  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values).unwrap();
      navigate('/');
    } catch (error: any) {
      toast('Error occurred', error?.data.message, 'error');
    }
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading fontSize="25px">Log in to your account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don&apos;t have an account?</Text>
                <Link as={RouterLink} color={'pink.500'} to="/auth/sign-up">
                  Sign Up
                </Link>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'white' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
            w={{ base: '100%', sm: '450px' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" focusBorderColor="pink.500" {...register('email')} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        tabIndex={-1}
                        variant="link"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onToggle}
                      />
                    </InputRightElement>
                    <Input
                      id="password"
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="current-password"
                      focusBorderColor="pink.500"
                      required
                      {...register('password')}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button type="submit" colorScheme="pink" isLoading={isLoading}>
                  {'Sign in'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}

export default SignIn;
