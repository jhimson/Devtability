import React, { useContext } from 'react';
import Bryce from '../../assets/images/Bryce.png';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const PersonCard = ({ person, addNewContact }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div className="shadow-lg shadow-purple-200 p-4 w-full md:w-96 h-52 rounded bg-gradient-to-bl from-blue-300 to-blue-900 flex flex-col justify-center items-center mt-4 max-w-[24rem]">
        <img
          className="w-20 h-20 object-cover rounded-full mb-2"
          src={Bryce}
          alt="logo"
        />
        <p className="text-gray-100 font-semibold">{person?.name}</p>
        {person?.isExist ? (
          <button
            disabled
            className="w-full rounded-md bg-blue-500  py-2 text-indigo-100 hover:bg-blue-700 hover:shadow-md duration-75 mt-8"
          >
            Remove from Contacts
          </button>
        ) : (
          <button
            className="w-full rounded-md bg-blue-500  py-2 text-indigo-100 hover:bg-blue-700 hover:shadow-md duration-75 mt-8"
            onClick={() => addNewContact(user._id, person?._id)}
          >
            Add to Contacts
          </button>
        )}
      </div>
      {/* <div className="flex items-center justify-center px-4">
        <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl cursor-pointer">
          <img
            src={Bryce}
            alt="plant"
            className="h-60 w-full"
          />
          <div className="p-5">
            <p className="text-medium mb-5 text-gray-700 text-center">
              Bryce Henderson
            </p>
            <button className="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75">
              Add to Contacts
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PersonCard;
