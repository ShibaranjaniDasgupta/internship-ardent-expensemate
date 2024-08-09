// import { Box, VStack, Heading, HStack, Button, List, ListItem, Avatar, Text } from '@chakra-ui/react';
// import { NavLink } from 'react-router-dom'; // Assuming you are using React Router for NavLink

// const MainContent = () => (
//   <Box as="main" className="main-content" width="100%" minH="100vh" overflowY="auto">
//     <VStack align="start" bg="#020c1b" spacing={4} w="full" h="100%" p={4}>
//       <Heading size="lg" color="#64ffda" textAlign="center">
//         Flatmates
//       </Heading>
//       <HStack spacing={4}>
//         <Button colorScheme="teal">
//           <NavLink className="create-group" to="/create-group">
//             Start a new group
//           </NavLink>
//         </Button>
//       </HStack>
//       <HStack spacing={4} mt={4}>
//         <Button colorScheme="blue">Add member</Button>
//         <Button colorScheme="red">Add bill</Button>
//       </HStack>
//       <Box mt={8} w="full" bg="#0a192f" p={4} borderRadius="md">
//         <Heading size="md" color="#64ffda" textDecoration="underline">
//           Balances
//         </Heading>
//         <List spacing={4} mt={4} className="balance-list">
//           {[
//             { name: 'Aditya', balance: '$1500' },
//             { name: 'Shibaranjani', balance: '$1200' },
//             { name: 'Priyanshu', balance: '$800' },
//             { name: 'Indrajit', balance: '$2000' },
//           ].map((person, index) => (
//             <ListItem key={index} className="list-item" display="flex" alignItems="center">
//               <Avatar src={`/path/to/avatar/${index}.jpg`} />
//               <Text color="#64ffda" ml={4}>
//                 {person.name} <span style={{ marginLeft: 'auto', color: '#38a169' }}>{person.balance}</span>
//               </Text>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </VStack>
//   </Box>
// );

// export default MainContent;

/*Group Management*/

import { Box, VStack, Heading, HStack, Button, List, ListItem, Avatar, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const MainContent = () => (
  <Box as="main" className="main-content" width="100%" minH="100vh" overflowY="auto" display="flex" justifyContent="center">
    <VStack align="center" bg="#020c1b" spacing={4} w="full" h="100%" p={4}>
      <Heading size="lg" color="#64ffda" textAlign="center">
        Flatmates
      </Heading>
      <HStack spacing={4}>
      <Button as={NavLink} to="/create-group" colorScheme="teal" bg="#64ffda" color="#020c1b">
          Start a new group
        </Button>
      </HStack>
      <HStack spacing={4} mt={4}>
        <Button colorScheme="blue" bg="#64ffda" color="#020c1b" border-radius="5px">Add member</Button>
        <Button colorScheme="red" bg="#64ffda" color="#020c1b">Add bill</Button>
      </HStack>
      <Box mt={8} w="full" bg="#0a192f" p={4} borderRadius="md">
        <Heading size="md" color="#64ffda" textDecoration="underline">
          Balances
        </Heading>
        <List spacing={4} mt={4} className="balance-list">
          {[
            { name: 'Aditya', balance: '$1500' },
            { name: 'Shibaranjani', balance: '$1200' },
            { name: 'Priyanshu', balance: '$800' },
            { name: 'Indrajit', balance: '$2000' },
          ].map((person, index) => (
            <ListItem key={index} className="list-item" display="flex" alignItems="center">
              <Avatar src={`/path/to/avatar/${index}.jpg`} size="sm" />
              <Text color="#64ffda" ml={4}>
                {person.name} <span style={{ marginLeft: 'auto', color: '#38a169' }}>{person.balance}</span>
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  </Box>
);

export default MainContent;
