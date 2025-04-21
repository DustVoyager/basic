import React, { useRef, useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FileUploadProps } from "../types/s3";

const S3FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  accept = "*",
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // S3 클라이언트 설정
  const s3Client = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
  });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 파일 크기 체크
    if (file.size > maxSize) {
      onUploadError(
        new Error(
          `파일 크기는 ${maxSize / 1024 / 1024}MB를 초과할 수 없습니다.`
        )
      );
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // 파일명에 타임스탬프 추가
      const timestamp = new Date().getTime();
      const key = `${timestamp}-${file.name}`;

      // presigned URL 생성
      const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: key,
        ContentType: file.type,
      });

      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      // 파일 업로드
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        throw new Error("파일 업로드 실패");
      }

      // 업로드 완료 후 URL 반환
      const fileUrl = `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${
        import.meta.env.VITE_AWS_REGION
      }.amazonaws.com/${key}`;

      onUploadComplete({
        url: fileUrl,
        key: key,
      });
    } catch (error) {
      onUploadError(
        error instanceof Error
          ? error
          : new Error("알 수 없는 오류가 발생했습니다.")
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        multiple={multiple}
        className="hidden"
        disabled={isUploading}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className={`px-4 py-2 rounded-lg ${
          isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {isUploading ? "업로드 중..." : "파일 선택"}
      </button>

      {isUploading && (
        <div className="w-full max-w-xs">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default S3FileUpload;
