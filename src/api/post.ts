import { apiClient } from "./axiosInstance";
import {
  PostRequest,
  PostResponse,
  PostListResponse,
  Category,
  Tag,
  SearchParams,
  Post,
} from "../types/post";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// 이미지 업로드를 위한 presigned URL 생성
const getPresignedUrl = async (fileName: string) => {
  const response = await apiClient.get(`${API_BASE_URL}/upload/presigned-url`, {
    params: { fileName },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// 이미지 업로드
const uploadImage = async (file: File) => {
  const presignedUrl = await getPresignedUrl(file.name);
  await apiClient.put(presignedUrl.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return presignedUrl.key;
};

export const postApi = {
  // 글 CRUD
  getPosts: async (params: SearchParams): Promise<PostListResponse> => {
    return apiClient.get<PostListResponse>("/posts", { params });
  },

  getPostById: async (id: string): Promise<PostResponse> => {
    return apiClient.get<PostResponse>(`/posts/${id}`);
  },

  createPost: async (post: Omit<Post, "id">): Promise<PostResponse> => {
    return apiClient.post<PostResponse>("/posts", post);
  },

  updatePost: async (
    id: string,
    post: Partial<Post>
  ): Promise<PostResponse> => {
    return apiClient.put<PostResponse>(`/posts/${id}`, post);
  },

  deletePost: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/posts/${id}`);
  },

  // 임시 저장
  saveDraft: async (postData: Partial<PostRequest>) => {
    const response = await apiClient.post<PostResponse>(
      `${API_BASE_URL}/posts/draft`,
      { ...postData, isDraft: true },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  // 이미지 업로드
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post<{ url: string }>("/posts/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // 카테고리
  getCategories: async () => {
    const response = await apiClient.get<Category[]>(
      `${API_BASE_URL}/categories`
    );
    return response.data;
  },

  // 태그
  getTags: async () => {
    const response = await apiClient.get<Tag[]>(`${API_BASE_URL}/tags`);
    return response.data;
  },

  // 좋아요
  likePost: async (id: string): Promise<PostResponse> => {
    return apiClient.post<PostResponse>(`/posts/${id}/like`);
  },

  // 조회수 증가
  incrementViewCount: async (id: string): Promise<void> => {
    return apiClient.post<void>(`/posts/${id}/view`);
  },
};
