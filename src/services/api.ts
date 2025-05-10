export interface SubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const submitApplication = async (formData: FormData): Promise<SubmissionResponse> => {
  try {
    const file = formData.get('resume') as File;
    const base64File = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(file);
    });

    const requestData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      resume: {
        filename: file.name,
        contentType: file.type,
        data: base64File
      }
    };

    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: 'Submission failed, please try again later.' 
      }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { 
      success: true, 
      message: result.message || 'Application submitted successfully!', 
      data: result.data 
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unknown error occurred.' 
    };
  }
}; 