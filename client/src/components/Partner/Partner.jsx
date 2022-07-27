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
              <img
                className="w-16 rounded-full"
                src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"
              />
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
