import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#FFF',
            py: 8
        }}>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        mb: 2,
                        fontWeight: 300,
                        letterSpacing: '0.2em',
                        color: '#000',
                    }}
                >
                    芳菲阁
                </Typography>
                <Box sx={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: '#000',
                    margin: '0 auto 6rem auto'
                }} />

                {/* 个人介绍 */}
                <Box sx={{
                    border: '1px solid #E0E0E0',
                    p: 4,
                    mb: 4,
                    backgroundColor: '#FAFAFA'
                }}>
                    <Typography sx={{
                        fontSize: '1.05rem',
                        color: '#333',
                        lineHeight: 2,
                        mb: 3,
                        textAlign: 'justify'
                    }}>
                        大家好，这个店是我在御花苑路口开的，这是我的第二职业，也将是我退休之后的事业坚守。
                        我1995年毕业于湘潭师范学院，湘潭师范学院和湘潭工学院在2003年合并成立湖南科技大学，所以我算是正宗的科大学姐。
                    </Typography>
                    <Typography sx={{
                        fontSize: '1.05rem',
                        color: '#333',
                        lineHeight: 2,
                        textAlign: 'justify'
                    }}>
                        小店主营房屋租赁，打字复印，照相，兼营棋牌，电动车租赁和充电服务，物件寄存服务等。
                    </Typography>
                </Box>

                {/* 房源信息 */}
                <Box sx={{
                    border: '1px solid #E0E0E0',
                    p: 4,
                    mb: 4
                }}>
                    <Typography variant="h6" sx={{
                        mb: 3,
                        fontWeight: 500,
                        borderBottom: '1px solid #000',
                        paddingBottom: 1,
                        letterSpacing: '0.05em'
                    }}>
                        房源概况
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            房源分布
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8, mb: 1 }}>
                            截止现在，已拥有自置房源60余间，分布在南校，北校和南堕街。
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8, mb: 1 }}>
                            • 南校房源：南图旁教工宿舍，地处瑞幸咖啡的十字路口
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>
                            • 北校房源：东苑教工宿舍，位于北校区第九教学楼正对面
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            房屋类型
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 单间（98%带内卫）</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 一室一厅</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 公寓</Typography>
                    </Box>
                </Box>

                {/* 设施与服务 */}
                <Box sx={{
                    border: '1px solid #E0E0E0',
                    p: 4,
                    mb: 4
                }}>
                    <Typography variant="h6" sx={{
                        mb: 3,
                        fontWeight: 500,
                        borderBottom: '1px solid #000',
                        paddingBottom: 1,
                        letterSpacing: '0.05em'
                    }}>
                        设施与服务
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            房屋环境
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 安全系数高</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 干净卫生</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 安静舒适</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            设施设备
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 热水器、洗衣机、空调</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 书桌（凳）、床铺、衣柜</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 部分房间有冰箱和彩电</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 有线无线网络</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 80%房间全屋护墙板，成套定制家具</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 指纹锁，安全性能好</Typography>
                    </Box>
                </Box>

                {/* 租赁信息 */}
                <Box sx={{
                    border: '1px solid #E0E0E0',
                    p: 4,
                    mb: 4
                }}>
                    <Typography variant="h6" sx={{
                        mb: 3,
                        fontWeight: 500,
                        borderBottom: '1px solid #000',
                        paddingBottom: 1,
                        letterSpacing: '0.05em'
                    }}>
                        租赁信息
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            基本信息
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 房源楼层：1楼，3楼，4楼，5楼，13楼</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 租赁形式：日租，短租，长租均可</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>• 租赁价格：800-1500元每月（依房而定）不含水电费用</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            租赁特色
                        </Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>1. 入住和退房时市内包接送</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>2. 在住期间室内维修、维护免费</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>3. 不定期提供免费卫生保洁</Typography>
                        <Typography sx={{ color: '#333', lineHeight: 1.8 }}>4. 合同期内提前退房只需提前半个月告知</Typography>
                    </Box>
                </Box>

                {/* 个人承诺 */}
                <Box sx={{
                    border: '1px solid #E0E0E0',
                    p: 4,
                    mb: 6,
                    backgroundColor: '#FAFAFA'
                }}>
                    <Typography sx={{
                        fontSize: '1.05rem',
                        color: '#333',
                        lineHeight: 2,
                        textAlign: 'justify'
                    }}>
                        我从科大毕业至今，一直是个中学老师，为人师表，恪守承诺，对学生有种特别的关爱和情怀。
                        做服务是我的爱好，更是我的特长，每天把房子打理得精精致致，将一脸笑容奉献给学弟学妹们，其乐融融。
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={Link}
                        to="/properties"
                        variant="contained"
                        sx={{
                            backgroundColor: '#000',
                            color: '#FFF',
                            padding: '12px 48px',
                            fontSize: '1.1rem',
                            fontWeight: 400,
                            letterSpacing: '0.1em',
                            borderRadius: 0,
                            '&:hover': {
                                backgroundColor: '#333',
                            },
                        }}
                    >
                        进入平台
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Home; 