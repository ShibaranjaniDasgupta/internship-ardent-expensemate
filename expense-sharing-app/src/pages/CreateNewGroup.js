// import React, { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, HStack, Heading, useToast } from '@chakra-ui/react';
// import axios from 'axios';

// const CreateNewGroup = () => {
//   const [groupName, setGroupName] = useState('');
//   const [description, setDescription] = useState('');
//   const [members, setMembers] = useState([{ name: '', phone: '', amount: '' }]);
//   const user = JSON.parse(localStorage.getItem('expense-app'));
//   const toast = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/groups/create-group', {
//         userId: user._id,
//         groupName,
//         description,
//         members
//       });
//       console.log(response.data.message);
//       toast({
//         title: "Group Created",
//         description: "Your new group has been successfully created.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//       // Clear the form fields after successful creation
//       setGroupName('');
//       setDescription('');
//       setMembers([{ name: '', phone: '', amount: '' }]);
//     } catch (error) {
//       console.error('Error creating group', error);
//       toast({
//         title: "Error",
//         description: "There was an error creating the group.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "top",
//       });
//     }
//   };

//   const handleMemberChange = (index, field, value) => {
//     const newMembers = members.map((member, i) => {
//       if (i === index) {
//         return { ...member, [field]: value };
//       }
//       return member;
//     });
//     setMembers(newMembers);
//   };

//   const addMember = () => {
//     setMembers([...members, { name: '', phone: '', amount: '' }]);
//   };

//   return (
//     <Box
//       p={6}
//       bg="#0a192f"
//       color="#64ffda"
//       minH="60vh"
//       borderRadius="md"
//       boxShadow="xl"
//       maxWidth="600px"
//       width="100%"
//     >
//       <Heading as="h1" size="xl" mb={6} textAlign="center">
//         Create New Group
//       </Heading>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={6}>
//           <FormControl id="groupName" isRequired>
//             <FormLabel>Group Name</FormLabel>
//             <Input
//               type="text"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               placeholder='Enter group name'
//               color="#64ffda"
//               bg="#0a192f"
//               borderColor="#64ffda"
//             />
//           </FormControl>
//           <FormControl id="description">
//             <FormLabel>Description</FormLabel>
//             <Textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder='Enter group description'
//               color="#64ffda"
//               bg="#0a192f"
//               borderColor="#64ffda"
//             />
//           </FormControl>
//           <FormControl id="members" isRequired>
//             <FormLabel>Members</FormLabel>
//             {members.map((member, index) => (
//               <HStack key={index} spacing={4} width="100%">
//                 <Input
//                   placeholder="Enter member name"
//                   color="#64ffda"
//                   bg="#0a192f"
//                   borderColor="#64ffda"
//                   value={member.name}
//                   onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
//                 />
//                 <Input
//                   placeholder="Enter phone number"
//                   color="#64ffda"
//                   bg="#0a192f"
//                   borderColor="#64ffda"
//                   value={member.phone}
//                   onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
//                 />
//                 <Input
//                   placeholder="Enter amount"
//                   color="#64ffda"
//                   bg="#0a192f"
//                   borderColor="#64ffda"
//                   value={member.amount}
//                   onChange={(e) => handleMemberChange(index, 'amount', e.target.value)}
//                 />
//               </HStack>
//             ))}
//             <Button
//               bg="#64ffda"
//               color="#020c1b"
//               _hover={{ bg: "#64ffda", color: "#020c1b" }}
//               onClick={addMember}
//               mt={4}
//               width="full"
//             >
//               Add Member
//             </Button>
//           </FormControl>
//           <Button
//             type="submit"
//             bg="#64ffda"
//             color="#020c1b"
//             _hover={{ bg: "#64ffda", color: "#020c1b" }}
//             width="full"
//           >
//             Create Group
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default CreateNewGroup;

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  useToast,
  ChakraProvider,
} from "@chakra-ui/react";
import axios from "axios";

const CreateNewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([{ name: "", phone: "", amount: "" }]);
  const user = JSON.parse(localStorage.getItem("expense-app"));
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/groups/create-group", {
        userId: user._id,
        groupName,
        description,
        members,
      });
      console.log(response.data.message);
      toast({
        title: "Group Created",
        description: "Your new group has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // Clear the form fields after successful creation
      setGroupName("");
      setDescription("");
      setMembers([{ name: "", phone: "", amount: "" }]);
    } catch (error) {
      console.error("Error creating group", error);
      toast({
        title: "Error",
        description: "There was an error creating the group.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = members.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setMembers(newMembers);
  };

  const addMember = () => {
    setMembers([...members, { name: "", phone: "", amount: "" }]);
  };

  return (
    <ChakraProvider>
      <Box
        p={6}
        bg="#0a192f"
        color="#64ffda"
        minH="60vh"
        borderRadius="md"
        boxShadow="xl"
        maxWidth="600px"
        width="100%"
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Create New Group
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl id="groupName" isRequired>
              <FormLabel>Group Name</FormLabel>
              <Input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                color="#64ffda"
                bg="#0a192f"
                borderColor="#64ffda"
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter group description"
                color="#64ffda"
                bg="#0a192f"
                borderColor="#64ffda"
              />
            </FormControl>
            <FormControl id="members" isRequired>
              <FormLabel>Members</FormLabel>
              {members.map((member, index) => (
                <HStack key={index} spacing={4} width="100%">
                  <Input
                    placeholder="Enter member name"
                    color="#64ffda"
                    bg="#0a192f"
                    borderColor="#64ffda"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Enter phone number"
                    color="#64ffda"
                    bg="#0a192f"
                    borderColor="#64ffda"
                    value={member.phone}
                    onChange={(e) =>
                      handleMemberChange(index, "phone", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Enter amount"
                    color="#64ffda"
                    bg="#0a192f"
                    borderColor="#64ffda"
                    value={member.amount}
                    onChange={(e) =>
                      handleMemberChange(index, "amount", e.target.value)
                    }
                  />
                </HStack>
              ))}
              <Button
                bg="#64ffda"
                color="#020c1b"
                _hover={{ bg: "#64ffda", color: "#020c1b" }}
                onClick={addMember}
                mt={4}
                width="full"
              >
                Add Member
              </Button>
            </FormControl>
            <Button
              type="submit"
              bg="#64ffda"
              color="#020c1b"
              _hover={{ bg: "#64ffda", color: "#020c1b" }}
              width="full"
            >
              Create Group
            </Button>
          </VStack>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default CreateNewGroup;
