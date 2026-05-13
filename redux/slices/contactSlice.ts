import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ContactFormData {
    fullName: string;
    email: string;
    phone: string;
    destination: string;
    travelDate: string;
    travelers: number;
    subject: string;
    message: string;
    preferredContactMethod: string;
}

interface ContactState {
    status: 'idle' | 'loading' | 'success' | 'error';
    errorMessage: string | null;
}

const initialState: ContactState = {
    status: 'idle',
    errorMessage: null,
};

export const submitContactForm = createAsyncThunk(
    'contact/submitForm',
    async (formData: ContactFormData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Failed to send inquiry.');
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'An error occurred.');
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        resetContactStatus: (state) => {
            state.status = 'idle';
            state.errorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.status = 'loading';
                state.errorMessage = null;
            })
            .addCase(submitContactForm.fulfilled, (state) => {
                state.status = 'success';
                state.errorMessage = null;
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                state.status = 'error';
                state.errorMessage = action.payload as string;
            });
    },
});

export const { resetContactStatus } = contactSlice.actions;
export default contactSlice.reducer;