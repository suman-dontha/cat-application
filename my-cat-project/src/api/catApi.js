import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE = 'https://api.thecatapi.com/v1';
const API_KEY = '0db431c6-efed-4071-8ff6-10c3bbf37e4a';

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Cats', 'Votes', 'Favourites'],
  endpoints: (builder) => ({
    // Fetch cat images
    getCatImages: builder.query({
      query: (limit = 96) => `images/?limit=${limit}`,
      providesTags: ['Cats'],
    }),
    // Upload a new cat image
    uploadCatImage: builder.mutation({
      query: (formData) => ({
        url: 'images/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Cats'],
    }),
    // Add to favourites
    addFavorite: builder.mutation({
      query: (imageId) => ({
        url: 'favourites',
        method: 'POST',
        body: { image_id: imageId },
      }),
      invalidatesTags: ['Favourites'],
    }),
    // Remove from favourites
    removeFavorite: builder.mutation({
      query: (favoriteId) => ({
        url: `favourites/${favoriteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favourites'],
    }),
    // Fetch favourites
    getFavorites: builder.query({
      query: () => 'favourites',
      providesTags: ['Favourites'],
    }),
    // Vote for a cat image
    voteCatImage: builder.mutation({
      query: (imageId, vote) => ({
        url: 'votes',
        method: 'POST',
        body: { image_id: imageId, value: vote },
      }),
      invalidatesTags: ['Votes'],
    }),
    // Get votes
    getVotes: builder.query({
      query: () => 'votes',
      providesTags: ['Votes'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useGetCatImagesQuery,
  useUploadCatImageMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
  useVoteCatImageMutation,
  useGetVotesQuery,
} = catApi;