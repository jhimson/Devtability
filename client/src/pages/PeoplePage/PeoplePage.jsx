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
import Search from '../../components/Search/Search';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`;

const PeoplePage = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //  ! STATES
  const [isSearching, setIsSearching] = useState(false);
  const [people, setPeople] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState(
    localStorage.getItem('filteredPeople')
      ? JSON.parse(localStorage.getItem('filteredPeople'))
      : []
  );
  const test = useRef({});

  //   ! FUNCTIONS

  const handleSearch = (e) => {
    e.preventDefault();
  };

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
    const res = await Axios.post(
      `${BASE_URL}/contacts/`,
      {
        userId: user._id,
        contactId,
      }
    );
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
        `${BASE_URL}/users/except/${user?._id}`
      );

      if (res) {
        test.current.people = res.data || [];
        if (isSearching) {
          setPeople(searchList);
        } else {
          setPeople(res.data);
        }
      }
    };

    const getContacts = async () => {
      const res = await Axios.get(
        `${BASE_URL}/contacts/${user?._id}`
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
  }, [user, isSearching, searchList]);

  useEffect(() => {
    setFilteredPeople(filterPeople(userContacts, people));
  }, [user, people, userContacts]);

  return (
    <>
      <div className="min-h-screen">
        <Main sidenav={<Sidenav />}>
          <Search
            handleSearch={handleSearch}
            setSearchList={setSearchList}
            setIsSearching={setIsSearching}
          />
          <div>
            <article className="w-11/12 mx-auto mb-12">
              <PeopleList
                filteredPeople={filteredPeople}
                addNewContact={addNewContact}
                deleteContact={deleteContact}
              />
            </article>
          </div>
        </Main>
      </div>
    </>
  );
};

export default PeoplePage;
