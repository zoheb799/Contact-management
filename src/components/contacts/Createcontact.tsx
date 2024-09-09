import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addContact, updateContact } from '../../redux/contactsSlice';
import { RootState } from '../../redux/store';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

const CreateContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingContact = useSelector((state: RootState) =>
    state.contacts.contacts.find(c => c.id === id)
  );

  const [firstName, setFirstName] = useState(existingContact?.firstName || '');
  const [lastName, setLastName] = useState(existingContact?.lastName || '');
  const [status, setStatus] = useState<'Active' | 'Inactive'>(existingContact?.status || 'Active');

  const handleSubmit = () => {
    if(!firstName || !lastName || !status) {
      return toast.error('input feilds cannot be empty!!')
    }
    if (id) {
      dispatch(updateContact({ id, firstName, lastName, status }));
      toast.warn('Contact updated');
    } else {
      dispatch(addContact({ id: uuidv4(), firstName, lastName, status }));
      toast.success('Contact created');
    }
    navigate('/contacts');
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg w-full">
        {/* Back Button */}
        <button
          onClick={() => navigate('/contacts')}
          className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
        >
          <FaArrowLeft size={20} />
          <span className="ml-2">Back to Contacts</span>
        </button>

        <h1 className="text-3xl font-bold mb-8 text-center">{id ? 'Edit Contact' : 'Create Contact'}</h1>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-8">
          <span className="block text-sm font-medium text-gray-700 mb-2">Status</span>
          <div className="flex space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Active"
                checked={status === 'Active'}
                onChange={() => setStatus('Active')}
                className="form-radio"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Inactive"
                checked={status === 'Inactive'}
                onChange={() => setStatus('Inactive')}
                className="form-radio"
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {id ? 'Edit Contact' : 'Create Contact'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContactPage;
