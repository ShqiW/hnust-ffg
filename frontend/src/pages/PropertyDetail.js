import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Dialog, IconButton, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight, Close, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import API_URL from '../config';

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
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        fetchProperty();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProperty = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/properties/${id}/`);
            setProperty(response.data);
        } catch (error) {
            console.error('Error fetching property:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !property) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress sx={{ color: '#000' }} size={24} thickness={2} />
            </Box>
        );
    }

    const images = property.images || [];
    const hasMultipleImages = images.length > 1;
    const availableFacilities = FACILITIES.filter(f => property[f.key]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF', pt: 6, pb: 12 }}>
            <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
                {/* 第一行：照片 + 价格信息 */}
                <Box
                    className="animate-fade-in-up"
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        mb: 6,
                        height: { md: 420 },
                        opacity: 0,
                    }}
                >
                    {/* 左侧：照片轮播 */}
                    <Box
                        sx={{
                            flex: { md: '0 0 60%' },
                            width: { xs: '100%', md: '60%' },
                            height: { xs: 280, md: 420 },
                            position: 'relative',
                            overflow: 'hidden',
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
                                <NavButton direction="left" onClick={handlePrevImage}>
                                    <ChevronLeft sx={{ fontSize: 24 }} />
                                </NavButton>
                                <NavButton direction="right" onClick={handleNextImage}>
                                    <ChevronRight sx={{ fontSize: 24 }} />
                                </NavButton>
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
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            backgroundColor: index === currentImageIndex ? '#000' : 'rgba(255,255,255,0.6)',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease',
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
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: '#FFF',
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {currentImageIndex + 1} / {images.length}
                            </Box>
                        )}
                    </Box>

                    {/* 右侧：价格、状态、按钮 */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: '35%' },
                            p: { xs: 3, md: 4 },
                            border: '1px solid #E0E0E0',
                        }}
                    >
                        {/* 价格 */}
                        <Box sx={{ fontSize: '0.8125rem', color: '#999', letterSpacing: '0.05em', mb: 1 }}>
                            租金
                        </Box>
                        <Box sx={{ fontSize: { xs: '1.75rem', md: '2rem' }, fontWeight: 300, color: '#000', mb: 4 }}>
                            {property.price_display || `¥${property.price}/月`}
                        </Box>

                        {/* 出租状态和最早可入住 */}
                        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                            <Box>
                                <Box sx={{ fontSize: '0.8125rem', color: '#999', mb: 1 }}>出租状态</Box>
                                <Box sx={{ fontSize: '1rem', fontWeight: 500, color: property.is_available ? '#000' : '#999' }}>
                                    {property.rental_status_display || (property.is_available ? '可出租' : '已出租')}
                                </Box>
                            </Box>
                            {property.available_from && (
                                <Box>
                                    <Box sx={{ fontSize: '0.8125rem', color: '#999', mb: 1 }}>最早可入住</Box>
                                    <Box sx={{ fontSize: '1rem', fontWeight: 500, color: '#000' }}>
                                        {new Date(property.available_from).toLocaleDateString('zh-CN')}
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        {/* 联系方式 */}
                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ fontSize: '0.8125rem', color: '#999', mb: 1 }}>咨询房源</Box>
                            <Box sx={{ fontSize: '1rem', fontWeight: 500, color: '#000' }}>19967268966</Box>
                            <Box sx={{ fontSize: '0.8125rem', color: '#666' }}>电话 / 微信同号（备注租房）</Box>
                        </Box>

                        {/* 返回按钮 */}
                        <ActionButton onClick={() => navigate(-1)}>
                            <ArrowBack sx={{ fontSize: 18, mr: 1 }} />
                            返回列表
                        </ActionButton>
                    </Box>
                </Box>

                {/* 房源描述 */}
                {property.description && (
                    <InfoSection
                        title="房源描述"
                        className="animate-fade-in-up delay-1"
                    >
                        <Box sx={{ fontSize: '0.9375rem', color: '#666', lineHeight: 2, textAlign: 'justify' }}>
                            {property.description}
                        </Box>
                    </InfoSection>
                )}

                {/* 基本信息 */}
                <InfoSection
                    title="基本信息"
                    className="animate-fade-in-up delay-2"
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 5 } }}>
                        <InfoItem label="位置" value={property.location} />
                        <InfoItem label="房型" value={property.room_type_display || property.room_type} />
                        <InfoItem label="面积" value={`${property.area}㎡`} />
                        {property.floor && <InfoItem label="楼层" value={`${property.floor}楼`} />}
                        {property.is_on_campus && <InfoItem label="位置类型" value="校园内" />}
                    </Box>
                </InfoSection>

                {/* 配套设施 */}
                {availableFacilities.length > 0 && (
                    <InfoSection
                        title="配套设施"
                        className="animate-fade-in-up delay-3"
                        noBorder
                    >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {availableFacilities.map((facility) => (
                                <Box
                                    key={facility.key}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        border: '1px solid #E0E0E0',
                                        fontSize: '0.8125rem',
                                        color: '#333',
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    {facility.label}
                                </Box>
                            ))}
                        </Box>
                    </InfoSection>
                )}
            </Container>

            {/* Lightbox */}
            <Dialog
                open={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                maxWidth={false}
                slotProps={{
                    paper: {
                        sx: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'visible' }
                    }
                }}
                sx={{
                    '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
                }}
            >
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton
                        onClick={() => setLightboxOpen(false)}
                        sx={{
                            position: 'fixed',
                            top: 20,
                            right: 20,
                            color: '#FFF',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                        }}
                    >
                        <Close />
                    </IconButton>

                    {hasMultipleImages && (
                        <>
                            <IconButton
                                onClick={handlePrevImage}
                                sx={{
                                    position: 'fixed',
                                    left: 20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#FFF',
                                    width: 48,
                                    height: 48,
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                                }}
                            >
                                <ChevronLeft fontSize="large" />
                            </IconButton>
                            <IconButton
                                onClick={handleNextImage}
                                sx={{
                                    position: 'fixed',
                                    right: 20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#FFF',
                                    width: 48,
                                    height: 48,
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                                }}
                            >
                                <ChevronRight fontSize="large" />
                            </IconButton>
                        </>
                    )}

                    <img
                        src={images[currentImageIndex]?.image}
                        alt={property.title}
                        style={{ display: 'block', maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain' }}
                    />

                    {hasMultipleImages && (
                        <Box
                            sx={{
                                position: 'fixed',
                                bottom: 30,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: '#FFF',
                                fontSize: '0.875rem',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {currentImageIndex + 1} / {images.length}
                        </Box>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
}

// 导航按钮组件
const NavButton = ({ direction, onClick, children }) => (
    <Box
        component="button"
        onClick={onClick}
        sx={{
            position: 'absolute',
            [direction]: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            '&:hover': { backgroundColor: '#FFF' },
        }}
    >
        {children}
    </Box>
);

// 操作按钮组件
const ActionButton = ({ children, primary, onClick }) => (
    <Box
        component="button"
        onClick={onClick}
        sx={{
            width: '100%',
            py: 1.5,
            mb: primary ? 1.5 : 0,
            fontSize: '0.9375rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            fontFamily: 'inherit',
            border: '1px solid #000',
            backgroundColor: primary ? '#000' : 'transparent',
            color: primary ? '#FFF' : '#000',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
                backgroundColor: primary ? '#333' : '#F5F5F5',
            },
        }}
    >
        {children}
    </Box>
);

// 信息区块组件
const InfoSection = ({ title, children, className, noBorder }) => (
    <Box
        className={className}
        sx={{
            p: { xs: 3, md: 4 },
            border: '1px solid #E0E0E0',
            borderBottom: noBorder ? '1px solid #E0E0E0' : 'none',
            opacity: 0,
            '&:last-child': { borderBottom: '1px solid #E0E0E0' },
        }}
    >
        <Box
            component="h3"
            sx={{
                fontSize: '0.9375rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: '#000',
                m: 0,
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #000',
            }}
        >
            {title}
        </Box>
        {children}
    </Box>
);

// 信息项组件
const InfoItem = ({ label, value }) => (
    <Box sx={{ minWidth: 100 }}>
        <Box sx={{ fontSize: '0.8125rem', color: '#999', letterSpacing: '0.02em', mb: 0.5 }}>
            {label}
        </Box>
        <Box sx={{ fontSize: '0.9375rem', fontWeight: 500, color: '#000' }}>
            {value}
        </Box>
    </Box>
);

export default PropertyDetail;
