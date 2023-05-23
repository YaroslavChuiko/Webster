import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { baseQuery } from '~/consts/api';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const response = await fetch(`${baseQuery}/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.status === 201) {
      const data = await response.json();
      toast({
        title: 'Account created.',
        description: 'Confirm your email: ' + data.email,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/auth/sign-in');
    } else if (response.status === 409) {
      toast({
        title: 'Conflict.',
        description: 'Account with this email is already created.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      const data = await response.json();
      toast({
        title: 'Error occured.',
        description: data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  return (
    <Stack spacing={10} mx={'auto'} w="100%" maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
          Sign up
        </Heading>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Stack spacing="6">
        {/*<Logo />*/}
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <HStack spacing="1" justify="center">
            <Text color="muted">Already have an account?</Text>
            <Link as={RouterLink} color={'pink.500'} to="/auth/sign-in">
              Sign In
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
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
            passwordConfirm: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Required'),
          })}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Stack spacing={3} mb="20px">
                <HStack>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl id="username" isRequired isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel>Username</FormLabel>
                        <Input {...field} type="text" />
                        <ErrorMessage name="username" />
                      </FormControl>
                    )}
                  </Field>
                </HStack>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl id="email" isRequired isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel>Email address</FormLabel>
                      <Input {...field} type="email" />
                      <ErrorMessage name="email" />
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input {...field} type={showPassword ? 'text' : 'password'} />
                        <InputRightElement h={'full'}>
                          <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <ErrorMessage name="password" />
                    </FormControl>
                  )}
                </Field>
                <Field name="passwordConfirm">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.passwordConfirm && form.touched.passwordConfirm}>
                      <FormLabel>Password Confirm</FormLabel>
                      <InputGroup>
                        <Input {...field} type={showPassword ? 'text' : 'password'} />
                        <InputRightElement h={'full'}>
                          <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <ErrorMessage name="passwordConfirm" />
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Stack spacing={10} pt={2}>
                <Button
                  isDisabled={!formik.isValid || formik.isSubmitting}
                  type="submit"
                  loadingText="Submitting"
                  colorScheme="pink"
                >
                  Sign up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  );
}
