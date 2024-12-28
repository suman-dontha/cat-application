import React from 'react';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const CatCard = ({ cat, score, onVote, onFavorite, isFavorite }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <img src={cat.url} alt={`Cat ${cat.id}`} className="w-full h-48 object-cover rounded mb-4" />
            <div className="flex justify-between items-center mt-4">
                {/* Favorite Button */}
                <button onClick={() => onFavorite(cat.id)} className="flex items-center px-4 py-2 rounded">
                    {isFavorite ? (
                        <HeartIconFilled className="w-6 h-6 text-red-500" />
                    ) : (
                        <HeartIconOutline className="w-6 h-6 text-gray-500" />
                    )}
                </button>
                {/* Voting Section */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onVote(cat.id, 1)}
                        className="flex items-center px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        <ArrowUpIcon className="w-5 h-5" />
                    </button>
                    <span>{score}</span>
                    <button
                        onClick={() => onVote(cat.id, -1)}
                        className="flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        <ArrowDownIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            {/* Score Display */}
            <div className="mt-2 text-md font-medium text-gray-900">Score: {score || 0}</div>
        </div>
    );
};

export default CatCard;
