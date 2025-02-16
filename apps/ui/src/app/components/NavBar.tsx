import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router';

import { FC } from 'react';

const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'My URLs',
    path: '/urls',
  },
];

export const NavBar: FC = () => {
  const location = useLocation();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Shortify
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Box
                key={page.path}
                sx={{
                  display: 'block',
                  margin: 1
                }}
              >
                <Link to={page.path} style={{ textDecoration: 'none' }}>
                  <Typography
                    sx={{
                      color: 'white',
                      textDecoration:
                        location.pathname === page.path ? 'underline' : 'none',
                      textUnderlinePosition: 'under',
                    }}
                  >
                    {page.title}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
