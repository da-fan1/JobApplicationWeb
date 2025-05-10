import React from 'react';

export interface PersonalInfoData {
  name: string;
  phone: string;
  email: string;
}

interface PersonalInfoFormProps {
  formData: PersonalInfoData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, onFormChange }) => {
  return (
    <div className="form-section">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={onFormChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onFormChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={onFormChange}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm; 