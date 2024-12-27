import React, { useEffect, useState, useMemo } from 'react';
import {
    useGetCatImagesQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
    useVoteCatImageMutation,
    useGetVotesQuery
} from '../../api/catApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites, updateVotes } from '../../features/catSlice';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { paginate } from '../../utils/paginate';

const Pagination = ({ page, pageCount, onPageChange }) => {
    return (
        <div className="flex items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded ${page === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'}`}
            >
                Previous
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`px-4 py-2 text-sm font-medium rounded ${pageNumber === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === pageCount}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded ${page === pageCount
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'}`}
            >
                Next
            </button>
        </div>
    );
};

const CatGallery = () => {
    const dispatch = useDispatch();
    
    const [page, setPage] = useState(1);
    const { data: catImages, isLoading, isError } = useGetCatImagesQuery();
    const { data: voteData } = useGetVotesQuery();

    const cats = useMemo(() => catImages || [], [catImages]);
    const pageCount = useMemo(() => Math.ceil((cats?.length || 0) / 8) || 1, [cats]);
    const paginatedCats = useMemo(() => paginate(cats, 8, page), [cats, page]);

    const favorites = useSelector((state) => state.cats.favorites);
    const votes = useSelector((state) => state.cats.votes);
    
    const [ addFavorite ] = useAddFavoriteMutation();
    const [ removeFavorite ] = useRemoveFavoriteMutation();
    const [ voteCatImage ] = useVoteCatImageMutation();

    useEffect(
        () => {
            if (voteData) {
                // Process votes and calculate the total votes for each image
                const scores = {};
                voteData.forEach((vote) => {
                    scores[vote.image_id] = (scores[vote.image_id] || 0) + vote.value;
                });
                dispatch(updateVotes(scores));
            }
        },
        [ voteData, dispatch ]
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError.message}</div>;

    const handleVote = async (id, vote) => {
        await voteCatImage({ imageId: id, vote });
        dispatch(updateVotes({ [id]: (votes[id] || 0) + vote }));
    };

    const handleFavorite = async (id) => {
        if (favorites && favorites.includes(id)) {
            await removeFavorite(id);
            dispatch(updateFavorites(favorites.filter((favourite) => favourite !== id)));
        } else {
            await addFavorite(id);
            dispatch(updateFavorites([ ...favorites, id ]));
        }
    };

    return (
        <div data-testid="cat-list" className="flex flex-col items-center space-y-6 p-6">
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedCats.map((cat) => (
                        <div
                            key={cat.id}
                            className="border p-4 rounded shadow-sm"
                        >
                            <img
                                src={cat.url}
                                alt={`Cat ${cat.id}`}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                            {/* Favorite Buttons */}
                            <div className="flex justify-between items-center w-full">
                                <button
                                    onClick={() => handleFavorite(cat.id)}
                                    className="flex items-center px-4 py-2 rounded font-semibold"
                                >
                                    {favorites.includes(cat.id) ? (
                                        <HeartIconFilled className="w-6 h-6 text-red-500" />
                                    ) : (
                                        <HeartIconOutline className="w-6 h-6 text-gray-500" />
                                    )}
                                </button>
                                
                                {/* Vote Buttons */}
                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                    <button
                                        onClick={() => handleVote(cat.id, 1)}
                                        className="flex items-center px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        <ArrowUpIcon className="w-5 h-5" />
                                    </button>
                                    <span className="text-gray-800">{votes[cat.id] || 0}</span>
                                    <button
                                        onClick={() => handleVote(cat.id, -1)}
                                        className="flex items-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        <ArrowDownIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            {/* Score Display */}
                                <div className="mt-2 text-md font-medium text-gray-900">
                                    Score: {votes[cat.id] || 0}
                                </div>
                        </div>
                    ))}
                </div>
            </main>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
    );
};

export default CatGallery;
