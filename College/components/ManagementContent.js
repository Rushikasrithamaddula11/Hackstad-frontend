import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaStar } from 'react-icons/fa';

const ManagementContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@college.edu',
      role: 'faculty'
    },
    {
      id: 2,
      name: 'Alex Thompson',
      email: 'alex.t@company.com',
      role: 'mentor'
    }
  ]);

  const handleDelete = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleSave = (staffData) => {
    if (editingStaff) {
      setStaff(staff.map(s => 
        s.id === editingStaff.id ? { ...staffData, id: s.id } : s
      ));
    } else {
      setStaff([...staff, { ...staffData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal Component
  const StaffModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      role: 'faculty'
    });

    useEffect(() => {
      
        setFormData({
          name: '',
          email: '',
          role: 'faculty'
        });
        if (editingStaff) {
          setFormData(editingStaff);
        } 
    }, [editingStaff]);
    

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSave(formData);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-medium">
                {editingStaff ? 'Edit Staff' : 'Add New Staff'}
              </Dialog.Title>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-stone-400 hover:text-stone-500"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className='flex'>
                <label className="block text-sm font-medium text-stone-700">Role</label>
                <p className='px-2 text-red-500 text-xl'><sup>*</sup></p>
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 py-2.5 px-1 block w-full rounded-md border-stone-300 shadow-sm focus:outline-none focus:ring-emerald-500"
                  style={{ boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)' }}
                  required
                >

                  <option value="faculty">Faculty</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>

              <div>
                <div className='flex'>
                <label className="block text-sm font-medium text-stone-700">Name</label>
                <p className='px-2 text-red-500 text-xl'><sup>*</sup></p>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)' }}
                  className="mt-1 py-2 px-1 block w-full rounded-md border-stone-300 shadow-sm focus:outline-none focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <div className='flex'>
                <label className="block text-sm font-medium text-stone-700">Email</label>
                <p className='px-2 text-red-500 text-xl'><sup>*</sup></p>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)' }}
                  className="mt-1 py-2 px-1 block w-full rounded-md border-stone-300 shadow-sm focus:outline-none focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-md shadow-sm text-sm font-medium text-stone-700 bg-white hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  {editingStaff ? 'Update' : 'Add'} Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={handleAdd}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 whitespace-nowrap"
          >
            <FaPlus /> Add Staff
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {filteredStaff.map((staffMember) => (
                <tr key={staffMember.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{staffMember.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{staffMember.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{staffMember.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleEdit(staffMember)}
                      className="text-emerald-600 hover:text-emerald-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(staffMember.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && <StaffModal />}
    </div>
  );
};

export default ManagementContent;