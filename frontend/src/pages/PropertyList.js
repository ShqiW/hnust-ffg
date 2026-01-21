import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';
import PropertyTable from '../components/PropertyTable';

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);

    // 按校区分组
    const campusGroups = {
        '南校区': [],
        '北校区': [],
        '南堕街': [],
    };

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/properties/`);
            setProperties(response.data.results || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
            // 如果后端不可用，使用模拟数据
            setProperties(getMockData());
        } finally {
            setLoading(false);
        }
    };

    // 模拟数据
    const getMockData = () => {
        return [
            {
                id: 1,
                title: '南图旁教工宿舍',
                campus: '南校区',
                room_type: '单间',
                area: 25,
                floor: 3,
                price: 1200,
                is_available: true,
            },
            {
                id: 2,
                title: '瑞幸咖啡路口精装房',
                campus: '南校区',
                room_type: '单间',
                area: 28,
                floor: 4,
                price: 1300,
                is_available: true,
            },
            {
                id: 3,
                title: '南校区一室一厅',
                campus: '南校区',
                room_type: '一室一厅',
                area: 45,
                floor: 5,
                price: 1500,
                is_available: false,
            },
            {
                id: 4,
                title: '东苑教工宿舍',
                campus: '北校区',
                room_type: '单间',
                area: 26,
                floor: 3,
                price: 1100,
                is_available: true,
            },
            {
                id: 5,
                title: '第九教学楼对面',
                campus: '北校区',
                room_type: '单间',
                area: 30,
                floor: 4,
                price: 1250,
                is_available: true,
            },
            {
                id: 6,
                title: '北校区公寓',
                campus: '北校区',
                room_type: '公寓',
                area: 50,
                floor: 13,
                price: 1400,
                is_available: true,
            },
            {
                id: 7,
                title: '南堕街精品单间',
                campus: '南堕街',
                room_type: '单间',
                area: 22,
                floor: 1,
                price: 900,
                is_available: true,
            },
            {
                id: 8,
                title: '南堕街带阳台房',
                campus: '南堕街',
                room_type: '单间',
                area: 27,
                floor: 3,
                price: 1000,
                is_available: false,
            },
        ];
    };

    // 将房源分组到对应校区
    const propertiesByCampus = properties.reduce((acc, property) => {
        const campus = property.campus || '南校区';
        if (!acc[campus]) {
            acc[campus] = [];
        }
        acc[campus].push(property);
        return acc;
    }, { ...campusGroups });

    const handleTabChange = (_event, newValue) => {
        setSelectedTab(newValue);
    };

    const campusNames = Object.keys(campusGroups);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <CircularProgress sx={{ color: '#000' }} />
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#FFF',
            py: 6
        }}>
            <Container maxWidth="lg">
                {/* 页面标题 */}
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        mb: 1,
                        fontWeight: 300,
                        letterSpacing: '0.1em',
                        color: '#000',
                    }}
                >
                    芳菲阁
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 300,
                        color: '#666',
                        letterSpacing: '0.05em'
                    }}
                >
                    房源信息
                </Typography>

                {/* 校区切换标签 */}
                <Box sx={{
                    borderBottom: '1px solid #E0E0E0',
                    mb: 4
                }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTab-root': {
                                color: '#666',
                                fontWeight: 500,
                                fontSize: '1rem',
                                minWidth: 120,
                                letterSpacing: '0.05em',
                                '&.Mui-selected': {
                                    color: '#000',
                                },
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#000',
                                height: 2,
                            },
                        }}
                    >
                        {campusNames.map((campus) => (
                            <Tab key={campus} label={campus} />
                        ))}
                    </Tabs>
                </Box>

                {/* 房源表格 */}
                {campusNames.map((campus, index) => (
                    <Box
                        key={campus}
                        sx={{
                            display: selectedTab === index ? 'block' : 'none'
                        }}
                    >
                        <PropertyTable
                            campus={campus}
                            properties={propertiesByCampus[campus]}
                        />
                    </Box>
                ))}
            </Container>
        </Box>
    );
}

export default PropertyList; 