import { VStack, HStack, Heading, Box, Text, Stat, StatLabel, StatNumber, Grid, GridItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    totalIndividualTransactions: 0,
    totalGroupTransactions: 0,
    userTransactions: [],
  });

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <VStack spacing={6} p={6} width="100%" bg="#020c1b" minHeight="100vh" align="center">
      <Heading color="#64ffda" size="2xl" textAlign="center" mb={4}>
        Admin Panel
      </Heading>
      <HStack spacing={8} width="100%" justifyContent="center">
        <StatBox title="Registered Users" count={userStats.totalUsers} />
        <StatBox title="Individual Transactions" count={userStats.totalIndividualTransactions} />
        <StatBox title="Group Transactions" count={userStats.totalGroupTransactions} />
      </HStack>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} w="100%">
        {userStats.userTransactions.map((user, index) => (
          <GridItem key={index} bg="#112240" borderRadius="lg" p={6} boxShadow="xl" textAlign="center">
            <Text color="teal.300" fontSize="xl" fontWeight="bold">{user.name}</Text>
            <Text color="teal.300" mt={2}>Individual Transactions: {user.individualTransactions}</Text>
            <Text color="teal.300" mt={2}>Group Transactions: {user.groupTransactions}</Text>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

const StatBox = ({ title, count }) => (
  <Box bg="#112240" borderRadius="lg" p={6} boxShadow="xl" textAlign="center">
    <Stat>
      <StatLabel color="teal.300" fontSize="xl" fontWeight="bold">{title}</StatLabel>
      <StatNumber color="#64ffda" fontSize="2xl">{count}</StatNumber>
    </Stat>
  </Box>
);

export default AdminPanel;
