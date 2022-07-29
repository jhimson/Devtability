/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import DeleteContactModal from '../DeleteContactModal/DeleteContactModal';

// ! CONTEXTS IMPORTS
import { ContactContext } from '../../contexts/ContactContext';

const Contacts = ({ ...contactsProps }) => {
  const { contact, setContact } = useContext(ContactContext);
  const [currentContact, setCurrentContact] = useState(null);
  return (
    <>
      <div className="bg-white shadow mt-6 rounded-lg p-6">
        <h3 className="text-gray-600 text-sm font-semibold mb-4 text-center text-2xl">
          Contacts
        </h3>
        {contactsProps.showModal && (
          <DeleteContactModal
            deleteContact={contactsProps.deleteContact}
            contact={currentContact}
            setShowModal={contactsProps.setShowModal}
            setUserPartner={contactsProps.setUserPartner}
            setContact={setContact}
            isProfile={contactsProps.isProfile}
          />
        )}
        {contactsProps.contacts?.length ? (
          <ul className="flex items-center justify-center space-x-2">
            {contactsProps.contacts?.map((contact) => (
              <>
                <li
                  className="flex flex-col items-center space-y-2 cursor-pointer transition-transform duration-500 hover:scale-125 hover:font-bold
            "
                  onClick={() => {
                    contactsProps.setShowModal(true);
                    setCurrentContact(contact);
                  }}
                >
                  <a className="block bg-white p-1 rounded-full">
                    <img
                      className="w-16 rounded-full"
                      src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"
                    />
                  </a>
                  <span className="text-xs text-gray-500">
                    {' '}
                    {contact?.name.split(' ')[0]}{' '}
                  </span>
                </li>
              </>
            ))}
          </ul>
        ) : (
          <h1 className="text-center text-gray-500 text-xl">
            No contacts found!
          </h1>
        )}
      </div>
    </>
  );
};

export default Contacts;
