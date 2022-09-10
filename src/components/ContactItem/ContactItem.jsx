import css from './ContactItem.module.css';
import PropTypes from 'prop-types';
export function ContactItem({ id, name, number, onDeleteContactById }) {
  return (
    <>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button
          className={css.button}
          type="button"
          onClick={() => onDeleteContactById(id)}
        >
          X
        </button>
      </td>
    </>
  );
}
ContactItem.prototype = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContactById: PropTypes.func.isRequired,
};
