import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// 格式化可租日期（北京时间）
const formatAvailableDate = (dateStr) => {
    if (!dateStr) return '咨询';
    // 解析日期（格式：YYYY-MM-DD）
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    // 获取北京时间的今天日期
    const now = new Date();
    const beijingNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
    const todayBeijing = new Date(beijingNow.getFullYear(), beijingNow.getMonth(), beijingNow.getDate());
    if (date <= todayBeijing) return '即日可租';
    return `${year}年${month}月${day}日`;
};

const PropertyTable = ({ location, properties }) => {
    const navigate = useNavigate();

    const handleRowClick = (propertyId) => {
        navigate(`/properties/${propertyId}`);
    };

    return (
        <Box>
            {/* 位置标题 */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box
                    component="h2"
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        color: '#000',
                        m: 0,
                    }}
                >
                    {location}
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        height: 1,
                        backgroundColor: '#E0E0E0',
                    }}
                />
                <Box
                    sx={{
                        fontSize: '0.8125rem',
                        color: '#999',
                        letterSpacing: '0.02em',
                    }}
                >
                    {properties?.length || 0} 间
                </Box>
            </Box>

            {/* 表格 */}
            <Box
                sx={{
                    border: '1px solid #E0E0E0',
                    overflow: 'hidden',
                }}
            >
                {/* 表头 */}
                <Box
                    sx={{
                        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 0.8fr 0.8fr 1fr 1.2fr 0.8fr' },
                        backgroundColor: '#FAFAFA',
                        borderBottom: '1px solid #E0E0E0',
                        display: { xs: 'none', md: 'grid' },
                    }}
                >
                    <HeaderCell>房源名称</HeaderCell>
                    <HeaderCell>房型</HeaderCell>
                    <HeaderCell>面积</HeaderCell>
                    <HeaderCell>独卫</HeaderCell>
                    <HeaderCell>租金</HeaderCell>
                    <HeaderCell>最早可租</HeaderCell>
                    <HeaderCell last>状态</HeaderCell>
                </Box>

                {/* 表格内容 */}
                {properties && properties.length > 0 ? (
                    properties.map((property, index) => (
                        <Box
                            key={property.id}
                            onClick={() => handleRowClick(property.id)}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 0.8fr 0.8fr 1fr 1.2fr 0.8fr' },
                                borderBottom: index < properties.length - 1 ? '1px solid #F0F0F0' : 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    backgroundColor: '#FAFAFA',
                                },
                            }}
                        >
                            {/* 移动端布局 */}
                            <Box sx={{ display: { xs: 'block', md: 'none' }, p: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                    <Box sx={{ fontSize: '0.9375rem', fontWeight: 500, color: '#000', letterSpacing: '0.02em' }}>
                                        {property.title}
                                    </Box>
                                    <StatusBadge available={property.is_available} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 2, color: '#666', fontSize: '0.8125rem', flexWrap: 'wrap' }}>
                                    <span>{property.room_type_display || property.room_type || '单间'}</span>
                                    <span>·</span>
                                    <span>{property.area ? `${property.area}㎡` : '-'}</span>
                                    <span>·</span>
                                    <span>{property.has_private_bathroom ? '独卫' : '公卫'}</span>
                                    <span>·</span>
                                    <span>{formatAvailableDate(property.available_from)}</span>
                                </Box>
                                <Box sx={{ mt: 1.5, fontSize: '0.9375rem', fontWeight: 500, color: '#000' }}>
                                    {property.price_display || `¥${property.price}/月`}
                                </Box>
                            </Box>

                            {/* 桌面端布局 */}
                            <DataCell sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 500 }}>
                                {property.title}
                            </DataCell>
                            <DataCell sx={{ display: { xs: 'none', md: 'flex' }, color: '#666' }}>
                                {property.room_type_display || property.room_type || '单间'}
                            </DataCell>
                            <DataCell sx={{ display: { xs: 'none', md: 'flex' }, color: '#666' }}>
                                {property.area ? `${property.area}㎡` : '-'}
                            </DataCell>
                            <DataCell sx={{ display: { xs: 'none', md: 'flex' }, color: '#666' }}>
                                {property.has_private_bathroom ? '有' : '无'}
                            </DataCell>
                            <DataCell sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 500 }}>
                                {property.price_display || `¥${property.price}/月`}
                            </DataCell>
                            <DataCell sx={{ display: { xs: 'none', md: 'flex' }, color: '#666' }}>
                                {formatAvailableDate(property.available_from)}
                            </DataCell>
                            <DataCell last sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <StatusBadge available={property.is_available} />
                            </DataCell>
                        </Box>
                    ))
                ) : (
                    <Box
                        sx={{
                            py: 8,
                            textAlign: 'center',
                            color: '#999',
                            fontSize: '0.875rem',
                            letterSpacing: '0.02em',
                        }}
                    >
                        暂无房源信息
                    </Box>
                )}
            </Box>
        </Box>
    );
};

// 表头单元格
const HeaderCell = ({ children, last }) => (
    <Box
        sx={{
            py: 2,
            px: 2.5,
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#666',
            letterSpacing: '0.05em',
            borderRight: last ? 'none' : '1px solid #E0E0E0',
        }}
    >
        {children}
    </Box>
);

// 数据单元格
const DataCell = ({ children, last, sx = {} }) => (
    <Box
        sx={{
            py: 2.5,
            px: 2.5,
            fontSize: '0.875rem',
            color: '#000',
            letterSpacing: '0.02em',
            borderRight: last ? 'none' : '1px solid #F0F0F0',
            alignItems: 'center',
            ...sx,
        }}
    >
        {children}
    </Box>
);

// 状态标签
const StatusBadge = ({ available }) => (
    <Box
        component="span"
        sx={{
            display: 'inline-block',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            border: '1px solid',
            borderColor: available ? '#000' : '#E0E0E0',
            color: available ? '#000' : '#999',
            backgroundColor: available ? 'transparent' : '#FAFAFA',
        }}
    >
        {available ? '可租' : '已租'}
    </Box>
);

export default PropertyTable;
