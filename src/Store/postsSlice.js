import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: 'idle'
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePostStart: (state) => {
      state.status = 'loading';
    },
    deletePostSuccess: (state) => {
      state.status = 'idle';
    },
    deletePostFailure: (state) => {
      state.status = 'error';
    },
    // Aggiungiamo un action per aggiornare un post
    updatePostSuccess: (state, action) => {
      state.status = 'idle';

      // Trova l'indice del post da aggiornare nel tuo array di posts
      const postIndex = state.posts.findIndex(post => post.id === action.payload.id);

      // Se l'indice è valido, aggiorna il post
      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getpostsByPostId.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(postNewpost.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // Chiamiamo l'azione personalizzata per l'aggiornamento del post
        postsSlice.caseReducers.updatePostSuccess(state, action);
      });
  }
});

export const { deletePostStart, deletePostSuccess, deletePostFailure, updatePostSuccess } = postsSlice.actions;

export const getpostById = createAsyncThunk('postById/get', async (ids) => {
  console.log(ids);
  const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${ids.post}/posts/${ids.post}`, {});
  const data = await res.json();
  return data;
});

export const getpostsByPostId = createAsyncThunk('postsByPostId/get', async (id) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${id}/posts`, {});
  const data = await res.json();
  return data;
});

export const postNewpost = createAsyncThunk('comment/post', async (datas) => {
  console.log(datas);
  const postRes = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${datas.id.id}/newComment`, {
    method: "POST",
    body: JSON.stringify(datas.payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const res = await postRes.json();
  return res;
});

export const deletePost = createAsyncThunk('comment/delete', async (comment) => {
  console.log(comment);
  const del = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${comment.postId}/deleteComment/${comment.comment._id}`, {
    method: "DELETE"
  });
  const res = await del.json();
  return res;
});

export const updatePost = createAsyncThunk('post/update', async (updatedPost) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${updatedPost.id}`, {
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

export default postsSlice.reducer;
