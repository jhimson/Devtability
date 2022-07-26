/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Contacts = ({ contacts }) => {
  return (
    <>
      <div className="bg-white shadow mt-6 rounded-lg p-6">
        <h3 className="text-gray-600 text-sm font-semibold mb-4 text-center">
          Contacts
        </h3>
        <ul className="flex items-center justify-center space-x-2">
          {contacts?.map((contact) => (
            <li className="flex flex-col items-center space-y-2">
              <a className="block bg-white p-1 rounded-full" href="#">
                <img
                  className="w-16 rounded-full"
                  src="https://images.unsplash.com/photo-1638612913771-8f00622b96fb?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"
                />
              </a>
              <span className="text-xs text-gray-500"> {contact?.name.split(" ")[0]} </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Contacts;
