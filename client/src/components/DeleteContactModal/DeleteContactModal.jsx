import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const DeleteContactModal = ({
  deleteContact,
  contact,
  setShowModal,
  setUserPartner,
  setContact,
  isProfile,
  partner
}) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div class="flex items-center justify-center fixed left-40 bottom-10 w-full h-full opacity-100">
        <div class="bg-gray-100 border-2 rounded-lg w-1/4 shadow-2xl">
          <div class="flex flex-col items-start p-4 z-50">
            <div class="flex items-center w-full">
              <div class="text-gray-900 font-medium text-lg">
                Remove Contact
              </div>
              <svg
                class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                onClick={() => setShowModal(false)}
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
            <hr />
            <div class="my-4 text-gray-500 font-semibold">
              Are you sure you want to remove this contact?
            </div>
            <hr />
            <div class="ml-auto flex space-x-2">
              {!isProfile && (
                <button
                  class="bg-transparent bg-green-500 hover:bg-green-600 text-white font-bold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded mr-2"
                  onClick={() => {
                    setShowModal(false);
                    setUserPartner(user?._id, contact?._id);
                  }}
                >
                  Set as Accountability Partner
                </button>
              )}
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShowModal(false);
                  navigate(`/profile/${contact?._id}`);
                  setContact(contact);
                }}
              >
                View
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShowModal(false);
                  deleteContact(user?._id, contact?._id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteContactModal;
