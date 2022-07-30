/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PersonCard from '../PersonCard/PersonCard';

const PeopleList = ({ filteredPeople, addNewContact, deleteContact }) => {
  return (
    <>
      {/* <div classNameName="bg-white shadow mt-6 rounded-lg p-6">
        <h3 classNameName="text-gray-600 text-sm font-semibold mb-12 text-center text-2xl">
          People
        </h3>
        <ul classNameName="grid grid-cols-3 grid-auto-rows">
          {filteredPeople?.map((person) => (
            <PersonCard
              key={person?._id}
              person={person}
              addNewContact={addNewContact}
              deleteContact={deleteContact}
            />
          ))}
        </ul>
      </div> */}
      <div id="container" className="w-11/12 mx-auto mt-8">
        <div className="grid grid-cols-3 grid-auto-rows gap-x-4 gap-y-10">
          {filteredPeople?.map((person) => (
            <PersonCard
              key={person?._id}
              person={person}
              addNewContact={addNewContact}
              deleteContact={deleteContact}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PeopleList;
