import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { postApi } from "../api/post";
import {
  PostRequest,
  PostResponse,
  PostListResponse,
  Category,
  Tag,
  SearchParams,
  Post,
} from "../types/post";
import { handleApiError } from "../utils/errorHandler";
import { ApiState, PaginationParams, PaginatedResponse } from "../types/store";

interface PostState extends ApiState<Post[]> {
  posts: PostResponse[];
  categories: Category[];
  tags: Tag[];
  currentPost: PostResponse | null;
  total: number;
  pagination: PaginationParams;

  // 액션들
  fetchPosts: () => Promise<void>;
  createPost: (post: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
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

export const usePostStore = create<PostState>()(
  devtools(
    (set, get) => ({
      posts: [],
      categories: TEMP_CATEGORIES,
      tags: TEMP_TAGS,
      currentPost: null,
      total: 0,
      pagination: {
        page: 1,
        limit: 10,
      },

      fetchPosts: async () => {
        try {
          set({ loading: true, error: null });
          const { page, limit } = get().pagination;
          const response = await postApi.getPosts({ page, limit });
          set({ data: response.data, loading: false });
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      createPost: async (post) => {
        try {
          set({ loading: true, error: null });
          await postApi.createPost(post);
          await get().fetchPosts();
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      updatePost: async (id, post) => {
        try {
          set({ loading: true, error: null });
          await postApi.updatePost(id, post);
          await get().fetchPosts();
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      deletePost: async (id) => {
        try {
          set({ loading: true, error: null });
          await postApi.deletePost(id);
          await get().fetchPosts();
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      fetchPostById: async (id) => {
        try {
          set({ loading: true, error: null });
          const post = await postApi.getById(id);
          set({ currentPost: post, loading: false });
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      saveDraft: async (postData) => {
        try {
          set({ loading: true, error: null });
          const draft = await postApi.saveDraft(postData);
          set((state) => ({
            posts: [draft, ...state.posts],
            loading: false,
          }));
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      uploadImage: async (file) => {
        try {
          set({ loading: true, error: null });
          const imageUrl = await postApi.uploadImage(file);
          set({ loading: false });
          return imageUrl;
        } catch (error) {
          set({ error: error as Error, loading: false });
          throw error;
        }
      },

      fetchCategories: async () => {
        try {
          set({ loading: true, error: null });
          // API 호출 대신 임시 데이터 사용
          set({ categories: TEMP_CATEGORIES });
        } catch (error) {
          set({ error: error as Error, loading: false });
        } finally {
          set({ loading: false });
        }
      },

      fetchTags: async () => {
        try {
          set({ loading: true, error: null });
          // API 호출 대신 임시 데이터 사용
          set({ tags: TEMP_TAGS });
        } catch (error) {
          set({ error: error as Error, loading: false });
        } finally {
          set({ loading: false });
        }
      },

      likePost: async (id) => {
        try {
          set({ loading: true, error: null });
          const updatedPost = await postApi.likePost(id);
          set((state) => ({
            posts: state.posts.map((post) =>
              post.id === id ? updatedPost : post
            ),
            currentPost:
              state.currentPost?.id === id ? updatedPost : state.currentPost,
            loading: false,
          }));
        } catch (error) {
          set({ error: error as Error, loading: false });
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
    }),
    { name: "postStore" }
  )
);
