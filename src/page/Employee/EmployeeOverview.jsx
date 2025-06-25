import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Briefcase,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  PhoneCallIcon
} from 'lucide-react';
import PersonalInfo from './EmployeeOverview/PersonalInfo';
import WorkInfo from './EmployeeOverview/WorkInfo';
import { useGetOneEmployeeQuery } from '../../rtk/employeeApi.js';
import { useParams } from 'react-router-dom';
import AttendanceInfo from './EmployeeOverview/AttendanceInfo.jsx';
import LeaveInfo from './EmployeeOverview/LeaveInfo.jsx';
const EmployeeOverview = () => {
  const { id } = useParams();
    const { data: employeeData, isLoading, error } = useGetOneEmployeeQuery({ id });
  const [activeTab, setActiveTab] = useState('personal');
  
  const [dateRange, setDateRange] = useState({ from: '2025-05-20', to: '2025-06-19' });

  // Sample employee data - will be replaced with API data
  // const employeeData = {
  //   id: 'EMP001',
  //   name: 'Ashish Singh',
  //   email: 'ashishkumarrawat120@gmail.com',
  //   status: 'Getting Started',
  //   avatar: '/api/placeholder/120/120',
  //   personalInfo: {
  //     dateOfBirth: '',
  //     gender: '',
  //     bloodGroup: '',
  //     maritalStatus: ''
  //   },
  //   contactInfo: {
  //     officialEmail: 'ashishkumarrawat120@gmail.com',
  //     personalEmail: 'ashishkumarrawat120@gmail.com',
  //     phoneNumber: '9621891118',
  //     alternatePhone: '',
  //     verified: true
  //   },
  //   addresses: {
  //     currentAddress: '',
  //     permanentAddress: ''
  //   },
  //   workInfo: {
  //     department: 'IT',
  //     designation: 'Software Developer',
  //     employeeId: 'EMP001',
  //     joiningDate: '2025-01-15',
  //     reportingManager: 'John Doe'
  //   }
  // };

  // Sample attendance logs
 

  // Sample team and project data
  const teamProjects = [
    { name: 'HRMS Application', status: 'In Progress', role: 'Frontend Developer', completion: 75 },
    { name: 'Employee Portal', status: 'Completed', role: 'Full Stack Developer', completion: 100 },
    { name: 'Attendance System', status: 'Planning', role: 'Backend Developer', completion: 25 }
  ];

 
  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    // { id: 'team', label: 'Team & Projects', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'leaves', label: 'Leaves', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: Briefcase },
    { id: 'other', label: 'Other Details', icon: User }
  ];

  // const PersonalInfo = () => (
  //   <div className="space-y-6">
  //     {/* Personal Info Section */}
  //     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
  //       <h3 className="text-lg font-semibold text-gray-900 mb-4">PERSONAL INFO</h3>
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Name</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.name || '-'}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Date of Birth</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.personalInfo.dateOfBirth || '-'}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Gender</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.personalInfo.gender || '-'}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Blood Group</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.personalInfo.bloodGroup || '-'}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Marital Status</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.personalInfo.maritalStatus || '-'}</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Contact Info Section */}
  //     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
  //       <h3 className="text-lg font-semibold text-gray-900 mb-4">CONTACT INFO</h3>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Official Email ID</label>
  //           <p className="text-sm text-blue-600 mt-1">{employeeData.contactInfo.officialEmail}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Personal Email ID</label>
  //           <p className="text-sm text-blue-600 mt-1">{employeeData.contactInfo.personalEmail}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Phone Number</label>
  //           <div className="flex items-center gap-2 mt-1">
  //             <p className="text-sm text-gray-900">{employeeData.contactInfo.phoneNumber}</p>
  //             {employeeData.contactInfo.verified && (
  //               <CheckCircle className="h-4 w-4 text-green-500" />
  //             )}
  //           </div>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Alternate Phone Number</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.contactInfo.alternatePhone || '-'}</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Addresses Section */}
  //     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
  //       <h3 className="text-lg font-semibold text-gray-900 mb-4">ADDRESSES</h3>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Current Address</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.addresses.currentAddress || '-'}</p>
  //         </div>
  //         <div>
  //           <label className="text-sm font-medium text-gray-700">Permanent Address</label>
  //           <p className="text-sm text-gray-900 mt-1">{employeeData.addresses.permanentAddress || '-'}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const WorkInfo = () => (
  //   <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
  //     <h3 className="text-lg font-semibold text-gray-900 mb-4">WORK INFORMATION</h3>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //       <div>
  //         <label className="text-sm font-medium text-gray-700">Employee ID</label>
  //         <p className="text-sm text-gray-900 mt-1">{employeeData.workInfo.employeeId}</p>
  //       </div>
  //       <div>
  //         <label className="text-sm font-medium text-gray-700">Department</label>
  //         <p className="text-sm text-gray-900 mt-1">{employeeData.workInfo.department}</p>
  //       </div>
  //       <div>
  //         <label className="text-sm font-medium text-gray-700">Designation</label>
  //         <p className="text-sm text-gray-900 mt-1">{employeeData.workInfo.designation}</p>
  //       </div>
  //       <div>
  //         <label className="text-sm font-medium text-gray-700">Joining Date</label>
  //         <p className="text-sm text-gray-900 mt-1">{employeeData.workInfo.joiningDate}</p>
  //       </div>
  //       <div>
  //         <label className="text-sm font-medium text-gray-700">Reporting Manager</label>
  //         <p className="text-sm text-gray-900 mt-1">{employeeData.workInfo.reportingManager}</p>
  //       </div>
  //     </div>
  //   </div>
  // );

  const TeamProjects = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">TEAM & PROJECTS</h3>
      <div className="space-y-4">
        {teamProjects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{project.name}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Role: {project.role}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{project.completion}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const DocumentsSection = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">DOCUMENTS</h3>
      <p className="text-gray-600">No documents uploaded yet.</p>
    </div>
  );

  const OtherDetails = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">OTHER DETAILS</h3>
      <p className="text-gray-600">Additional information will be displayed here.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfo />;
      case 'work': return <WorkInfo />;
      case 'team': return <TeamProjects />;
      case 'attendance': return <AttendanceInfo />;
      case 'leaves': return <LeaveInfo />;
      case 'documents': return <DocumentsSection />;
      case 'other': return <OtherDetails />;
      default: return <PersonalInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#06425F] text-white p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-green-200 rounded-full overflow-hidden">
            <img
              src={employeeData?.employeeImage?.secure_url || employeeData?.employeeImage?.public_id }
              alt={employeeData?.name}
              className="w-full h-full border-2 rounded-full border-white/80 p-1 bg-[#06425F] object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${employeeData?.name}&background=10b981&color=fff&size=120`;
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{employeeData?.name}</h1>
            {/* <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                {employeeData.status}
              </span>
            </div> */}
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>{employeeData?.email}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <PhoneCallIcon className="h-4 w-4" />
              <span>{employeeData?.mobile}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky -top-5 z-10">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#06425F] text-[#06425F] bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmployeeOverview;