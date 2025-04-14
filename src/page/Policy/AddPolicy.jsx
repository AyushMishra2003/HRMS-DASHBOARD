import { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { X } from 'lucide-react';
import { usePolicyAddMutation, usePolicyEditMutation } from '../../rtk/policy';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function EmployeeAddPolicy() {
  const location = useLocation();
  const policyData = location.state?.policyEdit;
  const navigate = useNavigate();
  const [policyAdd, { data, isLoading, error }] = usePolicyAddMutation();
  const[policyEdit]=usePolicyEditMutation();
  const [titel, setTitel] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    if (policyData) {
      setTitel(policyData.titel);
      setDescription(policyData.description);
    }
  }, [policyData]);

  const titelAdd = async () => {
    try {
      if (policyData) {
         const id=policyData._id
          const response=await policyEdit({ id, titel, description })
          if (response.data.success) {
            navigate('/employee/policy');
          }
      } else {
        const response = await policyAdd({ titel, description });
        if (response.data.success) {
          navigate('/employee/policy');
        }
      }
    } catch (err) {
      return console.log(err.message);
    }
  };

  const chandPage=()=>{
    navigate('/employee/policy');
  }

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-400">
      <div className="flex justify-between items-center mb-6 pb-3 border-b">
        <h2 className="text-xl font-semibold">Policy</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={20}  onClick={chandPage}/>
        </button>
      </div>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Title</label>
          <input
            type="text"
            id="titel"
            value={titel}
            name="titel"
            onChange={(e) => setTitel(e.target.value)}
            placeholder="Enter your title here"
            className="border border-gray-500 h-8 rounded-sm"
          ></input>
        </div>
      </div>
      <SunEditor
        setContents={description}
        onChange={(content) => {
          // SunEditor से content को raw format में लें और सीधे save करें
          setDescription(content);
        }}
        className="border border-red-500 min-h-[40rem]"
        setOptions={{
          height: '300px', // ✅ Editor ki height badha di
          minHeight: '300px', // ✅ Minimum height set kar di
          buttonList: [
            ['undo', 'redo'], // Undo/Redo
            ['bold', 'underline', 'italic', 'strike'], // Text Formatting
            ['font', 'fontSize', 'formatBlock'], // ✅ Font Customization
            ['fontColor', 'hiliteColor'], // ✅ Text Color & Background Color
            ['align', 'list', 'lineHeight'], // Text Alignment & Spacing
            ['table'], // ✅ Insert & Edit Table
            ['link'], // ✅ Hyperlink Support (Internal & External Links)
            ['image', 'video'], // ✅ Media Support
            ['codeView'] // View HTML Code
          ],
          linkProtocol: '', // ✅ Disable default "http://"
          // attributesWhitelist: {
          //   a: "href target title class download", // ✅ Allow custom attributes
          // },
          addTagsWhitelist: 'a[href]', // Allow href attribute explicitly
          sanitize: false, // Disable automatic sanitization
          defaultTag: 'div'
        }}
      />
      <div className="mx-w-xs- mt-4">
        <button className="pl-1 flex bg-blue-500 rounded-sm text-white w-15 hover:bg-blue-800" onClick={titelAdd}>
          Submit
        </button>
      </div>
    </div>
  );
}
