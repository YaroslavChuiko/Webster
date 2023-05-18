import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GOOGLE_FONTS_API_URL } from '~/consts/fonts';

export const fetchFontList = createAsyncThunk('fontList/fetchFontListStatus', async (_, thunkAPI) => {
  try {
    const response = await fetch(
      `${GOOGLE_FONTS_API_URL}webfonts/v1/webfonts?key=${
        import.meta.env.VITE_GOOGLE_FONTS_API_KEY
      }&sort=alpha&subset=latin`,
    );
    const data = await response.json();
    return data.items;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

type FontListState = {
  fontList: [];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: FontListState = {
  fontList: [],
  loading: 'idle',
};

const fontListSlice = createSlice({
  name: 'fontList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFontList.fulfilled, (state, action) => {
        state.fontList = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchFontList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFontList.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export default fontListSlice.reducer;
