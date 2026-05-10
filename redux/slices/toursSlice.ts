import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TourPackage, Destination } from '../../types';

interface ToursState {
  tours: TourPackage[];
  destinations: Destination[];
  filteredTours: TourPackage[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ToursState = {
  tours: [],
  destinations: [],
  filteredTours: [],
  isLoading: false,
  error: null,
};

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    fetchToursStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchToursSuccess: (state, action: PayloadAction<TourPackage[]>) => {
      state.tours = action.payload;
      state.filteredTours = action.payload;
      state.isLoading = false;
    },
    fetchToursFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    fetchDestinationsSuccess: (state, action: PayloadAction<Destination[]>) => {
      state.destinations = action.payload;
    },
    filterTours: (state, action: PayloadAction<{ category?: string; destination?: string; priceRange?: [number, number] }>) => {
      let filtered = state.tours;
      if (action.payload.category) {
        filtered = filtered.filter(tour => tour.category === action.payload.category);
      }
      if (action.payload.destination) {
        filtered = filtered.filter(tour => tour.destination === action.payload.destination);
      }
      if (action.payload.priceRange) {
        filtered = filtered.filter(tour => tour.price >= action.payload.priceRange![0] && tour.price <= action.payload.priceRange![1]);
      }
      state.filteredTours = filtered;
    },
  },
});

export const {
  fetchToursStart,
  fetchToursSuccess,
  fetchToursFailure,
  fetchDestinationsSuccess,
  filterTours,
} = toursSlice.actions;

export default toursSlice.reducer;