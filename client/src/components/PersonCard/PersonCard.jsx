import React, { useContext } from 'react';
import Bryce from '../../assets/images/Bryce.png';
import { useNavigate } from 'react-router-dom';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const PersonCard = ({ person, addNewContact, deleteContact }) => {
  const navigate = useNavigate();
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div
        className="w-11/12 p-2 transition-transform duration-500 hover:scale-125"
        key={person?._id}
      >
        <div className="bg-white px-6 py-8 rounded-lg shadow-2xl text-center">
          <div className="mb-3 cursor-pointer">
            <img
              className="w-40 h-40 mx-auto rounded-full"
              src={person?.image}
              alt=""
              onClick={() => navigate(`/person-profile/${person?._id}`)}
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700">{person?.name}</h2>
          <span className="text-gray-400 font-semibold block mb-5 text-sm">{person?.title}</span>

          {person?.isExist ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-full font-bold"
              onClick={() => deleteContact(user?._id, person?._id)}
            >
              Remove from Contacts
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full font-bold"
              onClick={() => addNewContact(user._id, person?._id)}
            >
              Add to Contacts
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonCard;
