import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const endpoint = `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/`
const endpointInternal = `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/internalUpload`

const initialState = {
    posts: [],
    status: 'idle',
    singlePost: {},
    searchStatus: 'idle'
}

export const getBlogPosts = createAsyncThunk('blogPosts/get', async () => {
    const getRes = await fetch(endpoint, {})
    const res = await getRes.json()
    return res
});

export const postBlogPosts = createAsyncThunk('blogPosts/post', async (postPayload) => {
    const data = new FormData();
    data.append('category', postPayload.category)
    data.append('title', postPayload.title)
    data.append('cover', postPayload.cover)
    data.append('readTimeValue', postPayload.readTime.value)
    data.append('readTimeUnit', postPayload.readTime.unit)
    data.append('author', postPayload.author)
    data.append('content', postPayload.content)

    const postRes = await fetch(endpointInternal, {
        method: "POST",
        body: data,
        headers: {
        }
    });
    const res = await postRes.json();

    return res;
});

export const blogPostById = createAsyncThunk('blogPosts/getById', async (id) => {
    try {
        const res = await fetch((endpoint + id), {})
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
});

export const updateBlogPost = createAsyncThunk('blogPosts/update', async (updatedPost) => {
    const response = await fetch(endpoint + updatedPost._id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Error updating post');
    }
});

export const searchBlogPost = createAsyncThunk('searchBlogPost/get', async (payload) => {
    const res = await fetch(`${endpoint}title?postTitle=${payload}`, {})
    const data = await res.json()
    return data
});

export const deletePost = createAsyncThunk('blogPosts/delete', async (postId) => {
    const response = await fetch(endpoint + postId, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error deleting post');
    }
  });

const blogPostsSlice = createSlice({
    name: 'blogPosts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogPosts.fulfilled, (state, action) => {
                state.posts = action.payload.blogPosts;
                state.status = 'idle';
                state.searchStatus = 'idle';
            })
            .addCase(getBlogPosts.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getBlogPosts.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(postBlogPosts.fulfilled, (state, action) => {
                state.status = 'idle';
                // Aggiungi il nuovo post all'inizio dell'array
                state.posts.unshift(action.payload);
            })
            .addCase(blogPostById.fulfilled, (state, action) => {
                state.singlePost = action.payload;
                state.status = 'idle';
            })
            .addCase(blogPostById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(blogPostById.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(updateBlogPost.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(updateBlogPost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateBlogPost.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(deletePost.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'error';
            })
            .addCase(searchBlogPost.fulfilled, (state, action) => {
                if (action.payload.statusCode === 404) {
                    state.posts = [];
                    state.searchStatus = '404';
                }
                if (action.payload.statusCode === 200) {
                    state.posts = action.payload.postByTitle;
                    state.searchStatus = 'idle';
                }
            })
            .addCase(searchBlogPost.pending, (state, action) => {
                state.searchStatus = 'loading';
            })
            .addCase(searchBlogPost.rejected, (state, action) => {
                state.searchStatus = 'error';
            });
    }
});

export default blogPostsSlice.reducer;
