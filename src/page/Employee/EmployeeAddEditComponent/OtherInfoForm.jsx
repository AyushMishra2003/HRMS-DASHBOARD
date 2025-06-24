import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useEmployeeOtherDetailMutation } from '../../../rtk/employeeworck';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2, } from 'react-icons/fi';
import { XCircle } from 'lucide-react';
const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

const defaultFields = [
  { label: 'Aadhaar Card', name: 'aadhaar', required: true },
  { label: 'PAN Card', name: 'pan' },
  { label: 'Bank Passbook', name: 'passbook' },
  { label: 'High School Marksheet', name: 'highSchool' },
  { label: 'Graduation Marksheet', name: 'graduation' },
  { label: 'Salary Slips (if not fresher)', name: 'salarySlip' },
];

const OtherInfoForm = () => {
  const { id } = useParams();
//   const [employeeOtherDetail, { isLoading }] = useEmployeeOtherDetailMutation();
const employeeOtherDetail = []
const navigate = useNavigate()
const isLoading = false
  const [files, setFiles] = useState({});
  const [customFields, setCustomFields] = useState([{ label: '', file: null }]);

  const handleFileChange = (name, file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, JPG, PNG files are allowed');
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('File must be under 1MB');
      return;
    }

    setFiles(prev => ({ ...prev, [name]: file }));
  };

  const handleCustomFieldChange = (index, type, value) => {
    const updated = [...customFields];
    updated[index][type] = value;
    setCustomFields(updated);
  };

  const addCustomField = () => {
    setCustomFields(prev => [...prev, { label: '', file: null }]);
  };

  const removeCustomField = (index) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Aadhaar
    if (!files.aadhaar) {
      toast.error('Aadhaar Card is required');
      return;
    }

    // Validate custom fields
    for (const custom of customFields) {
      if (custom.label && !custom.file) {
        toast.error(`Please upload file for "${custom.label}"`);
        return;
      }

      if (custom.file && !allowedTypes.includes(custom.file.type)) {
        toast.error(`Invalid file type in "${custom.label}"`);
        return;
      }

      if (custom.file && custom.file.size > 1024 * 1024) {
        toast.error(`File too large in "${custom.label}"`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('id', id);
    Object.keys(files).forEach(key => {
      formData.append(key, files[key]);
    });

    customFields.forEach((field, i) => {
      if (field.label && field.file) {
        formData.append(`customDocs[${i}][title]`, field.label);
        formData.append(`customDocs[${i}][file]`, field.file);
      }
    });

    try {
      await employeeOtherDetail(formData).unwrap();
      toast.success('Documents uploaded successfully!');
    } catch (err) {
      toast.error('Upload failed. Please try again.');
    }
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Other Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-x-8">
        {defaultFields.map((field) => (
          <div key={field.name} >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(field.name, e.target.files[0])}
              className="block w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            {files[field.name] && (
              <p className="text-sm text-green-600 mt-1">{files[field.name].name}</p>
            )}
          </div>
        ))}

        {/* Custom Uploads */}
        <div className="mt-2">
          <h3 className="text-lg font-semibold mb-2">Other Uploads</h3>
          {customFields.map((field, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Document Title"
                value={field.label}
                onChange={(e) => handleCustomFieldChange(index, 'label', e.target.value)}
                className="w-1/3 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => handleCustomFieldChange(index, 'file', e.target.files[0])}
                className="w-1/2 border border-gray-300 px-2 py-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeCustomField(index)}
                className="text-red-500"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomField}
            className="flex items-center text-blue-600 mt-2"
          >
            <FiPlus className="mr-1" /> Add another
          </button>
        </div>

        <div className='flex h-fit justify-between bg-gray-50 py-3 mt-4 px-2 border-t border-gray-200 gap-4 pt-4'>
           <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center bg-gray-100 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300 transition"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#06425F] text-white px-6 py-2 rounded-md  hover:bg-[#3b5a69] disabled:opacity-50"
          >
            {isLoading ? 'Uploading...' : 'Submit Documents'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherInfoForm;
