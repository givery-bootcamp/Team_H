import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hello } from '../models';
import { PostList,Post } from '../models';

const API_ENDPOINT_PATH =
  import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});

export const getPostList = createAsyncThunk<PostList>('getPostList', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/posts`);
  return await response.json();
});

export const getPostDetail = createAsyncThunk<Post,string>('getPostDetail',async( postId : string ) => {
  const response = await fetch(`${API_ENDPOINT_PATH}/posts/${postId}`);
  return await response.json();
}) 