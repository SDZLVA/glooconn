import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import { Flight, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Flight sx={{ mr: 1, color: 'primary.main' }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Glooconn
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/flights">
              Flights
            </Button>
            <Button color="inherit" component={Link} to="/hotels">
              Hotels
            </Button>
            <Button color="inherit" component={Link} to="/activities">
              Activities
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Person />}
              sx={{ ml: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 