import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store as setupStore } from '../app/store';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { catApi } from '../api/catApi';
import CatGallery from '../components/CatGallery';

describe('CatGallery', () => {
    let store;

    beforeEach(() => {
        // Initialize the Redux store before each test
        console.log(setupStore); // Check if setupStore is a function
        store = setupStore(); // Calling the function to get store instance
    });

    test('renders CatGallery with images', async () => {
        render(
            <Provider store={store}>
                <ApiProvider api={catApi}>
                    <CatGallery />
                </ApiProvider>
            </Provider>
        );

        // Adjust expectations based on your actual component behavior
        expect(await screen.findByText(/Score:/i)).toBeInTheDocument();
    });
});
