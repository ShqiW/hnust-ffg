import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-background py-16 flex justify-center">
            <div className="max-w-2xl mx-auto px-6">
                <h1 className="text-5xl font-bold text-primary text-center mb-8 px-4">芳菲阁</h1>

                {/* 个人介绍 */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        大家好，这个店是我在御花苑路口开的，这是我的第二职业，也将是我退休之后的事业坚守。
                        我1995年毕业于湘潭师范学院，湘潭师范学院和湘潭工学院在2003年合并成立湖南科技大学，所以我算是正宗的科大学姐。
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        小店主营房屋租赁，打字复印，照相，兼营棋牌，电动车租赁和充电服务，物件寄存服务等。
                    </p>
                </div>

                {/* 房源信息 */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-primary mb-4">房源概况</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-3">房源分布</h3>
                        <p className="text-gray-700 mb-2">
                            截止现在，已拥有自置房源60余间，分布在南校，北校和南堕街。
                        </p>
                        <p className="text-gray-700 mb-2">• 南校房源：南图旁教工宿舍，地处瑞幸咖啡的十字路口</p>
                        <p className="text-gray-700">• 北校房源：东苑教工宿舍，位于北校区第九教学楼正对面</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-3">房屋类型</h3>
                        <p className="text-gray-700">• 单间（98%带内卫）</p>
                        <p className="text-gray-700">• 一室一厅</p>
                        <p className="text-gray-700">• 公寓</p>
                    </div>
                </div>

                {/* 设施与服务 */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-primary mb-4">设施与服务</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-3">房屋环境</h3>
                        <p className="text-gray-700">• 安全系数高</p>
                        <p className="text-gray-700">• 干净卫生</p>
                        <p className="text-gray-700">• 安静舒适</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-3">设施设备</h3>
                        <p className="text-gray-700">• 热水器、洗衣机、空调</p>
                        <p className="text-gray-700">• 书桌（凳）、床铺、衣柜</p>
                        <p className="text-gray-700">• 部分房间有冰箱和彩电</p>
                        <p className="text-gray-700">• 有线无线网络</p>
                        <p className="text-gray-700">• 80%房间全屋护墙板，成套定制家具</p>
                        <p className="text-gray-700">• 指纹锁，安全性能好</p>
                    </div>
                </div>

                {/* 租赁信息 */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-primary mb-4">租赁信息</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-3">基本信息</h3>
                        <p className="text-gray-700">• 房源楼层：1楼，3楼，4楼，5楼，13楼</p>
                        <p className="text-gray-700">• 租赁形式：日租，短租，长租均可</p>
                        <p className="text-gray-700">• 租赁价格：800-1500元每月（依房而定）不含水电费用</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium mb-3">租赁特色</h3>
                        <p className="text-gray-700">1. 入住和退房时市内包接送</p>
                        <p className="text-gray-700">2. 在住期间室内维修、维护免费</p>
                        <p className="text-gray-700">3. 不定期提供免费卫生保洁</p>
                        <p className="text-gray-700">4. 合同期内提前退房只需提前半个月告知</p>
                    </div>
                </div>

                {/* 个人承诺 */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        我从科大毕业至今，一直是个中学老师，为人师表，恪守承诺，对学生有种特别的关爱和情怀。
                        做服务是我的爱好，更是我的特长，每天把房子打理得精精致致，将一脸笑容奉献给学弟学妹们，其乐融融。
                    </p>
                </div>

                <div className="text-center px-4">
                    <Link to="/properties" className="btn btn-primary text-lg px-8 py-3">
                        进入平台
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home; 