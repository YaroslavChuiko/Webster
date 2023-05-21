import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, Container, Flex, Fade, SlideFade, useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Loader from '~/components/Loader/Loader';
import {baseQuery} from "~/consts/api";

function EmailConfirm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const toast = useToast();

  useEffect(() => {
    const simulateApiRequest = async () => {
      const response = await fetch(`${baseQuery}/auth/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
      } else {
        setIsLoading(false);
        setIsSuccess(false);
      }
    };
    if (token) {
      simulateApiRequest();
    }
  }, []);

  if (!token) {
    toast({
      title: 'Error occured.',
      description: 'No token in the link.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
    return (
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Flex height="100vh" justifyContent="center">
          <SlideFade in={true}>
            <Box p={4} borderWidth="1px" borderRadius="md" backgroundColor="red.100">
              <Text color="red.700" fontWeight="bold" mb={2}>
                Link is not valid.
              </Text>
              <Button onClick={() => navigate('/')} colorScheme="red">
                Go to Sign Up Page
              </Button>
            </Box>
          </SlideFade>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Flex height="100vh" justifyContent="center">
        {isLoading && <Loader />}

        {!isLoading && isSuccess && (
          <Fade in={true}>
            <Box p={4} borderWidth="1px" borderRadius="md" backgroundColor="green.100">
              <Text color="green.700" fontWeight="bold" mb={2}>
                Email confirmed successfully!
              </Text>
              <Button onClick={() => navigate('/auth/sign-in')} colorScheme="blue">
                Go to Login Page
              </Button>
            </Box>
          </Fade>
        )}

        {!isLoading && !isSuccess && (
          <SlideFade in={true}>
            <Box p={4} borderWidth="1px" borderRadius="md" backgroundColor="red.100">
              <Text color="red.700" fontWeight="bold" mb={2}>
                Failed to confirm email. Token expired.
              </Text>
              <Button onClick={() => navigate('/auth/sign-up')} colorScheme="red">
                Go to Sign Up Page
              </Button>
            </Box>
          </SlideFade>
        )}
      </Flex>
    </Container>
  );
}

export default EmailConfirm;
