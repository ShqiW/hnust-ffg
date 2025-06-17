import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import {
    LocationOn,
    AttachMoney,
    CalendarToday,
    Home,
    CheckCircle,
    Phone,
    Email,
} from '@mui/icons-material';
import axios from 'axios';

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/properties/${id}/`);
            setProperty(response.data);
        } catch (error) {
            console.error('Error fetching property:', error);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8000/api/properties/${id}/contact/`, contactForm);
            setOpenDialog(false);
            setContactForm({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
        }
    };

    if (!property) {
        return (
            <Container>
                <Typography>加载中...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* Property Images */}
                <Grid item xs={12}>
                    <Box
                        sx={{
                            position: 'relative',
                            height: 400,
                            overflow: 'hidden',
                            borderRadius: 2,
                        }}
                    >
                        <img
                            src={property.images[0]?.image || 'https://source.unsplash.com/random/1200x800/?apartment'}
                            alt={property.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>

                {/* Property Info */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            {property.title}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOn />
                                </ListItemIcon>
                                <ListItemText
                                    primary="位置"
                                    secondary={property.location}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AttachMoney />
                                </ListItemIcon>
                                <ListItemText
                                    primary="价格"
                                    secondary={`¥${property.price}/月`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CalendarToday />
                                </ListItemIcon>
                                <ListItemText
                                    primary="可入住日期"
                                    secondary={new Date(property.available_from).toLocaleDateString()}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Home />
                                </ListItemIcon>
                                <ListItemText
                                    primary="房型"
                                    secondary={property.room_type}
                                />
                            </ListItem>
                        </List>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                            房源描述
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {property.description}
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                            设施
                        </Typography>
                        <Grid container spacing={2}>
                            {property.facilities.map((facility) => (
                                <Grid item key={facility.id}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            bgcolor: 'grey.100',
                                            p: 1,
                                            borderRadius: 1,
                                        }}
                                    >
                                        <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                                        <Typography variant="body2">{facility.name}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            联系房东
                        </Typography>
                        <List>
                            {property.contacts.map((contact) => (
                                <React.Fragment key={contact.id}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Phone />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="电话"
                                            secondary={contact.phone}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="邮箱"
                                            secondary={contact.email}
                                        />
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => setOpenDialog(true)}
                            sx={{ mt: 2 }}
                        >
                            发送消息
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Contact Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>联系房东</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleContactSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="姓名"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="邮箱"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="电话"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="留言"
                            multiline
                            rows={4}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            margin="normal"
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>取消</Button>
                    <Button onClick={handleContactSubmit} variant="contained">
                        发送
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default PropertyDetail; 