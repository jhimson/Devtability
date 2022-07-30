import React from 'react';

const Partner = ({ partner, setShowModal }) => {
  return (
    <>
      <div className="flex flex-col w-full items-center jutify-center mb-4">
        <div>
          <h3 className="text-gray-600 text-sm font-semibold mb-4 text-center text-2xl">
            Accountability Partner
          </h3>
          <li
            className="flex flex-col items-center space-y-2 cursor-pointer transition-transform duration-500 hover:scale-125 hover:font-bold
            "
          >
            <a className="block bg-white p-1 rounded-full">
              <img className="w-20 h-20 rounded-full" src={partner?.image} />
            </a>
            <span className="text-xs text-gray-500">{partner?.name}</span>
          </li>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Partner;
