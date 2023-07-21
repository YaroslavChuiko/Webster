import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useCustomToast from '~/hooks/use-custom-toast';
import { useRegisterMutation } from '~/store/api/auth-slice';
import { registerSchema } from '~/validation/auth';
import Logo from './Logo';

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useCustomToast();

  const [registerMutation] = useRegisterMutation();

  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm: _, ...rest } = values;
    try {
      await registerMutation(rest).unwrap();
      navigate('/auth/sign-in');
      toast('Account created', `Confirm your email: ${rest.email}`, 'success');
    } catch (error: any) {
      if (error.status === 409) {
        toast('Error occurred', 'Account with this email is already created', 'error');
      } else {
        toast('Error occurred', error?.data.message, 'error');
      }
    }
  };

  const togglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Stack spacing={5} mx={'auto'} w="100%" maxW={'lg'} py={12} px={6}>
      <Logo />
      <Stack align={'center'}>
        <Heading fontSize="25px" textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Stack spacing="6">
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <HStack spacing="1" justify="center">
            <Text color="muted">Already have an account?</Text>
            <Link as={RouterLink} color={'pink.500'} to="/auth/sign-in">
              Sign In
            </Link>
          </HStack>
        </Stack>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)} onChange={() => trigger()}>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'white' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          w={{ base: '100%', sm: '450px' }}
        >
          <Stack spacing={3} mb="20px">
            <FormControl id="username" isRequired isInvalid={errors.username && touchedFields.username}>
              <FormLabel>Username</FormLabel>
              <Input type="text" focusBorderColor="pink.500" {...register('username')} />
              <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" isRequired isInvalid={errors.email && touchedFields.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" focusBorderColor="pink.500" {...register('email')} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password && touchedFields.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  focusBorderColor="pink.500"
                  {...register('password')}
                />
                <InputRightElement h={'full'}>
                  <IconButton
                    tabIndex={-1}
                    variant="link"
                    aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                    icon={showPassword ? <HiEyeOff /> : <HiEye />}
                    onClick={togglePassword}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.passwordConfirm && touchedFields.passwordConfirm}>
              <FormLabel>Password Confirm</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  focusBorderColor="pink.500"
                  {...register('passwordConfirm')}
                />
                <InputRightElement h={'full'}>
                  <IconButton
                    tabIndex={-1}
                    variant="link"
                    aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                    icon={showPassword ? <HiEyeOff /> : <HiEye />}
                    onClick={togglePassword}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.passwordConfirm && errors.passwordConfirm.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing={10} pt={2}>
            <Button isDisabled={!isValid || isSubmitting} type="submit" loadingText="Submitting" colorScheme="pink">
              Sign up
            </Button>
          </Stack>
        </Box>
      </form>
    </Stack>
  );
}
