import React from 'react';
import { VStack, Box, Heading, Text, HStack, Icon } from '@chakra-ui/react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <VStack spacing={6} p={6} width="100%" bg="#020c1b" minHeight="100vh" align="center">
      <Heading color="#64ffda" size="lg" textAlign="center" mb={4}>
        Contact Us
      </Heading>
      <Box
        bg="#112240"
        borderRadius="lg"
        p={6}
        boxShadow="xl"
        width={{ base: '90%', md: '60%', lg: '40%' }}
        textAlign="center"
      >
        <Text color="teal.300" fontSize="xl" fontWeight="bold" mb={4}>
          We'd love to hear from you!
        </Text>
        <HStack spacing={4} justify="center" mb={4}>
          <Icon as={FaPhone} w={6} h={6} color="teal.300" />
          <Text color="teal.300" fontSize="lg">
            9051420824
          </Text>
        </HStack>
        <HStack spacing={4} justify="center" mb={4}>
          <Icon as={FaEnvelope} w={6} h={6} color="teal.300" />
          <Text color="teal.300" fontSize="lg">
            adityabasak360@gmail.com
          </Text>
        </HStack>
        <Text color="teal.500" fontSize="md">
          Feel free to reach out to us via phone or email for any inquiries, feedback, or support. We are here to assist you!
        </Text>
      </Box>
    </VStack>
  );
};

export default Contact;
