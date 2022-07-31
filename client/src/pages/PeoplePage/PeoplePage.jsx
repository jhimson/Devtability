/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import Main from '../../components/Main/Main';

// ! API
import { removeContact } from '../../utils/contacts-api';

// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import PeopleList from '../../components/PeopleList/PeopleList';

const PeoplePage = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //  ! STATES
  const [people, setPeople] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState(
    localStorage.getItem('filteredPeople')
      ? JSON.parse(localStorage.getItem('filteredPeople'))
      : []
  );
  const test = useRef({});

  //   ! FUNCTIONS
  const addNewContact = async (userId, contactId) => {
    let updatedZest = filteredPeople?.map((z) => {
      if (z._id === contactId) {
        z.isExist = true;
        return z;
      }
      return z;
    });

    let currentContact = people.find((person) => person._id === contactId);
    setUserContacts((prevState) => [...prevState, currentContact]);
    setFilteredPeople(updatedZest);
    localStorage.setItem('filteredPeople', JSON.stringify(updatedZest));
    const res = await Axios.post(`https://devtability.herokuapp.com/api/contacts/`, {
      userId: user._id,
      contactId,
    });
  };

  const deleteContact = async (userId, contactId) => {
    let updatedZest = filteredPeople?.map((z) => {
      if (z._id === contactId) {
        z.isExist = false;
        return z;
      }
      return z;
    });

    let currentContact = people.find((person) => person._id === contactId);
    const updatedContacts = userContacts.filter(
      (contact) => contact._id !== contactId
    );
    setUserContacts(updatedContacts);
    setFilteredPeople(updatedZest);
    localStorage.setItem('filteredPeople', JSON.stringify(updatedZest));
    const response = await removeContact(userId, contactId);
    console.log(`Successfully deleted a contact`, response);
  };

  const filterPeople = (contacts, people) => {
    let filtered = [];
    let hash = new Map();
    people?.map((person) => {
      if (!hash.has(person._id)) {
        hash.set(person._id, { ...person, isExist: false });
      }
    });

    contacts?.map((contact) => {
      if (hash.has(contact._id)) {
        hash.set(contact._id, { ...hash.get(contact._id), isExist: true });
      }
    });
    hash.forEach((test) => filtered.push(test));
    return filtered;
  };

  //! USE EFFECTS
  useEffect(() => {
    const fetchPeople = async () => {
      const res = await Axios.get(
        `https://devtability.herokuapp.com/api/users/except/${user?._id}`
      );

      if (res) {
        test.current.people = res.data || [];
        setPeople(res.data);
      }
    };

    const getContacts = async () => {
      const res = await Axios.get(
        `https://devtability.herokuapp.com/api/contacts/${user?._id}`
      );

      if (res) {
        test.current.contacts = res.data?.contacts || [];
        setUserContacts(res.data?.contacts || []);
      }
    };
    getContacts();
    fetchPeople();
    setFilteredPeople(
      filterPeople(test.current?.contacts, test.current?.people)
    );
  }, [user]);

  useEffect(() => {
    setFilteredPeople(filterPeople(userContacts, people));
  }, [user, people, userContacts]);

  return (
    <>
      <div className="min-h-screen bg-red-400">
        {/* <Sidenav /> */}
        <Main sidenav={<Sidenav />}>
          <nav className="flex items-center justify-between px-4 bg-white py-6 border-b">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-1/8">
              <input
                type="text"
                placeholder="search"
                className="bg-gray-100 outline-none w-full"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="w-8 rounded-full"
                src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg"
                alt="Elon Musk"
              />
              <p className="hidden md:block">{user?.name}</p>
            </div>
          </nav>
          <div>
            <article className="">
              <PeopleList
                filteredPeople={filteredPeople}
                addNewContact={addNewContact}
                deleteContact={deleteContact}
              />
            </article>
          </div>
        </Main>
        {/* <div>Welcome, {user.name}!</div> */}
      </div>
    </>
  );
};

export default PeoplePage;
