import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/authors`;

export const getAuthors = createAsyncThunk('authors/get', async (_, { rejectWithValue }) => {
  const token = JSON.parse(localStorage.getItem('userLoggedIn'));
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: token
      }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const postAuthors = createAsyncThunk('authors/post', async (postPayload, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      for (let key in postPayload) {
        formData.append(key, postPayload[key]);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
});


export const getAuthorById = createAsyncThunk('authorById/get', async (id, { rejectWithValue }) => {
  const token = JSON.parse(localStorage.getItem('userLoggedIn'));
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      headers: {
        Authorization: token
      }
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const authorSlice = createSlice({
  name: 'authors',
  initialState: {
    authors: [],
    status: 'idle',
    registerStatus: {},
    singleAuthor: {},
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authors = action.payload.authors;
      })
      .addCase(getAuthors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postAuthors.fulfilled, (state, action) => {
        state.registerStatus = action.payload;
      })
      .addCase(getAuthorById.fulfilled, (state, action) => {
        state.singleAuthor = action.payload;
        state.status = 'succeeded';
      });
  }
});

export default authorSlice.reducer;
