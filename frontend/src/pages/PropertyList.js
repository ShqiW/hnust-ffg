import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
} from '@mui/material';
import axios from 'axios';

function PropertyList() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({
        is_on_campus: '',
        min_price: '',
        max_price: '',
        room_type: '',
        available_from: '',
    });

    useEffect(() => {
        fetchProperties();
    }, [filters]);

    const fetchProperties = async () => {
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });

            const response = await axios.get(`http://localhost:8000/api/properties/?${params}`);
            setProperties(response.data.results);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Filters */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>位置</InputLabel>
                            <Select
                                name="is_on_campus"
                                value={filters.is_on_campus}
                                onChange={handleFilterChange}
                                label="位置"
                            >
                                <MenuItem value="">全部</MenuItem>
                                <MenuItem value="true">校园内</MenuItem>
                                <MenuItem value="false">校园外</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="最低价格"
                            name="min_price"
                            type="number"
                            value={filters.min_price}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="最高价格"
                            name="max_price"
                            type="number"
                            value={filters.max_price}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>房型</InputLabel>
                            <Select
                                name="room_type"
                                value={filters.room_type}
                                onChange={handleFilterChange}
                                label="房型"
                            >
                                <MenuItem value="">全部</MenuItem>
                                <MenuItem value="单间">单间</MenuItem>
                                <MenuItem value="两居室">两居室</MenuItem>
                                <MenuItem value="三居室">三居室</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="可入住日期"
                            name="available_from"
                            type="date"
                            value={filters.available_from}
                            onChange={handleFilterChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => setFilters({
                                is_on_campus: '',
                                min_price: '',
                                max_price: '',
                                room_type: '',
                                available_from: '',
                            })}
                        >
                            重置筛选
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Property List */}
            <Grid container spacing={4}>
                {properties.map((property) => (
                    <Grid item key={property.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/properties/${property.id}`)}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={property.images[0]?.image || 'https://source.unsplash.com/random/800x600/?apartment'}
                                alt={property.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h3">
                                    {property.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {property.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    可入住日期：{new Date(property.available_from).toLocaleDateString()}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                    ¥{property.price}/月
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PropertyList; 