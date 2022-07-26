import React, { useContext } from 'react';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const DeleteContactModal = ({ deleteContact, contact, setShowModal }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div class="flex items-center justify-center fixed left-40 bottom-10 w-full h-full opacity-100">
        <div class="bg-gray-200 rounded-lg w-1/4">
          <div class="flex flex-col items-start p-4 opacity-100">
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
            <div class="ml-auto">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => {
                  setShowModal(false);
                  deleteContact(user?._id, contact?._id);
                }}
              >
                Confirm
              </button>
              <button
                class="bg-transparent bg-red-500 hover:bg-red-700 text-white font-bold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteContactModal;
