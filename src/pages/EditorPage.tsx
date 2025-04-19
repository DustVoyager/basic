import React, { useState, useEffect, useRef } from "react";
import Editor from "../components/Editor";
import { usePostStore } from "../stores/postStore";
import styles from "./EditorPage.module.css";

const EditorPage: React.FC = () => {
  const { createPost, saveDraft, uploadImage, isLoading, error } =
    usePostStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState(30000);
  const autoSaveTimerRef = useRef<number | null>(null);
  const lastSavedContent = useRef(content);
  const lastSavedTitle = useRef(title);
  const contentChangedRef = useRef(false);
  const titleChangedRef = useRef(false);

  useEffect(() => {
    if (content !== lastSavedContent.current) {
      contentChangedRef.current = true;
    }
    if (title !== lastSavedTitle.current) {
      titleChangedRef.current = true;
    }

    if (contentChangedRef.current || titleChangedRef.current) {
      if (autoSaveTimerRef.current) {
        window.clearTimeout(autoSaveTimerRef.current);
      }

      autoSaveTimerRef.current = window.setTimeout(() => {
        handleAutoSave();
      }, autoSaveInterval);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        window.clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [content, title, autoSaveInterval]);

  const handleAutoSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);
      await saveDraft({
        title,
        content,
        isPublic,
      });

      lastSavedContent.current = content;
      lastSavedTitle.current = title;

      contentChangedRef.current = false;
      titleChangedRef.current = false;
    } catch (error) {
      console.error("자동 저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    try {
      setIsSaving(true);
      const newPost = await createPost({
        title,
        content,
        isPublic,
      });

      setSavedPosts((prev) => [...prev, newPost]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("저장 실패:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">에디터</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error.message}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full p-2 border rounded-lg mb-4"
          disabled={isLoading}
        />

        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              disabled={isLoading}
            />
            공개
          </label>
        </div>

        <Editor
          value={content}
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </div>

      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isLoading ? "저장 중..." : "저장하기"}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">미리보기</h2>
        <div
          className="prose max-w-none p-4 border rounded-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {showSavedPosts && (
        <div className="saved-posts">
          <h3>저장된 글 목록</h3>
          <ul>
            {savedPosts.map((post) => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.content.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditorPage;
