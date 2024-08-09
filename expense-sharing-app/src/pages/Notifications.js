import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import './App.css'
const NotificationItem = ({ notification, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      p: 2,
      my: 1,
      backgroundColor: '#16273d',
      color: '#58f7f7',
      borderRadius: 2,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#1b324d',
      },
    }}
  >
    {notification}
  </Box>
);

const Notifications = () => {
  const [selectedNotification, setSelectedNotification] = useState('');
  const [notifications] = useState([
    'Notification 1',
    'Notification 2',
    'Notification 3',
  ]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Your Notifications
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 800,
          backgroundColor: '#16273d',
          p: 3,
          borderRadius: 3,
        }}
      >
        <Box sx={{ width: '45%' }}>
          <Typography variant="h5" gutterBottom>
            Notification Items
          </Typography>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              notification={notification}
              onClick={() => handleNotificationClick(notification)}
            />
          ))}
        </Box>
        <Box sx={{ width: '45%' }}>
          <Typography variant="h5" gutterBottom>
            Notification Details
          </Typography>
          <Box
            sx={{
              backgroundColor: '#16273d',
              color: '#58f7f7',
              p: 2,
              borderRadius: 2,
              minHeight: '200px',
            }}
          >
            {selectedNotification || 'Click on a notification to see details'}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Notifications;
