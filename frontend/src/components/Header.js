import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box, Container } from '@mui/material';
import ContactDialog from './ContactDialog';
import API_URL from '../config';

function Header() {
    const location = useLocation();
    const [contactOpen, setContactOpen] = useState(false);

    return (
        <>
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid #E0E0E0',
            }}
        >
            <Container maxWidth="lg" disableGutters sx={{ px: 3 }}>
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: 'space-between',
                        minHeight: { xs: 56, md: 64 },
                    }}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                color: '#000',
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                fontWeight: 300,
                                letterSpacing: '0.2em',
                                transition: 'opacity 0.2s ease',
                                '&:hover': {
                                    opacity: 0.6,
                                },
                            }}
                        >
                            芳菲阁
                        </Box>
                    </Link>

                    {/* Navigation */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }}>
                        <NavLink to="/" active={location.pathname === '/'}>
                            主页
                        </NavLink>
                        <NavLink to="/properties" active={location.pathname.startsWith('/properties')}>
                            房源列表
                        </NavLink>
                        <Box
                            component="button"
                            onClick={() => setContactOpen(true)}
                            sx={{
                                background: 'none',
                                border: 'none',
                                color: '#666',
                                fontSize: '0.9375rem',
                                fontWeight: 400,
                                letterSpacing: '0.08em',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                transition: 'color 0.2s ease',
                                '&:hover': {
                                    color: '#000',
                                },
                            }}
                        >
                            联系我们
                        </Box>
                        <Box
                            component="a"
                            href={`${API_URL}/admin/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                color: '#666',
                                fontSize: '0.9375rem',
                                fontWeight: 400,
                                letterSpacing: '0.08em',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                                '&:hover': {
                                    color: '#000',
                                },
                            }}
                        >
                            管理后台
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
}

// 导航链接组件
function NavLink({ to, children, active }) {
    return (
        <Link
            to={to}
            style={{ textDecoration: 'none' }}
        >
            <Box
                component="span"
                sx={{
                    position: 'relative',
                    color: active ? '#000' : '#666',
                    fontSize: '0.9375rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                        color: '#000',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: '100%',
                        height: '1px',
                        backgroundColor: '#000',
                        transform: active ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'transform 0.25s ease',
                    },
                    '&:hover::after': {
                        transform: 'scaleX(1)',
                    },
                }}
            >
                {children}
            </Box>
        </Link>
    );
}

export default Header;
