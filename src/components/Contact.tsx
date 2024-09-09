import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { deleteContact } from '../redux/contactsSlice';
import { toast } from 'react-toastify';

const ContactsPage: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
    toast.warn('Contact deleted');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      {contacts.length === 0 ? (
        <div className="text-center">
          <p>No contacts created... click the create button to create new contacts.</p>
          <Link to="/contacts/create">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Create Contact</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/contacts/create">
            <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Create Contact</button>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-4 bg-gray-100 rounded shadow-lg flex flex-col">
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{contact.firstName} {contact.lastName}</h2>
                  <p>Status: {contact.status}</p>
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                  <Link to={`/contacts/edit/${contact.id}`} className="w-full">
                    <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit Contact</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
