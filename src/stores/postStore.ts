import { create } from "zustand";
import { postApi } from "../api/post";
import {
  PostRequest,
  PostResponse,
  PostListResponse,
  Category,
  Tag,
  SearchParams,
} from "../types/post";
import { handleApiError } from "../utils/errorHandler";

interface PostState {
  posts: PostResponse[];
  categories: Category[];
  tags: Tag[];
  currentPost: PostResponse | null;
  isLoading: boolean;
  error: Error | null;
  total: number;
  page: number;
  limit: number;

  // 액션들
  createPost: (postData: PostRequest) => Promise<void>;
  updatePost: (id: number, postData: Partial<PostRequest>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  fetchPosts: (params: SearchParams) => Promise<void>;
  fetchPostById: (id: number) => Promise<void>;
  saveDraft: (postData: Partial<PostRequest>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;
  likePost: (id: number) => Promise<void>;
  incrementViewCount: (id: number) => Promise<void>;
}

// 임시 데이터
const TEMP_CATEGORIES = [
  { id: 1, name: "기술" },
  { id: 2, name: "일상" },
  { id: 3, name: "여행" },
];

const TEMP_TAGS = [
  { id: 1, name: "React", postCount: 0 },
  { id: 2, name: "TypeScript", postCount: 0 },
  { id: 3, name: "JavaScript", postCount: 0 },
  { id: 4, name: "CSS", postCount: 0 },
];

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  categories: TEMP_CATEGORIES,
  tags: TEMP_TAGS,
  currentPost: null,
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,

  createPost: async (postData) => {
    try {
      set({ isLoading: true, error: null });
      const newPost = await postApi.create(postData);
      set((state) => ({
        posts: [newPost, ...state.posts],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  updatePost: async (id, postData) => {
    try {
      set({ isLoading: true, error: null });
      const updatedPost = await postApi.update(id, postData);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
        currentPost:
          state.currentPost?.id === id ? updatedPost : state.currentPost,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  deletePost: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await postApi.delete(id);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  fetchPosts: async (params) => {
    try {
      set({ isLoading: true, error: null });
      const response = await postApi.getList(params);
      set({
        posts: response.posts,
        total: response.total,
        page: response.page,
        limit: response.limit,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  fetchPostById: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const post = await postApi.getById(id);
      set({ currentPost: post, isLoading: false });
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  saveDraft: async (postData) => {
    try {
      set({ isLoading: true, error: null });
      const draft = await postApi.saveDraft(postData);
      set((state) => ({
        posts: [draft, ...state.posts],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  uploadImage: async (file) => {
    try {
      set({ isLoading: true, error: null });
      const imageUrl = await postApi.uploadImage(file);
      set({ isLoading: false });
      return imageUrl;
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
      throw error;
    }
  },

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      // API 호출 대신 임시 데이터 사용
      set({ categories: TEMP_CATEGORIES });
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTags: async () => {
    try {
      set({ isLoading: true, error: null });
      // API 호출 대신 임시 데이터 사용
      set({ tags: TEMP_TAGS });
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  likePost: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const updatedPost = await postApi.likePost(id);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
        currentPost:
          state.currentPost?.id === id ? updatedPost : state.currentPost,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: handleApiError(error),
        isLoading: false,
      });
    }
  },

  incrementViewCount: async (id) => {
    try {
      await postApi.incrementViewCount(id);
      set((state) => ({
        currentPost:
          state.currentPost?.id === id
            ? {
                ...state.currentPost,
                viewCount: state.currentPost.viewCount + 1,
              }
            : state.currentPost,
      }));
    } catch (error) {
      console.error("조회수 증가 실패:", error);
    }
  },
}));
