import { createAsyncThunk } from "@reduxjs/toolkit";

import { Hello } from "../models";
import { PostList, Post, User, SignOutResponse } from "../models";

const API_ENDPOINT_PATH = import.meta.env.VITE_API_ENDPOINT_PATH ?? "";

export const getHello = createAsyncThunk<Hello>("getHello", async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});

export const getPostList = createAsyncThunk<PostList>(
  "getPostList",
  async () => {
    const response = await fetch(`${API_ENDPOINT_PATH}/posts`);
    return await response.json();
  }
);

export const getPostDetail = createAsyncThunk<Post, string>(
  "getPostDetail",
  async (postId: string) => {
    const response = await fetch(`${API_ENDPOINT_PATH}/posts/${postId}`);
    return await response.json();
  }
);

export const signin = createAsyncThunk<
  User,
  { username: string; password: string }
>("signin", async ({ username, password }) => {
  const response = await fetch(`${API_ENDPOINT_PATH}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "username=" + username + "&password=" + password,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("サインインに失敗しました。");
  }

  const data = await response.json();

  return data;
});

export const signout = createAsyncThunk<SignOutResponse>(
  "signout",
  async () => {
    const response = await fetch(`${API_ENDPOINT_PATH}/signout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("サインアウトに失敗しました。");
    }
    const data = await response.json();

    return data;
  }
);

export const createPost = createAsyncThunk<
  Post,
  { title: string, contents: string }
  >("createPost", async ({ title, contents }) => {
    const body = {
      title: title,
      body: contents,
    };
  const response = await fetch(`${API_ENDPOINT_PATH}/posts`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      title: title,
      body: contents
    }),
    credentials: "include",
  });

  console.log("title=" + title + "&body=" + contents)
  return await response.json();
});

export const getSearchPostList = createAsyncThunk<PostList, string>(
  "getSearchPost",
  async (query) => {
    const response = await fetch(`${API_ENDPOINT_PATH}/search?q=${query}`);
    return await response.json();
  }
);
