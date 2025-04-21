import React, { useState } from "react";
import S3FileUpload from "../components/S3FileUpload";
import { UploadResponse } from "../types/s3";

const FileUploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (response: UploadResponse) => {
    setUploadedFiles((prev) => [...prev, response]);
    setError(null);
  };

  const handleUploadError = (error: Error) => {
    setError(error.message);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">파일 업로드</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-8">
        <S3FileUpload
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          accept="image/*"
          maxSize={5 * 1024 * 1024} // 5MB
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">업로드된 파일</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="border rounded-lg p-4">
                <img
                  src={file.url}
                  alt={`업로드된 이미지 ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <p className="text-sm text-gray-600 truncate">
                  파일명: {file.key.split("-")[1]}
                </p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  원본 보기
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
