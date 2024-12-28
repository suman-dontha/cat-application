import React, { useEffect, useState, useMemo } from 'react';
import { useGetCatImagesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation, useVoteCatImageMutation, useGetVotesQuery } from '../../api/catApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites, updateVotes } from '../../features/catSlice';
import { Pagination } from './Pagination';
import CatCard from '../CatCard/CatCard';
import Skeleton from './Skeleton';
import { paginate } from '../../utils/paginate';

const CatGallery = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); 
    const { data: catImages, isError } = useGetCatImagesQuery(undefined, { 
        pollingInterval: 0,
    }); 
    const { data: voteData } = useGetVotesQuery();

    const cats = useMemo(() => catImages || [], [catImages]);
    const pageCount = useMemo(() => Math.ceil((cats?.length || 0) / 8) || 1, [cats]);
    const paginatedCats = useMemo(() => paginate(cats, 8, page), [cats, page]);

    const favorites = useSelector((state) => state.cats.favorites);
    const votes = useSelector((state) => state.cats.votes);

    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();
    const [voteCatImage] = useVoteCatImageMutation();

    useEffect(() => {
        const fetchVotes = async () => {
            setIsLoading(true); // Set loading state before fetching
            if (voteData) {
                const scores = {};
                voteData.forEach((vote) => {
                    scores[vote.image_id] = (scores[vote.image_id] || 0) + vote.value;
                });
                dispatch(updateVotes(scores));
            }
            setIsLoading(false); // Set loading state to false after fetching
        };

        fetchVotes();
    }, [voteData, dispatch]);


    useEffect(() => {
        // Trigger loading state when the page changes
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Set loading state to false after 500ms

        return () => clearTimeout(timeoutId);
    }, [page]);


    if (isLoading) return <Skeleton />;
    if (isError) return <div>Error: {isError.message}</div>;

    const handleVote = async (id, vote) => {
        await voteCatImage({ imageId: id, vote });
        dispatch(updateVotes({ [id]: (votes[id] || 0) + vote }));
    };

    const handleFavorite = async (id) => {
        if (favorites.includes(id)) {
            await removeFavorite(id);
            dispatch(updateFavorites(favorites.filter((favourite) => favourite !== id)));
        } else {
            await addFavorite(id);
            dispatch(updateFavorites([...favorites, id]));
        }
    };

    return (
        <div data-testid="cat-list" className="flex flex-col items-center space-y-6 p-6">
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedCats.map((cat) => (
                        <CatCard key={cat.id} cat={cat} favorites={favorites} votes={votes} handleFavorite={handleFavorite} handleVote={handleVote} />
                    ))}
                </div>
            </main>
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
    );
};

export default CatGallery;
