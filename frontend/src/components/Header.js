import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-800 shadow">
            <div className="max-w-2xl mx-auto px-6">
                <nav className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <span className="text-white text-xl">🏠</span>
                        <Link to="/" className="text-white text-lg font-bold hover:text-primary transition-colors duration-200 no-underline">
                            校园租房平台
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/properties" className="text-white hover:text-primary transition-colors duration-200 no-underline">
                            房源列表
                        </Link>
                        <Link to="/login" className="text-white hover:text-primary transition-colors duration-200 no-underline">
                            登录/注册
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header; 