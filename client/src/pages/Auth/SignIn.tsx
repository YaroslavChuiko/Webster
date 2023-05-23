import { useState, FormEvent, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  HStack,
  Text,
  Checkbox,
  Container,
  useDisclosure,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

import { loginFail, loginSuccess } from '~/store/slices/auth-slice';
import { RootState } from '~/store/store';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { baseQuery } from '~/consts/api';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>('' as HTMLInputElement);

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = inputRef.current.value;
    const response = await fetch(`${baseQuery}/auth/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(loginSuccess(data.accessToken));
      navigate('/');
    } else {
      dispatch(loginFail(response.statusText));
    }
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing="8">
          <Stack spacing="6">
            {/*<Logo />*/}
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading>Log in to your account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Dont have an account?</Text>
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
                  <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="link"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                    <Input
                      id="password"
                      ref={inputRef}
                      name="password"
                      type={isOpen ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked colorScheme="pink">
                  Remember me
                </Checkbox>
                <Button variant="link" colorScheme="pink" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button type="submit" colorScheme="pink" isLoading={authState.loading}>
                  {authState.loading ? 'Signing in...' : 'Sign in'}
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
