import { configureStore } from "@reduxjs/toolkit";
import blogReducer from '../redux/blogSlice/blogSlice'
const store=configureStore({
    reducer:{
      blog:blogReducer,
    }
});


export default store;