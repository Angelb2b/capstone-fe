import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: 'idle'
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePostStart: (state) => {
      state.status = 'loading'
    },
    deletePostSuccess: (state) => {
      state.status = 'idle'
    },
    deletePostFailure: (state) => {
      state.status = 'error'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getpostsByPostId.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(postNewpost.fulfilled, (state, action) => {
        state.status = 'idle'
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  }
})

export const { deletePostStart, deletePostSuccess, deletePostFailure } = postsSlice.actions;

export default postsSlice.reducer

export const getpostById = createAsyncThunk('postById/get', async (ids) => {
  console.log(ids)
  const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${ids.post}/posts/${ids.post}`, {})
  const data = await res.json()
  return data
})

export const getpostsByPostId = createAsyncThunk('postsByPostId/get', async (id) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${id}/posts`, {})
  const data = await res.json()
  return data
})

export const postNewpost = createAsyncThunk('comment/post', async (datas) => {
  console.log(datas)
  const postRes = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${datas.id.id}/newComment`, {
    method: "POST",
    body: JSON.stringify(datas.payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const res = await postRes.json()
  return res
})

export const deletePost = createAsyncThunk('comment/delete', async (comment) => {
  console.log(comment)
  const del = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${comment.postId}/deleteComment/${comment.comment._id}`, {
    method: "DELETE"
  });
  const res = await del.json()
  return res
})
