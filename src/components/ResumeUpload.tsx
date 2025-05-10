import React, { useState, useCallback } from 'react';

interface ResumeUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  fileError: string | null;
  setFileError: (error: string | null) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ selectedFile, onFileSelect, fileError, setFileError }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        setFileError('Please upload a PDF file.');
        onFileSelect(null);
      }
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    setFileError(null);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        setFileError('Please upload a PDF file.');
        onFileSelect(null);
      }
    }
  }, [onFileSelect, setFileError]);

  return (
    <div className="form-section">
      <h2>Upload Resume (PDF)</h2>
      <div
        className={`upload-box ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('resumeInput')?.click()}
      >
        <input
          type="file"
          id="resumeInput"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>
            Drag & drop your resume here, or <span>Browse</span>
          </p>
        )}
      </div>
      {fileError && <p className="error-message">{fileError}</p>}
    </div>
  );
};

export default ResumeUpload; 