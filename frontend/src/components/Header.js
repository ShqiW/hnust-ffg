import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

function Header() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: '#FFF',
                borderBottom: '1px solid #E0E0E0',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Typography
                        component={Link}
                        to="/"
                        sx={{
                            color: '#000',
                            fontSize: '1.5rem',
                            fontWeight: 300,
                            letterSpacing: '0.15em',
                            textDecoration: 'none',
                            '&:hover': {
                                color: '#333',
                            },
                            transition: 'color 0.2s ease',
                        }}
                    >
                        芳菲阁
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Typography
                            component={Link}
                            to="/properties"
                            sx={{
                                color: '#000',
                                fontSize: '1rem',
                                fontWeight: 400,
                                letterSpacing: '0.05em',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#666',
                                },
                                transition: 'color 0.2s ease',
                            }}
                        >
                            房源列表
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header; 