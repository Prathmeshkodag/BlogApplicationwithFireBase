import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";


export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const fetchBlogById = createAsyncThunk("blogs/fetchBlogById", async (blogId) => {
  const blogRef = doc(db, "blogs", blogId);
  const blogSnapshot = await getDoc(blogRef);
  
  if (blogSnapshot.exists()) {
    return { id: blogSnapshot.id, ...blogSnapshot.data() };
  } else {
    throw new Error("Blog not found");
  }
});

export const updateBlog = createAsyncThunk("blogs/updateBlog", async ({ id, updatedData }) => {
  const blogRef = doc(db, "blogs", id);
  await updateDoc(blogRef, updatedData);
  return { id, ...updatedData };
});

const blogSlice = createSlice({
  name: "blog",
  initialState: { 
    blogs: [], 
    currentBlog: JSON.parse(localStorage.getItem('currentBlog')) || null,   
    status: null, 
    error: null 
  },
  reducers: {
    addItem: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBlog = action.payload; 
        localStorage.setItem('currentBlog', JSON.stringify(action.payload)); 
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      });
  },
});

export const { addItem, updateItem } = blogSlice.actions;
export default blogSlice.reducer;
