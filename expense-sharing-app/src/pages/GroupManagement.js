import { VStack, HStack, Heading, Button, Grid, GridItem, Avatar, Text, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editGroupName, setEditGroupName] = useState('');
  const [editGroupDesc, setEditGroupDesc] = useState('');
  const [editMembers, setEditMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const user = JSON.parse(localStorage.getItem('expense-app'));

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`/api/groups/get-groups/${user._id}`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleEditGroup = (groupId) => {
    const groupToEdit = groups.find(group => group._id === groupId);
    if (groupToEdit) {
      setSelectedGroup(groupToEdit);
      setEditGroupName(groupToEdit.groupName);
      setEditGroupDesc(groupToEdit.description);
      setEditMembers(groupToEdit.members);
      setIsEditing(true);
      setIsViewing(false); // Ensure viewing is closed
    } else {
      console.error('Group not found for editing');
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`/api/groups/delete-group/${groupId}`);
      fetchGroups(); // Refresh the groups list
    } catch (error) {
      console.error('Error deleting group', error);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = editMembers.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setEditMembers(newMembers);
  };

  const handleSaveChanges = async () => {
    if (!selectedGroup) {
      console.error('No group selected for editing');
      return;
    }

    try {
      console.log('Sending PUT request to update group');
      const response = await axios.put(`/api/groups/update-group/${selectedGroup._id}`, {
        groupName: editGroupName,
        description: editGroupDesc,
        members: editMembers
      });
      console.log('Response received:', response.data.message);
      fetchGroups();
      setIsEditing(false);
      setSelectedGroup(null);
    } catch (error) {
      console.error('Error updating group', error);
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setSelectedGroup(null);
  };

  const handleViewGroup = (groupId) => {
    const group = groups.find(group => group._id === groupId);
    if (group) {
      setSelectedGroup(group);
      setIsViewing(true); // Set viewing state to true
    } else {
      console.error('Group not found for viewing');
    }
  };

  const handleCloseDetails = () => {
    setSelectedGroup(null);
    setIsViewing(false); // Close viewing state
  };

  return (
    <VStack spacing={6} p={6} width="100%" bg="#020c1b" minHeight="100vh" align="center">
      <Heading color="#64ffda" size="lg" textAlign="center" mb={4}>
        Your Groups
      </Heading>
      <Center w="100%">
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6} w="100%">
          {groups.map((group) => (
            <GridItem
              key={group._id}
              bg="#112240"
              borderRadius="lg"
              p={6}
              boxShadow="xl"
              textAlign="center"
              position="relative"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Center mb={4}>
                <Avatar name={group.groupName} size="xl" />
              </Center>
              <Text color="teal.300" fontSize="xl" fontWeight="bold">{group.groupName}</Text>
              <HStack spacing={4} mt={4} justifyContent="center">
                <Button
                  colorScheme="teal"
                  bg="#64ffda"
                  color="#020c1b"
                  onClick={() => handleViewGroup(group._id)}
                  _hover={{ bg: "#52c7c7" }}
                >
                  View Group
                </Button>
                <Button
                  size="sm"
                  colorScheme="teal"
                  bg="#64ffda"
                  color="#020c1b"
                  onClick={() => handleEditGroup(group._id)}
                  _hover={{ bg: "#52c7c7" }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  bg="#ff6347"
                  color="#020c1b"
                  onClick={() => handleDeleteGroup(group._id)}
                  _hover={{ bg: "#ff4500" }}
                >
                  Delete
                </Button>
              </HStack>
            </GridItem>
          ))}
        </Grid>
      </Center>
      <Modal isOpen={isEditing} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent bg="#112240" color="#64ffda" maxW="80%" borderRadius="md">
          <ModalHeader>Edit Group</ModalHeader>
          <ModalBody px={6}>
            <FormControl>
              <FormLabel>Group Name</FormLabel>
              <Input
                type="text"
                value={editGroupName}
                onChange={(e) => setEditGroupName(e.target.value)}
                placeholder="Enter group name"
              />
              <FormHelperText color="teal.500">Enter the new name for the group</FormHelperText>
              <FormLabel mt={4}>Description</FormLabel>
              <Input
                type="text"
                value={editGroupDesc}
                onChange={(e) => setEditGroupDesc(e.target.value)}
                placeholder="Enter group description"
              />
              <FormHelperText color="teal.500">Enter the new description for the group</FormHelperText>
              <FormLabel mt={4}>Members</FormLabel>
              {editMembers.map((member, index) => (
                <HStack key={index} spacing={4} width="100%" mt={2}>
                  <Input
                    placeholder="Enter member name"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Enter phone number"
                    value={member.phone}
                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                  />
                  <Input
                    placeholder="Enter amount"
                    value={member.amount}
                    onChange={(e) => handleMemberChange(index, 'amount', e.target.value)}
                  />
                </HStack>
              ))}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSaveChanges} bg="#64ffda" color="#020c1b">
              Save Changes
            </Button>
            <Button color="#64ffda" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isViewing && selectedGroup && (
        <GridItem
          mt={8}
          p={6}
          bg="#112240"
          borderRadius="lg"
          boxShadow="xl"
          textAlign="center"
          color="#64ffda"
          width="80%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="10"
        >
          <Heading size="md">{selectedGroup.groupName} Details</Heading>
          <Avatar
            name={selectedGroup.groupName}
            size="xl"
            mt={4}
          />
          <Text mt={4} fontSize="lg">{selectedGroup.description}</Text>
          <Text mt={4} fontWeight="bold" color="teal.300">
            Members:
          </Text>
          <VStack mt={2} spacing={1} align="start">
            {selectedGroup.members.map((member, index) => (
              <Text key={index} color="teal.300">
                {member.name} - {member.phone} - ${member.amount}
              </Text>
            ))}
          </VStack>
          <Button mt={4} colorScheme="teal" onClick={handleCloseDetails} bg="#64ffda" color="#020c1b" _hover={{ bg: "#52c7c7" }}>
            Close Details
          </Button>
        </GridItem>
      )}
    </VStack>
  );
};

export default GroupManagement;
