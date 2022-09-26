import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from 'hooks/useLocalStorage';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { GlobalStyles } from 'utils/GlobalStyle';
import { Wrapper, TitlePhonebook, TitleContacts, Message } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const normalizedName = name.toLowerCase();

    if (contacts.find(({ name }) => name.toLowerCase() === normalizedName)) {
      return toast.error(`${name} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Wrapper>
      <TitlePhonebook>Phonebook</TitlePhonebook>
      <ContactForm onSubmit={addContact} />
      <TitleContacts>Contacts</TitleContacts>
      <Filter value={filter} onChange={changeFilter} />
      {visibleContacts.length !== 0 ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <Message>No contacts added yet!</Message>
      )}
      <GlobalStyles />
      <ToastContainer style={{ fontSize: '20px' }} />
    </Wrapper>
  );
};
