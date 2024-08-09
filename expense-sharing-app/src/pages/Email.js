import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import { Center } from '@chakra-ui/react';

const Email = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceID = 'service_r0vh7ci';
    const templateID = 'template_dqc2zpz';
    const userID = 'srz5AaPOKW9eAiUG6';
    
    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
      }, (err) => {
        console.error('FAILED...', err);
        alert('Failed to send message.');
      });
  };

  return (
 
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: '#16273d',
          width: '90%',
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: '#58f7f7', textAlign: 'center' }}
        >
          Contact Us
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            InputLabelProps={{ style: { fontSize: 18, color: '#58f7f7' } }}
            inputProps={{ style: { fontSize: 18, color: '#58f7f7' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#58f7f7',
                },
                '&:hover fieldset': {
                  borderColor: '#58f7f7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#58f7f7',
                },
              },
              '& .MuiInputBase-root': {
                color: '#58f7f7',
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            InputLabelProps={{ style: { fontSize: 18, color: '#58f7f7' } }}
            inputProps={{ style: { fontSize: 18, color: '#58f7f7' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#58f7f7',
                },
                '&:hover fieldset': {
                  borderColor: '#58f7f7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#58f7f7',
                },
              },
              '& .MuiInputBase-root': {
                color: '#58f7f7',
              },
            }}
          />
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={6}
            required
            InputLabelProps={{ style: { fontSize: 18, color: '#58f7f7' } }}
            inputProps={{ style: { fontSize: 18, color: '#58f7f7' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#58f7f7',
                },
                '&:hover fieldset': {
                  borderColor: '#58f7f7',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#58f7f7',
                },
              },
              '& .MuiInputBase-root': {
                color: '#58f7f7',
              },
            }}
          />
          <Box 
          textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              py: 2,
              fontSize: 18,
              width: '50%',
              alignSelf: 'center',
              backgroundColor: '#58f7f7',
              color: '#16273d',
              '&:hover': {
                backgroundColor: '#46c6c6',
              },
            }}
          >
            Send
          </Button>
          </Box>
          
        </Box>
      </Box>
  );
};

export default Email;
