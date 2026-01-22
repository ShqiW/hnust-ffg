import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFF' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 3,
                    py: 8,
                }}
            >
                <Container maxWidth="md">
                    {/* 个人介绍 */}
                    <Box
                        className="animate-fade-in-up delay-2"
                        sx={{
                            mb: 6,
                            opacity: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', md: '1.0625rem' },
                                color: '#333',
                                lineHeight: 2.2,
                                textAlign: 'justify',
                                textIndent: '2em',
                            }}
                        >
                            大家好，这个店是我在御花苑路口开的，这是我的第二职业，也将是我退休之后的事业坚守。我1995年毕业于湘潭师范学院，湘潭师范学院和湘潭工学院在2003年合并成立湖南科技大学，所以我算是正宗的科大学姐。
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', md: '1.0625rem' },
                                color: '#333',
                                lineHeight: 2.2,
                                textAlign: 'justify',
                                textIndent: '2em',
                                mt: 2,
                            }}
                        >
                            小店主营房屋租赁，打字复印，照相，兼营棋牌，电动车租赁和充电服务，物件寄存服务等。
                        </Typography>
                    </Box>

                    {/* 分隔线 */}
                    <Box
                        className="animate-fade-in delay-2"
                        sx={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#E0E0E0',
                            my: 6,
                            opacity: 0,
                        }}
                    />

                    {/* 门面信息 */}
                    <Box
                        className="animate-fade-in-up delay-2"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            gap: 4,
                            mb: 6,
                            opacity: 0,
                        }}
                    >
                        {/* 门面照片 */}
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundColor: '#F5F5F5',
                            }}
                        >
                            <Box
                                component="img"
                                src="/images/门面图片.jpg"
                                alt="科大服务站门面"
                                sx={{
                                    width: '100%',
                                    height: { xs: 200, md: 280 },
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </Box>

                        {/* 门面信息 */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography
                                sx={{
                                    fontSize: '1.25rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    color: '#000',
                                    mb: 2,
                                }}
                            >
                                科大服务站
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '0.9375rem',
                                    color: '#666',
                                    lineHeight: 2,
                                    mb: 3,
                                }}
                            >
                                位于御花苑十字路口，是「芳菲阁」房屋租赁品牌的实体门店。欢迎到店咨询，也可以在小红书搜索「科大服务站芳菲阁彭姐」查看更多房源视频。
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography sx={{ fontSize: '0.875rem', color: '#999' }}>
                                    地址：<Box component="span" sx={{ color: '#333' }}>御花苑十字路口</Box>
                                </Typography>
                                <Typography sx={{ fontSize: '0.875rem', color: '#999' }}>
                                    电话 / 微信：<Box component="span" sx={{ color: '#333', fontWeight: 500 }}>19967268966</Box>
                                    <Box component="span" sx={{ color: '#999', ml: 1 }}>（备注租房）</Box>
                                </Typography>
                                <Typography sx={{ fontSize: '0.875rem', color: '#999' }}>
                                    小红书：<Box component="span" sx={{ color: '#333' }}>科大服务站芳菲阁彭姐</Box>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* 分隔线 */}
                    <Box
                        className="animate-fade-in delay-3"
                        sx={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#E0E0E0',
                            my: 6,
                            opacity: 0,
                        }}
                    />

                    {/* 信息卡片网格 */}
                    <Box
                        className="animate-fade-in-up delay-3"
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            gap: 4,
                            mb: 6,
                            opacity: 0,
                        }}
                    >
                        {/* 房源概况 */}
                        <InfoCard title="房源概况">
                            <InfoItem label="房源总数" value="60余间" />
                            <InfoItem label="分布区域" value="南校 · 北校 · 南堕街" />
                            <InfoItem label="房屋类型" value="单间 · 一室一厅 · 公寓" />
                            <InfoItem label="价格区间" value="800-1500元/月" />
                        </InfoCard>

                        {/* 配套设施 */}
                        <InfoCard title="配套设施">
                            <InfoItem label="基础设施" value="热水器 · 空调 · 洗衣机" />
                            <InfoItem label="家具配置" value="床铺 · 书桌 · 衣柜" />
                            <InfoItem label="网络覆盖" value="有线 · 无线全覆盖" />
                            <InfoItem label="安全配置" value="指纹锁 · 安全性能好" />
                        </InfoCard>

                        {/* 房源特点 */}
                        <InfoCard title="房源特点">
                            <InfoItem label="卫生间" value="98%带独立卫生间" />
                            <InfoItem label="装修标准" value="80%全屋护墙板" />
                            <InfoItem label="楼层分布" value="1-13楼" />
                            <InfoItem label="租赁方式" value="日租 · 短租 · 长租" />
                        </InfoCard>

                        {/* 特色服务 */}
                        <InfoCard title="特色服务">
                            <InfoItem label="接送服务" value="入住退房市内接送" />
                            <InfoItem label="维修服务" value="室内维修维护免费" />
                            <InfoItem label="保洁服务" value="不定期免费保洁" />
                            <InfoItem label="退房政策" value="提前半月告知即可" />
                        </InfoCard>
                    </Box>

                    {/* 房源分布图 */}
                    <Box
                        className="animate-fade-in-up delay-4"
                        sx={{
                            mb: 6,
                            opacity: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                color: '#000',
                                mb: 3,
                                textAlign: 'center',
                            }}
                        >
                            房源分布图
                        </Typography>
                        <Box
                            sx={{
                                border: '1px solid #E0E0E0',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                component="img"
                                src="/images/房源分布图.jpg"
                                alt="房源分布图"
                                sx={{
                                    width: '100%',
                                    display: 'block',
                                }}
                            />
                        </Box>
                    </Box>

                    {/* 承诺 */}
                    <Box
                        className="animate-fade-in-up delay-4"
                        sx={{
                            backgroundColor: '#FAFAFA',
                            p: { xs: 3, md: 4 },
                            mb: 8,
                            opacity: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '0.9375rem', md: '1rem' },
                                color: '#666',
                                lineHeight: 2,
                                textAlign: 'center',
                                fontStyle: 'italic',
                            }}
                        >
                            "我从科大毕业至今，一直是个中学老师，为人师表，恪守承诺，对学生有种特别的关爱和情怀。做服务是我的爱好，更是我的特长。"
                        </Typography>
                    </Box>

                    {/* 联系方式 */}
                    <Box
                        className="animate-fade-in-up delay-5"
                        sx={{
                            textAlign: 'center',
                            mb: 8,
                            opacity: 0,
                        }}
                    >
                        {/* <Typography
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                color: '#000',
                                mb: 3,
                            }}
                        >
                            联系方式
                        </Typography> */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '0.9375rem', color: '#333', letterSpacing: '0.05em' }}>
                                电话 / 微信：<Box component="span" sx={{ fontWeight: 500 }}>19967268966</Box>
                            </Typography>
                            <Typography sx={{ fontSize: '0.8125rem', color: '#999', letterSpacing: '0.02em' }}>
                                添加微信请备注「租房」
                            </Typography>
                        </Box>
                    </Box>

                    {/* CTA 按钮 */}
                    <Box
                        className="animate-fade-in-up delay-5"
                        sx={{
                            textAlign: 'center',
                            opacity: 0,
                        }}
                    >
                        <Link
                            to="/properties"
                            style={{ textDecoration: 'none' }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    display: 'inline-block',
                                    px: 6,
                                    py: 2,
                                    border: '1px solid #000',
                                    color: '#000',
                                    fontSize: '1rem',
                                    letterSpacing: '0.15em',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#000',
                                        color: '#FFF',
                                    },
                                }}
                            >
                                浏览房源
                            </Box>
                        </Link>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

// 信息卡片组件
const InfoCard = ({ title, children }) => (
    <Box
        sx={{
            borderTop: '2px solid #000',
            pt: 2,
        }}
    >
        <Typography
            sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: '#000',
                mb: 2,
            }}
        >
            {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {children}
        </Box>
    </Box>
);

// 信息项组件
const InfoItem = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography
            sx={{
                fontSize: '0.8125rem',
                color: '#999',
                letterSpacing: '0.02em',
            }}
        >
            {label}
        </Typography>
        <Typography
            sx={{
                fontSize: '0.875rem',
                color: '#333',
                letterSpacing: '0.02em',
            }}
        >
            {value}
        </Typography>
    </Box>
);

export default Home;
