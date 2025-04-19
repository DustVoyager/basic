import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import styles from "./Editor.module.css";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  onImageUpload,
}) => {
  const quillRef = useRef<any>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: onImageUpload
          ? {
              image: () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                  const file = input.files?.[0];
                  if (file) {
                    try {
                      const imageUrl = await onImageUpload(file);
                      const quill = quillRef.current?.getEditor();
                      const range = quill?.getSelection();
                      if (range) {
                        quill.insertEmbed(range.index, "image", imageUrl);
                      }
                    } catch (error) {
                      console.error("이미지 업로드 실패:", error);
                    }
                  }
                };
              },
            }
          : undefined,
      },
    }),
    [onImageUpload]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "align",
    "link",
    "image",
  ];

  return (
    <div className={styles.editorContainer}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;
