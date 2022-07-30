import React, { useContext } from 'react';
import Bryce from '../../assets/images/Bryce.png';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const PersonCard = ({ person, addNewContact, deleteContact }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      {/* <div className="shadow-lg shadow-purple-200 p-4 w-full md:w-96 h-52 rounded bg-gradient-to-bl from-blue-300 to-blue-900 flex flex-col justify-center items-center mt-4 max-w-[24rem]">
        <img
          className="w-20 h-20 object-cover rounded-full mb-2"
          src={Bryce}
          alt="logo"
        />
        <p className="text-gray-100 font-semibold">{person?.name}</p>
        {person?.isExist ? (
          <button
            className="w-full rounded-md bg-blue-500  py-2 text-indigo-100 hover:bg-blue-700 hover:shadow-md duration-75 mt-8"
            onClick={() => deleteContact(user?._id, person?._id)}
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
      </div> */}
      <div className="w-11/12 p-2 transition-transform duration-500 hover:scale-125" key={person?._id}>
        <div className="bg-white px-6 py-8 rounded-lg shadow-2xl text-center">
          <div className="mb-3 cursor-pointer">
            <img
              className="w-40 h-40 mx-auto rounded-full"
              src={person?.image}
              alt=""
              onClick={() => alert('wtf')}/>
          </div>
          <h2 className="text-xl font-medium text-gray-700">{person?.name}</h2>
          <span className="text-blue-500 block mb-5">Front End Developer</span>

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
