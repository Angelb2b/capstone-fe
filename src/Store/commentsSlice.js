import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Azione asincrona per ottenere i commenti di un post
export const getCommentsByPostId = createAsyncThunk(
  "comments/getCommentsByPostId",
  async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/comments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }
  }
);

// Azione asincrona per creare un nuovo commento
export const postNewComment = createAsyncThunk(
  "comments/postNewComment",
  async ({ postId, payload }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/newComment`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error creating comment: ${error.message}`);
    }
  }
);

// Azione asincrona per eliminare un commento
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ postId, commentId }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/${postId}/deleteComment/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }
);

const initialState = {
  comments: [],
  status: "idle",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByPostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postNewComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postNewComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postNewComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
