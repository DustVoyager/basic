import axios from "axios";
import {
  PostRequest,
  PostResponse,
  PostListResponse,
  Category,
  Tag,
  SearchParams,
} from "../types/post";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// 이미지 업로드를 위한 presigned URL 생성
const getPresignedUrl = async (fileName: string) => {
  const response = await axios.get(`${API_BASE_URL}/upload/presigned-url`, {
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
  await axios.put(presignedUrl.url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return presignedUrl.key;
};

export const postApi = {
  // 글 CRUD
  create: async (postData: PostRequest) => {
    const response = await axios.post<PostResponse>(
      `${API_BASE_URL}/posts`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  getList: async (params: SearchParams) => {
    const response = await axios.get<PostListResponse>(
      `${API_BASE_URL}/posts`,
      {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get<PostResponse>(
      `${API_BASE_URL}/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  update: async (id: number, postData: Partial<PostRequest>) => {
    const response = await axios.put<PostResponse>(
      `${API_BASE_URL}/posts/${id}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_BASE_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  // 임시 저장
  saveDraft: async (postData: Partial<PostRequest>) => {
    const response = await axios.post<PostResponse>(
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
  uploadImage: async (file: File) => {
    const imageKey = await uploadImage(file);
    return `${API_BASE_URL}/images/${imageKey}`;
  },

  // 카테고리
  getCategories: async () => {
    const response = await axios.get<Category[]>(`${API_BASE_URL}/categories`);
    return response.data;
  },

  // 태그
  getTags: async () => {
    const response = await axios.get<Tag[]>(`${API_BASE_URL}/tags`);
    return response.data;
  },

  // 좋아요
  likePost: async (id: number) => {
    const response = await axios.post<PostResponse>(
      `${API_BASE_URL}/posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  },

  // 조회수 증가
  incrementViewCount: async (id: number) => {
    await axios.post(
      `${API_BASE_URL}/posts/${id}/view`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },
};
