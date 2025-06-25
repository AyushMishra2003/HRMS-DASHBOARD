import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { XCircle } from 'lucide-react';
import {
  useDocAddMutation,
  useDocUpdateMutation,
  useGetEmployeedocQuery,
} from '../../../rtk/employeeDoc';

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
  const navigate = useNavigate();

  const { data: docData, isLoading: isFetching  , refetch} = useGetEmployeedocQuery({id});
  const [addDoc, { isLoading: isAdding }] = useDocAddMutation();
  const [updateDoc, { isLoading: isUpdating }] = useDocUpdateMutation();

  const [files, setFiles] = useState({});
  const [customFields, setCustomFields] = useState([{ label: '', file: null }]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (docData) {
      const existingDocs = docData;
      const prefill = {};
      defaultFields.forEach(field => {
        if (existingDocs[field.name]) {
          prefill[field.name] = existingDocs[field.name].secure_url;
        }
      });
      setFiles(prefill);
    }
  }, [docData]);

  const handleFileChange = (name, file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, PNG files are allowed');
      return;
    }

    if (file.size > 1024 * 1024) {
      alert('File must be under 1MB');
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
    if (!files.aadhaar) {
      alert('Aadhaar Card is required');
      return;
    }

    // Validate custom fields
    for (const custom of customFields) {
      if (custom.label && !custom.file) {
        alert(`Please upload file for "${custom.label}"`);
        return;
      }
      if (custom.file && !allowedTypes.includes(custom.file.type)) {
        alert(`Invalid file type in "${custom.label}"`);
        return;
      }
      if (custom.file && custom.file.size > 1024 * 1024) {
        alert(`File too large in "${custom.label}"`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('id', id);
    Object.keys(files).forEach(key => {
      if (files[key] instanceof File) {
        formData.append(key, files[key]);
      }
    });

    customFields.forEach((field, i) => {
      if (field.label && field.file) {
        formData.append(`customDocs[${i}][title]`, field.label);
        formData.append(`customDocs[${i}][file]`, field.file);
      }
    });

    try {
      if (docData) {
        const form = Object.fromEntries(formData.entries())
        console.log(form)
        await updateDoc({ id, formData }).unwrap();
        alert('Documents updated successfully!');
        refetch()
      } else {
        await addDoc({ id, formData }).unwrap();
          refetch()
        alert('Documents uploaded successfully!');
      }
    } catch (err) {
  alert(err.message ,'Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Other Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-x-8">
        {defaultFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>

            {/* If document already exists and not editing */}
            {files[field.name] && typeof files[field.name] === 'string' && !isEditMode ? (
              <div className="flex gap-2 items-center">
                <a
                  href={files[field.name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Document
                </a>
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="text-yellow-600 text-sm"
                >
                  Edit
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => handleFileChange(field.name, e.target.files[0])}
                className="block w-full border border-gray-300 px-3 py-2 rounded-md"
              />
            )}

            {files[field.name] instanceof File && (
              <p className="text-sm text-green-600 mt-1">{files[field.name].name}</p>
            )}
          </div>
        ))}

        {/* Custom Uploads */}
        <div className="mt-2 col-span-2">
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

        <div className="flex h-fit justify-between bg-gray-50 py-3 mt-4 px-2 border-t border-gray-200 gap-4 pt-4 col-span-2">
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
            disabled={isFetching || isAdding || isUpdating}
            className="bg-[#06425F] text-white px-6 py-2 rounded-md hover:bg-[#3b5a69] disabled:opacity-50"
          >
            {(isAdding || isUpdating) ? 'Uploading...' : 'Submit Documents'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherInfoForm;
