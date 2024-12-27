import React from 'react';

const CatCard = ({ cat, score, onVote, onFavorite, isFavorite }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <img src={cat.url} alt={cat.id} className="w-full h-48 object-cover rounded-md" />
            <div className="flex justify-between items-center mt-4">
                {/* Favorite Button */}
                <button
                    onClick={() => onFavorite(cat.id)}
                    className={`p-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                >
                    {isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
                {/* Voting Section */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => onVote(cat.id, 1)} className="p-2 bg-green-500 text-white rounded">
                        👍
                    </button>
                    <span>{score}</span>
                    <button onClick={() => onVote(cat.id, 0)} className="p-2 bg-red-500 text-white rounded">
                        👎
                    </button>
                </div>
            </div>
            {/* Score Display */}
            <div className="text-center mt-4">
                <span className="text-sm">Score: {score}</span>
            </div>
        </div>
    );
};

export default CatCard;
