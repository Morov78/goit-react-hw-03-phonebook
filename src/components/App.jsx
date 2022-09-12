import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChangeFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      // window.alert(`${name} is already in contacts`);
      Notify.warning(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState({ contacts: [newContact, ...contacts] });
  };

  onDeleteContactById = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('phonebookContacts', JSON.stringify(nextContacts));
    }
  }

  //добавив таймаут, щоб було видно коли читає дані з localStorage
  componentDidMount() {
    try {
      const localContacts = localStorage.getItem('phonebookContacts');

      if (localContacts) {
        setTimeout(() => {
          const contacts = JSON.parse(localContacts);
          this.setState({ contacts });
        }, 1000);
      }
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          flexDirection: 'column',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContactById={this.onDeleteContactById}
        />
      </div>
    );
  }
}

export default App;
