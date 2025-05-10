import React, { useState } from 'react';
import PersonalInfoForm, { type PersonalInfoData } from './components/PersonalInfoForm';
import ResumeUpload from './components/ResumeUpload';
import { submitApplication, type SubmissionResponse } from './services/api';
import './App.css';

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData>({
    name: '',
    phone: '',
    email: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof PersonalInfoData, string>>>({});

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string>('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof PersonalInfoData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof PersonalInfoData, string>> = {};
    let isValid = true;

    if (!personalInfo.name.trim()) {
      errors.name = 'Name cannot be empty';
      isValid = false;
    }
    if (!personalInfo.phone.trim()) {
      errors.phone = 'Phone cannot be empty';
      isValid = false;
    }
    if (!personalInfo.email.trim()) {
      errors.email = 'Email cannot be empty';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      errors.email = 'Email format is incorrect';
      isValid = false;
    }

    if (!resumeFile) {
      setFileError('Please upload a resume file');
      isValid = false;
    } else {
      setFileError(null);
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('idle');
    setSubmissionMessage('');

    if (!validateForm()) {
      return;
    }

    if (!resumeFile) {
      setFileError('Please upload a resume file.');
      return;
    }

    setSubmissionStatus('submitting');

    const formData = new FormData();
    formData.append('name', personalInfo.name);
    formData.append('phone', personalInfo.phone);
    formData.append('email', personalInfo.email);
    formData.append('resume', resumeFile, resumeFile.name);

    const response: SubmissionResponse = await submitApplication(formData);

    if (response.success) {
      setSubmissionStatus('success');
      setSubmissionMessage(response.message || 'Application submitted successfully!');
      setPersonalInfo({ name: '', phone: '', email: '' });
      setResumeFile(null);
      setFileError(null);
      setFormErrors({});
    } else {
      setSubmissionStatus('error');
      setSubmissionMessage(response.message || 'Submission failed, please try again later.');
    }
  };

  return (
    <div className="app-container">
      <h1>Job Application</h1>
      <form onSubmit={handleSubmit} noValidate>
        <PersonalInfoForm
          formData={personalInfo}
          onFormChange={handleFormChange}
        />
        {formErrors.name && <p className="error-message form-error">{formErrors.name}</p>}
        {formErrors.phone && <p className="error-message form-error">{formErrors.phone}</p>}
        {formErrors.email && <p className="error-message form-error">{formErrors.email}</p>}

        <ResumeUpload
          selectedFile={resumeFile}
          onFileSelect={setResumeFile}
          fileError={fileError}
          setFileError={setFileError}
        />

        <button type="submit" disabled={submissionStatus === 'submitting'} className="submit-button">
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>

      {submissionStatus === 'success' && (
        <div className="submission-feedback success">
          <p>{submissionMessage}</p>
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="submission-feedback error">
          <p>{submissionMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App; 