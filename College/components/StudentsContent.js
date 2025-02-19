import React, { useState } from 'react';
import { X, Edit2, User, Mail, School, Award } from 'lucide-react';

// SearchBar Component
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full sm:w-80 md:w-96">
      <input
        type="text"
        placeholder="Search students..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 text-sm sm:text-base 
                 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder:text-gray-400
                 shadow-sm
                 transition-all duration-200"
      />
    </div>
  );
};

const StudentsContent = () => {
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      email: "johndoe@example.com",
      college: "ABC University",
      roll_no: "12345",
      hackathons_participated: 5
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      college: "XYZ Institute of Technology",
      roll_no: "67890",
      hackathons_participated: 3
    },
    {
      name: "Alice Brown",
      email: "alicebrown@example.com",
      college: "LMN College",
      roll_no: "11223",
      hackathons_participated: 2
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      college: "DEF Academy",
      roll_no: "44556",
      hackathons_participated: 7
    },
    {
      name: "Charlie Green",
      email: "charliegreen@example.com",
      college: "UVW University",
      roll_no: "77889",
      hackathons_participated: 1
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({
      ...selectedStudent,
      [name]: value
    });
  };

  const handleSave = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.roll_no === selectedStudent.roll_no ? selectedStudent : student
      )
    );
    setIsEditing(false);
  };

  const handleClosePopup = () => {
    setSelectedStudent(null);
    setIsEditing(false);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Students Management</h2>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr
                key={student.roll_no}
                className="hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                onClick={() => handleRowClick(student)}
              >
                <td className="px-4 py-3 whitespace-nowrap">{student.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{student.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{student.college}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredStudents.map((student) => (
          <div
            key={student.roll_no}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            onClick={() => handleRowClick(student)}
          >
            <h3 className="font-medium text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{student.email}</p>
            <p className="text-sm text-gray-500">{student.college}</p>
          </div>
        ))}
      </div>

      {/* Enhanced Dialog */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4 z-50 animate-fadeIn">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 flex gap-2">
              {!isEditing && (
                <button
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  onClick={handleEditClick}
                  title="Edit"
                >
                  <Edit2 size={20} />
                </button>
              )}
              <button
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                onClick={handleClosePopup}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {!isEditing ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={40} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-gray-500 mt-1">{selectedStudent.roll_no}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="text-gray-500 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedStudent.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <School className="text-gray-500 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">College</p>
                        <p className="font-medium">{selectedStudent.college}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Award className="text-gray-500 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Hackathons Participated</p>
                        <p className="font-medium">{selectedStudent.hackathons_participated}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-6 pr-16">Edit Student Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={selectedStudent.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={selectedStudent.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                      <input
                        type="text"
                        name="college"
                        value={selectedStudent.college}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hackathons Participated</label>
                      <input
                        type="number"
                        name="hackathons_participated"
                        value={selectedStudent.hackathons_participated}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={handleClosePopup}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentsContent;