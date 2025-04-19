export interface PostRequest {
  title: string;
  content: string;
  authorId?: string;
  category?: string;
  tags?: string[];
  isPublic?: boolean;
  thumbnail?: string;
  isDraft?: boolean;
}

export interface PostResponse extends PostRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Tag {
  id: number;
  name: string;
  postCount: number;
}

export interface PostListResponse {
  posts: PostResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchParams {
  keyword?: string;
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "updatedAt" | "viewCount" | "likeCount";
  order?: "asc" | "desc";
}
