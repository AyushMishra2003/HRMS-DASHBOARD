import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Edit2 } from 'lucide-react';
import { useGetOneEmployeeQuery } from '../../../rtk/employeeApi.js';

const PersonalInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetOneEmployeeQuery({ id });
  console.log(data)
  const [personalData, setPersonalData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    children: '',
    qualification: '',
    experience: '',
    // Contact Info
    officialEmail: '',
    personalEmail: '',
    phoneNumber: '',
    alternatePhone: '',
    verified: false,
    // Address Info
    currentAddress: '',
    permanentAddress: '',
    country: '',
    state: '',
    city: '',
    // Emergency Contact
    emergencyContact: '',
    emergencyContactName: '',
    emergencyContactRelation: ''
  });

  useEffect(() => {
    if (data) {
      setPersonalData({
        name: data?.name || '',
        dateOfBirth: data?.dateOfBirth || '15/06/2002', // keeping your default
        gender: data?.gender || '',
        bloodGroup: data?.bloodGroup || '',
        maritalStatus: data?.maritalStatus || '',
        children: data?.children || '',
        qualification: data?.qualification || '',
        experience: data?.experience || '',
        // Contact Info
        officialEmail: data?.workEmail || '',
        personalEmail: data?.email || '',
        phoneNumber: data?.mobile || '',
        alternatePhone: data?.alternatePhone || '',
        verified: data?.phoneVerified || true,
        // Address Info  
        currentAddress: data?.address || '',
        permanentAddress: data?.permanentAddress || data?.address || '',
        country: data?.country || '',
        state: data?.state || '',
        city: data?.city || '',
        // Emergency Contact
        emergencyContact: data?.emergencyContact || '',
        emergencyContactName: data?.emergencyContactName || '',
        emergencyContactRelation: data?.emergencyContactRelation || ''
      });
    }
  }, [data]);

  const handlePersonalEdit = () => {
    // Navigate to personal info edit page
    console.log('click hua')
    navigate(`/dashboard/employee/personal/${id}`);
  };

  const handleContactEdit = () => {
    // Navigate to contact info edit page  
    navigate(`dashboard/employee/contact/${id}`);
  };

  const handleAddressEdit = () => {
    // Navigate to address edit page
    navigate(`dashboard/employee/address/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading personal information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading personal information: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Personal Info Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">PERSONAL INFO</h3>
          <button
            onClick={handlePersonalEdit}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Personal Information"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.name || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.dateOfBirth || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Gender</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.gender || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Blood Group</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.bloodGroup || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Marital Status</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.maritalStatus || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Children</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.children || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Qualification</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.qualification || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Experience</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.experience || '-'}</p>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">CONTACT INFO</h3>
          <button
            onClick={handleContactEdit}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Contact Information"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Official Email ID</label>
            <p className="text-sm text-blue-600 mt-1 break-all">
              {personalData.officialEmail || '-'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Personal Email ID</label>
            <p className="text-sm text-blue-600 mt-1 break-all">
              {personalData.personalEmail || '-'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-900">{personalData.phoneNumber || '-'}</p>
              {personalData.verified && personalData.phoneNumber && (
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Alternate Phone Number</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.alternatePhone || '-'}</p>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">ADDRESSES</h3>
          <button
            onClick={handleAddressEdit}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Address Information"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Current Address</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.currentAddress || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Permanent Address</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.permanentAddress || '-'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Country</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.country || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">State</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.state || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.city || '-'}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">EMERGENCY CONTACT</h3>
          <button
            onClick={handlePersonalEdit}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Emergency Contact"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.emergencyContact || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Contact Name</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.emergencyContactName || '-'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Relation</label>
            <p className="text-sm text-gray-900 mt-1">{personalData.emergencyContactRelation || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;