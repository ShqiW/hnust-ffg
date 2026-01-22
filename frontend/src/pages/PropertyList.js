import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import PropertyTable from '../components/PropertyTable';
import API_URL from '../config';

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [locationNames, setLocationNames] = useState([]);

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/properties/`);
            // 兼容分页格式和数组格式
            const data = response.data.results || response.data || [];
            setProperties(data);
            // 动态提取位置列表，校内优先，南校区在前
            const locationMap = {};
            data.forEach(p => {
                if (!locationMap[p.location]) {
                    locationMap[p.location] = p.is_on_campus;
                }
            });
            const locations = Object.keys(locationMap).sort((a, b) => {
                const aOnCampus = locationMap[a];
                const bOnCampus = locationMap[b];
                // 校内优先
                if (aOnCampus && !bOnCampus) return -1;
                if (!aOnCampus && bOnCampus) return 1;
                // 南校区在北校区前面
                if (a.includes('南校区') && b.includes('北校区')) return -1;
                if (a.includes('北校区') && b.includes('南校区')) return 1;
                return a.localeCompare(b, 'zh-CN');
            });
            setLocationNames(locations);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties(getMockData());
            setLocationNames(['南校区', '北校区', '南堕街']);
        } finally {
            setLoading(false);
        }
    };

    const getMockData = () => {
        return [
            { id: 1, title: '南图旁教工宿舍', campus: '南校区', room_type_display: '单间独立卫生间', area: 25, floor: 3, price_display: '¥1200/月', is_available: true },
            { id: 2, title: '瑞幸咖啡路口精装房', campus: '南校区', room_type_display: '单间独立卫生间', area: 28, floor: 4, price_display: '¥1300/月', is_available: true },
            { id: 3, title: '南校区一室一厅', campus: '南校区', room_type_display: '一室一厅一卫', area: 45, floor: 5, price_display: '¥1500/月', is_available: false },
            { id: 4, title: '东苑教工宿舍', campus: '北校区', room_type_display: '单间独立卫生间', area: 26, floor: 3, price_display: '¥1100/月', is_available: true },
            { id: 5, title: '第九教学楼对面', campus: '北校区', room_type_display: '单间公共卫生间', area: 30, floor: 4, price_display: '¥1250/月', is_available: true },
            { id: 6, title: '北校区公寓', campus: '北校区', room_type_display: '两室一厅一卫', area: 50, floor: 13, price_display: '¥1400/月', is_available: true },
            { id: 7, title: '南堕街精品单间', campus: '南堕街', room_type_display: '单间公共卫生间', area: 22, floor: 1, price_display: '¥900/月', is_available: true },
            { id: 8, title: '南堕街带阳台房', campus: '南堕街', room_type_display: '单间独立卫生间', area: 27, floor: 3, price_display: '¥1000/月', is_available: false },
        ];
    };

    const propertiesByLocation = properties.reduce((acc, property) => {
        const location = property.location || '未知位置';
        if (!acc[location]) acc[location] = [];
        acc[location].push(property);
        return acc;
    }, {});

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <CircularProgress sx={{ color: '#000' }} size={24} thickness={2} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF', pt: 6, pb: 12 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
                {/* 页面标题 */}
                <Box
                    className="animate-fade-in-up"
                    sx={{ textAlign: 'center', mb: 8, opacity: 0 }}
                >
                    <Box
                        component="h1"
                        sx={{
                            fontSize: { xs: '1.75rem', md: '2rem' },
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            color: '#000',
                            m: 0,
                            mb: 2,
                        }}
                    >
                        房源信息
                    </Box>
                    <Box
                        sx={{
                            width: 40,
                            height: 1,
                            backgroundColor: '#000',
                            margin: '0 auto',
                        }}
                    />
                </Box>

                {/* 校区切换 */}
                <Box
                    className="animate-fade-in-up delay-1"
                    sx={{ mb: 6, opacity: 0 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: { xs: 2, md: 4 },
                            borderBottom: '1px solid #E0E0E0',
                            pb: 0,
                        }}
                    >
                        {locationNames.map((location, index) => (
                            <TabButton
                                key={location}
                                label={location}
                                active={selectedTab === index}
                                onClick={() => setSelectedTab(index)}
                            />
                        ))}
                    </Box>
                </Box>

                {/* 房源列表 */}
                <Box className="animate-fade-in-up delay-2" sx={{ opacity: 0 }}>
                    {locationNames.map((location, index) => (
                        <Box
                            key={location}
                            sx={{ display: selectedTab === index ? 'block' : 'none' }}
                        >
                            <PropertyTable
                                location={location}
                                properties={propertiesByLocation[location] || []}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

// 自定义 Tab 按钮组件
const TabButton = ({ label, active, onClick }) => (
    <Box
        component="button"
        onClick={onClick}
        sx={{
            position: 'relative',
            background: 'none',
            border: 'none',
            padding: '12px 16px',
            fontSize: '0.9375rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: active ? '#000' : '#999',
            cursor: 'pointer',
            transition: 'color 0.25s ease',
            fontFamily: 'inherit',
            '&:hover': {
                color: '#000',
            },
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -1,
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: '#000',
                transform: active ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.25s ease',
            },
            '&:hover::after': {
                transform: 'scaleX(1)',
            },
        }}
    >
        {label}
    </Box>
);

export default PropertyList;
