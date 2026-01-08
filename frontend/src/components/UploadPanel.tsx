import { ChangeEvent } from "react";

type UploadPanelProps = {
  imageFile: File | null;
  previewUrl: string | null;
  onSelectImage: (file: File) => void;
};

const UploadPanel = ({ imageFile, previewUrl, onSelectImage }: UploadPanelProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelectImage(file);
    }
  };

  return (
    <div className="card">
      <div className="step-label">Step 01 · Upload</div>
      <h3 className="section-title">원본 이미지를 업로드하세요</h3>
      <p className="subtle">
        분석을 위해 이미지를 선택합니다. 결과 패널에는 모자이크만 보여줍니다.
      </p>
      <div className="upload-preview">
        {previewUrl ? <img src={previewUrl} alt={imageFile?.name ?? "preview"} /> : <span>Drop or select an image</span>}
      </div>
      <div style={{ marginTop: "14px" }}>
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>
    </div>
  );
};

export default UploadPanel;
