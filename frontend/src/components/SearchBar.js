import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guests, setGuests] = useState(1);

    const handleSearch = () => {
        onSearch({
            location,
            startDate,
            endDate,
            guests
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">位置</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="你想去哪里？"
                            className="input pl-10"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">入住</label>
                        <input
                            type="date"
                            className="input"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">退房</label>
                        <input
                            type="date"
                            className="input"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">人数</label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            className="input pr-10"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    className="btn btn-primary self-end"
                >
                    搜索
                </button>
            </div>
        </div>
    );
};

export default SearchBar; 