import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Paper,
    Button,
    Divider,
    Dialog,
    IconButton,
} from '@mui/material';
import {
    CheckCircle,
    ArrowBack,
    ChevronLeft,
    ChevronRight,
    Close,
} from '@mui/icons-material';
import axios from 'axios';

// 设施配置
const FACILITIES = [
    { key: 'has_air_conditioning', label: '空调' },
    { key: 'has_water_heater', label: '热水器' },
    { key: 'has_washing_machine', label: '洗衣机' },
    { key: 'has_refrigerator', label: '冰箱' },
    { key: 'has_tv', label: '电视' },
    { key: 'has_wifi', label: 'WiFi' },
    { key: 'has_bed', label: '床' },
    { key: 'has_desk', label: '书桌' },
    { key: 'has_wardrobe', label: '衣柜' },
];

function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

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

    if (!property) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <Typography>加载中...</Typography>
            </Box>
        );
    }

    // 图片轮播
    const images = property.images || [];
    const hasMultipleImages = images.length > 1;

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF', py: 6 }}>
            <Container maxWidth="lg">
                {/* 第一行：照片 + 价格信息 */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    mb: 4,
                    height: { md: 400 },
                }}>
                    {/* 左侧：照片轮播 */}
                    <Box
                        sx={{
                            flex: { md: '0 0 58%' },
                            width: { xs: '100%', md: '58%' },
                            height: { xs: 300, md: 400 },
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid #E0E0E0',
                            backgroundColor: '#F5F5F5',
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src={images[currentImageIndex]?.image || 'https://via.placeholder.com/800x400?text=暂无图片'}
                            alt={property.title}
                            onClick={() => images.length > 0 && setLightboxOpen(true)}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                cursor: images.length > 0 ? 'pointer' : 'default',
                            }}
                        />

                            {/* 左右切换按钮 */}
                            {hasMultipleImages && (
                                <>
                                    <Button
                                        onClick={handlePrevImage}
                                        sx={{
                                            position: 'absolute',
                                            left: 8,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            minWidth: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            color: '#000',
                                            '&:hover': { backgroundColor: '#FFF' },
                                        }}
                                    >
                                        <ChevronLeft />
                                    </Button>
                                    <Button
                                        onClick={handleNextImage}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            minWidth: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            color: '#000',
                                            '&:hover': { backgroundColor: '#FFF' },
                                        }}
                                    >
                                        <ChevronRight />
                                    </Button>
                                </>
                            )}

                            {/* 图片指示器 */}
                            {hasMultipleImages && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        display: 'flex',
                                        gap: 1,
                                    }}
                                >
                                    {images.map((_, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: index === currentImageIndex ? '#000' : 'rgba(255,255,255,0.7)',
                                                cursor: 'pointer',
                                                border: '1px solid rgba(0,0,0,0.3)',
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}

                            {/* 图片计数 */}
                            {hasMultipleImages && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        color: '#FFF',
                                        px: 1.5,
                                        py: 0.5,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {currentImageIndex + 1} / {images.length}
                                </Box>
                            )}
                    </Box>

                    {/* 右侧：价格、状态、按钮 */}
                    <Paper sx={{
                        flex: { md: '1 1 auto' },
                        width: { xs: '100%' },
                        height: { xs: 'auto', md: 400 },
                        p: 4,
                        boxShadow: 'none',
                        border: '1px solid #E0E0E0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxSizing: 'border-box',
                    }}>
                            {/* 价格 */}
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    租金
                                </Typography>
                                <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
                                    {property.price_display || `¥${property.price}/月`}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* 出租状态 */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        出租状态
                                    </Typography>
                                    <Typography variant="h6" sx={{
                                        fontWeight: 500,
                                        color: property.is_available ? '#000' : '#999'
                                    }}>
                                        {property.rental_status_display || (property.is_available ? '可出租' : '已出租')}
                                    </Typography>
                                </Box>

                                {/* 最早可入住时间 */}
                                {property.available_from && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            最早可入住
                                        </Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                            {new Date(property.available_from).toLocaleDateString('zh-CN')}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* 按钮 */}
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                        backgroundColor: '#000',
                                        color: '#FFF',
                                        borderRadius: 0,
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: '#333',
                                        }
                                    }}
                                >
                                    咨询房源
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        borderColor: '#000',
                                        color: '#000',
                                        borderRadius: 0,
                                        py: 1.5,
                                        '&:hover': {
                                            borderColor: '#000',
                                            backgroundColor: '#F5F5F5',
                                        }
                                    }}
                                >
                                    返回列表
                                </Button>
                            </Box>
                    </Paper>
                </Box>

                {/* 第二行：房源描述 */}
                {property.description && (
                    <Paper sx={{ p: 4, boxShadow: 'none', border: '1px solid #E0E0E0', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, borderBottom: '2px solid #000', pb: 1 }}>
                            房源描述
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8 }}>
                            {property.description}
                        </Typography>
                    </Paper>
                )}

                {/* 第三行：基本信息 */}
                <Paper sx={{ p: 4, boxShadow: 'none', border: '1px solid #E0E0E0', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, borderBottom: '2px solid #000', pb: 1 }}>
                        基本信息
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">位置</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.location}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">房型</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {property.room_type_display || property.room_type}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">面积</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.area}㎡</Typography>
                        </Box>
                        {property.floor && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">楼层</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.floor}楼</Typography>
                            </Box>
                        )}
                        {property.is_on_campus && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">位置类型</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>校园内</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>

                {/* 第四行：配套设施 */}
                <Paper sx={{ p: 4, boxShadow: 'none', border: '1px solid #E0E0E0' }}>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, borderBottom: '2px solid #000', pb: 1 }}>
                        配套设施
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {FACILITIES.filter(f => property[f.key]).map((facility) => (
                            <Box
                                key={facility.key}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CheckCircle sx={{ mr: 1, fontSize: 18, color: '#000' }} />
                                <Typography variant="body2">
                                    {facility.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Container>

            {/* 图片放大 Lightbox */}
            <Dialog
                open={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                maxWidth={false}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            overflow: 'visible',
                        }
                    }
                }}
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    }
                }}
            >
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* 关闭按钮 */}
                    <IconButton
                        onClick={() => setLightboxOpen(false)}
                        sx={{
                            position: 'fixed',
                            top: 20,
                            right: 20,
                            color: '#FFF',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                    >
                        <Close />
                    </IconButton>

                    {/* 左切换按钮 */}
                    {hasMultipleImages && (
                        <IconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: 'fixed',
                                left: 20,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#FFF',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                width: 50,
                                height: 50,
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                            }}
                        >
                            <ChevronLeft fontSize="large" />
                        </IconButton>
                    )}

                    {/* 大图 */}
                    <img
                        src={images[currentImageIndex]?.image}
                        alt={property.title}
                        style={{
                            display: 'block',
                            maxWidth: '80vw',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                        }}
                    />

                    {/* 右切换按钮 */}
                    {hasMultipleImages && (
                        <IconButton
                            onClick={handleNextImage}
                            sx={{
                                position: 'fixed',
                                right: 20,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#FFF',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                width: 50,
                                height: 50,
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                            }}
                        >
                            <ChevronRight fontSize="large" />
                        </IconButton>
                    )}

                    {/* 图片计数 */}
                    {hasMultipleImages && (
                        <Typography
                            sx={{
                                position: 'fixed',
                                bottom: 30,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: '#FFF',
                                fontSize: '1rem',
                            }}
                        >
                            {currentImageIndex + 1} / {images.length}
                        </Typography>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
}

export default PropertyDetail;
