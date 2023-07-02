import { Button, Container, Fade, Flex, SlideFade, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '~/components/Loader/Loader';
import useCustomToast from '~/hooks/use-custom-toast';
import { useVerifyEmailMutation } from '~/store/api/auth-slice';

function EmailConfirm() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const { toast } = useCustomToast();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  useEffect(() => {
    const confirmEmail = async (token: string | null) => {
      if (!token) {
        return;
      }
      try {
        await verifyEmail(token).unwrap();
        setIsSuccess(true);
      } catch (error: any) {
        toast('Error occurred', error?.data.message, 'error');
      }
    };

    confirmEmail(token);
  }, []);

  if (!token) {
    toast('Error occurred', 'No token in the link', 'error');

    return (
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Flex justifyContent="center">
          <SlideFade in={true}>
            <Flex
              p={4}
              borderWidth="1px"
              flexDirection="column"
              alignItems="center"
              borderRadius="md"
              backgroundColor="red.100"
            >
              <Text color="red.700" fontWeight="bold" mb={2}>
                Link is not valid.
              </Text>
              <Button onClick={() => navigate('/')} colorScheme="red">
                Go to Sign Up Page
              </Button>
            </Flex>
          </SlideFade>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Flex justifyContent="center">
        {isLoading && <Loader />}

        {!isLoading && isSuccess && (
          <Fade in={true}>
            <Flex
              p={4}
              borderWidth="1px"
              flexDirection="column"
              alignItems="center"
              borderRadius="md"
              backgroundColor="green.100"
            >
              <Text color="green.700" fontWeight="bold" mb={2}>
                Email confirmed successfully!
              </Text>
              <Button onClick={() => navigate('/auth/sign-in')} colorScheme="green">
                Go to Login Page
              </Button>
            </Flex>
          </Fade>
        )}

        {!isLoading && !isSuccess && (
          <SlideFade in={true}>
            <Flex
              p={4}
              borderWidth="1px"
              flexDirection="column"
              alignItems="center"
              borderRadius="md"
              backgroundColor="red.100"
            >
              <Text color="red.700" fontWeight="bold" mb={2}>
                Failed to confirm email. Token expired.
              </Text>
              <Button onClick={() => navigate('/auth/sign-up')} colorScheme="red">
                Go to Sign Up Page
              </Button>
            </Flex>
          </SlideFade>
        )}
      </Flex>
    </Container>
  );
}

export default EmailConfirm;
