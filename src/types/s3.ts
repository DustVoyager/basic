export interface S3Config {
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface UploadResponse {
  url: string;
  key: string;
}

export interface FileUploadProps {
  onUploadComplete: (response: UploadResponse) => void;
  onUploadError: (error: Error) => void;
  accept?: string;
  maxSize?: number; // bytes
  multiple?: boolean;
}
