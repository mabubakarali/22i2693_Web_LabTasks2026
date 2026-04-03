import React, { useState, useEffect } from 'react';

// --- VALIDATION HELPERS ---
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Mock temp domain check
  const tempDomains = ['tempmail.com', '10minutemail.com'];
  const domain = email.split('@')[1];
  return re.test(email) && !tempDomains.includes(domain);
};

const validatePassword = (pass) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/;
  return re.test(pass);
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

// --- MAIN COMPONENT ---
const App = () => {
  // 1. STATE MANAGEMENT
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '', lastName: '', email: '', dob: '', photo: null,
    // Step 2
    phone: '', address1: '', address2: '', city: '', stateRegion: '', postalCode: '', country: '',
    // Step 3
    profession: '', customProfession: '', travelExp: 0, languages: [], linkedIn: '', website: '',
    // Step 4
    username: '', password: '', confirmPassword: '',
    notifications: { flight: false, visa: false, promo: false },
    terms: false, privacy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 2. LOCAL STORAGE PERSISTENCE
  useEffect(() => {
    const savedData = localStorage.getItem('travelerRegistration');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('travelerRegistration', JSON.stringify(formData));
  }, [formData]);

  const clearForm = () => {
    if (window.confirm("Are you sure you want to clear all progress?")) {
      localStorage.removeItem('travelerRegistration');
      window.location.reload();
    }
  };

  // 3. HANDLERS
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      if (['flight', 'visa', 'promo'].includes(name)) {
        setFormData(prev => ({
          ...prev, notifications: { ...prev.notifications, [name]: checked }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'file') {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'File exceeds 5MB limit' }));
      } else {
        setFormData(prev => ({ ...prev, photo: file ? file.name : null }));
        setErrors(prev => ({ ...prev, photo: null }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for field on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // 4. STEP VALIDATION LOGIC
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (formData.firstName.length < 2 || /[^a-zA-Z\s]/.test(formData.firstName)) newErrors.firstName = 'Invalid First Name';
      if (formData.lastName.length < 2 || /[^a-zA-Z\s]/.test(formData.lastName)) newErrors.lastName = 'Invalid Last Name';
      if (!validateEmail(formData.email)) newErrors.email = 'Valid email required (no temp domains)';
      if (!formData.dob || calculateAge(formData.dob) < 18) newErrors.dob = 'Must be at least 18 years old';
      if (!formData.photo) newErrors.photo = 'Passport photo required';
    }
    
    if (step === 2) {
      if (!formData.phone) newErrors.phone = 'Phone number required';
      if (formData.address1.length < 5) newErrors.address1 = 'Address line 1 required (min 5 chars)';
      if (!formData.city || /\d/.test(formData.city)) newErrors.city = 'Valid city required';
      if (!formData.country) newErrors.country = 'Country is required';
    }

    if (step === 3) {
      if (!formData.profession) newErrors.profession = 'Profession is required';
      if (formData.travelExp < 0) newErrors.travelExp = 'Cannot be negative';
      const maxExp = formData.dob ? (new Date().getFullYear() - new Date(formData.dob).getFullYear() - 18) : 0;
      if (formData.travelExp > maxExp) newErrors.travelExp = `Max experience allowed is ${Math.max(0, maxExp)}`;
      // Mock language validation for simplicity
    }

    if (step === 4) {
      if (formData.username.length < 5 || !/^[a-zA-Z0-9_]+$/.test(formData.username)) newErrors.username = 'Invalid username format';
      if (!validatePassword(formData.password)) newErrors.password = 'Password does not meet complexity requirements';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.terms) newErrors.terms = 'You must accept the terms';
      if (!formData.privacy) newErrors.privacy = 'You must consent to data privacy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        localStorage.removeItem('travelerRegistration'); // Clear on success
      }, 1500);
    }
  };

  // 5. PROGRESS BAR LOGIC
  const calculateProgress = () => {
    const totalSteps = 4;
    const percentage = ((step - 1) / totalSteps) * 100;
    
    // Add bonus for filled fields in current step to make it dynamic
    const fieldsFilled = Object.values(formData).filter(v => v !== '' && v !== false).length;
    const dynamicProgress = Math.min(100, percentage + (fieldsFilled * 2)); 

    let color = 'bg-red-500';
    if (dynamicProgress > 25) color = 'bg-yellow-500';
    if (dynamicProgress > 50) color = 'bg-blue-500';
    if (dynamicProgress > 75) color = 'bg-green-500';

    return { width: `${dynamicProgress}%`, color };
  };

  const progressStyle = calculateProgress();

  if (isSuccess) {
    return (
      <div style={styles.container}>
        <h2 style={{ color: 'green' }}>Registration Successful!</h2>
        <p>Your international travel account has been created.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Traveler Onboarding Journey</h2>
        <button onClick={clearForm} style={styles.clearBtn}>Clear Form</button>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div 
          style={{ 
            height: '10px', 
            width: progressStyle.width, 
            backgroundColor: progressStyle.color.replace('bg-', '').replace('-500', ''), // Simplified color extraction for inline styles
            background: progressStyle.color === 'bg-red-500' ? '#ef4444' : progressStyle.color === 'bg-yellow-500' ? '#eab308' : progressStyle.color === 'bg-blue-500' ? '#3b82f6' : '#22c55e',
            transition: 'width 0.3s ease, background-color 0.3s ease' 
          }} 
        />
      </div>
      <p style={styles.stepIndicator}>Step {step} of 4</p>

      {/* FORM STEPS */}
      <div style={styles.formCard}>
        {step === 1 && (
          <div>
            <h3>Step 1: Traveler Identity</h3>
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
            <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <InputField label="Date of Birth" type="date" name="dob" value={formData.dob} onChange={handleChange} error={errors.dob} />
            <InputField label="Passport Photo" type="file" name="photo" onChange={handleChange} error={errors.photo} />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Step 2: Travel Contact & Origin</h3>
            <InputField label="Emergency Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
            <InputField label="Address Line 1" name="address1" value={formData.address1} onChange={handleChange} error={errors.address1} />
            <InputField label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
            
            <div style={styles.inputGroup}>
              <label>Country</label>
              <select name="country" value={formData.country} onChange={handleChange} style={styles.input}>
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="PK">Pakistan</option>
              </select>
              {errors.country && <span style={styles.errorText}>{errors.country}</span>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Step 3: Travel Background</h3>
            <div style={styles.inputGroup}>
              <label>Profession</label>
              <select name="profession" value={formData.profession} onChange={handleChange} style={styles.input}>
                <option value="">Select...</option>
                <option value="engineer">Engineer</option>
                <option value="doctor">Doctor</option>
                <option value="other">Other</option>
              </select>
              {errors.profession && <span style={styles.errorText}>{errors.profession}</span>}
            </div>
            {formData.profession === 'other' && (
              <InputField label="Specify Profession" name="customProfession" value={formData.customProfession} onChange={handleChange} />
            )}
            <InputField label="International Travel Exp (Years)" type="number" name="travelExp" value={formData.travelExp} onChange={handleChange} error={errors.travelExp} />
            <InputField label="LinkedIn URL (Optional)" type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} />
          </div>
        )}

        {step === 4 && (
          <div>
            <h3>Step 4: Account Setup</h3>
            <InputField label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
            <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
            
            <div style={styles.checkboxGroup}>
              <label><input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} /> Accept Travel Terms</label>
              {errors.terms && <span style={styles.errorText}>{errors.terms}</span>}
              
              <label><input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} /> Data Privacy Consent</label>
              {errors.privacy && <span style={styles.errorText}>{errors.privacy}</span>}
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div style={styles.buttonContainer}>
          {step > 1 && <button onClick={prevStep} style={styles.secondaryBtn}>Previous</button>}
          {step < 4 ? (
            <button onClick={nextStep} style={styles.primaryBtn}>Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} style={styles.submitBtn}>
              {isSubmitting ? 'Processing...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE INPUT COMPONENT ---
const InputField = ({ label, type = 'text', name, value, onChange, error }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    <input 
      type={type} 
      name={name} 
      value={type !== 'file' ? value : undefined} 
      onChange={onChange} 
      style={{ ...styles.input, borderColor: error ? 'red' : '#ccc' }} 
    />
    {error && <span style={styles.errorText}>{error}</span>}
  </div>
);

// --- STYLES (Inline for standard rendering) ---
const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  progressContainer: { width: '100%', backgroundColor: '#e5e7eb', borderRadius: '5px', overflow: 'hidden', margin: '10px 0' },
  stepIndicator: { textAlign: 'right', fontSize: '0.875rem', color: '#6b7280', margin: '0 0 20px 0' },
  formCard: { padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '5px', fontWeight: '500' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  errorText: { color: 'red', fontSize: '0.8rem', marginTop: '4px' },
  checkboxGroup: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
  buttonContainer: { display: 'flex', justifyContent: 'space-between', marginTop: '20px' },
  primaryBtn: { padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: 'auto' },
  secondaryBtn: { padding: '10px 20px', backgroundColor: '#9ca3af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  submitBtn: { padding: '10px 20px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: 'auto' },
  clearBtn: { padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }
};

export default App;