import axios from "axios";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "API 요청 중 오류가 발생했습니다.";

    switch (status) {
      case 401:
        return new ApiError(401, "로그인이 필요합니다.");
      case 403:
        return new ApiError(403, "접근 권한이 없습니다.");
      case 404:
        return new ApiError(404, "요청한 리소스를 찾을 수 없습니다.");
      case 409:
        return new ApiError(409, "이미 존재하는 데이터입니다.");
      case 422:
        return new ApiError(422, "입력 데이터가 올바르지 않습니다.");
      case 429:
        return new ApiError(
          429,
          "요청이 너무 많습니다. 잠시 후 다시 시도해주세요."
        );
      case 500:
        return new ApiError(500, "서버 오류가 발생했습니다.");
      default:
        return new ApiError(status || 500, message);
    }
  }
  return new ApiError(500, "알 수 없는 오류가 발생했습니다.");
};
