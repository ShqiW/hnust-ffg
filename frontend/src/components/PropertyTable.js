import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';

const PropertyTable = ({ campus, properties }) => {
    const navigate = useNavigate();

    const handleRowClick = (propertyId) => {
        navigate(`/properties/${propertyId}`);
    };

    return (
        <Box sx={{ mb: 6 }}>
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: 500,
                    borderBottom: '2px solid #000',
                    paddingBottom: 1,
                    letterSpacing: '0.05em'
                }}
            >
                {campus}
            </Typography>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: 'none',
                    border: '1px solid #E0E0E0',
                    borderRadius: 0,
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#000' }}>
                            <TableCell sx={{
                                color: '#FFF',
                                fontWeight: 600,
                                borderRight: '1px solid #333',
                            }}>
                                房源名称
                            </TableCell>
                            <TableCell sx={{
                                color: '#FFF',
                                fontWeight: 600,
                                borderRight: '1px solid #333',
                            }}>
                                房型
                            </TableCell>
                            <TableCell sx={{
                                color: '#FFF',
                                fontWeight: 600,
                                borderRight: '1px solid #333',
                            }}>
                                面积
                            </TableCell>
                            <TableCell sx={{
                                color: '#FFF',
                                fontWeight: 600,
                                borderRight: '1px solid #333',
                            }}>
                                楼层
                            </TableCell>
                            <TableCell sx={{
                                color: '#FFF',
                                fontWeight: 600,
                                borderRight: '1px solid #333',
                            }}>
                                租金
                            </TableCell>
                            <TableCell sx={{
                                color: '#FFF',
                                fontWeight: 600,
                            }}>
                                状态
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties && properties.length > 0 ? (
                            properties.map((property, index) => (
                                <TableRow
                                    key={property.id}
                                    onClick={() => handleRowClick(property.id)}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: index % 2 === 0 ? '#FFF' : '#FAFAFA',
                                        '&:hover': {
                                            backgroundColor: '#F5F5F5',
                                        },
                                        transition: 'background-color 0.2s ease',
                                    }}
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            fontWeight: 500,
                                            borderRight: '1px solid #E0E0E0',
                                        }}
                                    >
                                        {property.title}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>
                                        {property.room_type_display || property.room_type || '单间'}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>
                                        {property.area || '约25'}㎡
                                    </TableCell>
                                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>
                                        {property.floor || '3'}楼
                                    </TableCell>
                                    <TableCell sx={{
                                        borderRight: '1px solid #E0E0E0',
                                        fontWeight: 600,
                                    }}>
                                        {property.price_display || `¥${property.price}/月`}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                border: property.is_available ? '1px solid #000' : '1px solid #999',
                                                backgroundColor: property.is_available ? '#FFF' : '#F5F5F5',
                                                color: property.is_available ? '#000' : '#999',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {property.is_available ? '可租' : '已租'}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#999' }}>
                                    暂无房源信息
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PropertyTable;
