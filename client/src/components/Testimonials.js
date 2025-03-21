import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
} from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'Amazing service! Found the perfect flight at the best price. The interface is so easy to use.',
    avatar: 'https://source.unsplash.com/random/100x100/?woman,portrait,1',
  },
  {
    id: 2,
    name: 'David Chen',
    location: 'Singapore',
    rating: 5,
    comment: 'Great deals on hotels and excellent customer support. Will definitely use again!',
    avatar: 'https://source.unsplash.com/random/100x100/?man,portrait,1',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'London, UK',
    rating: 4,
    comment: 'The travel planning features are fantastic. Saved me hours of research time.',
    avatar: 'https://source.unsplash.com/random/100x100/?woman,portrait,2',
  },
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={testimonial.avatar}
            alt={testimonial.name}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" gutterBottom>
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonial.location}
            </Typography>
          </Box>
        </Box>
        <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          "{testimonial.comment}"
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
);

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ mb: 6, textAlign: 'center', fontWeight: 'bold' }}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} md={4}>
              <TestimonialCard testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials; 