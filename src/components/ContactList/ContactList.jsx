import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export function ContactList({ contacts, onDeleteContactById }) {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(({ id, name, number }) => {
          return (
            <tr key={id}>
              <ContactItem
                id={id}
                name={name}
                number={number}
                onDeleteContactById={onDeleteContactById}
              />
            </tr>
          );
        })}
      </tbody>
      <thead></thead>
    </table>
  );
}
ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContactById: PropTypes.func.isRequired,
};
