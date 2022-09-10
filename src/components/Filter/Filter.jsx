import PropTypes from 'prop-types';
import css from './Filter.module.css';
export function Filter({ value, onChange }) {
  return (
    <label className={css.filter__label}>
      Find contacts by name
      <input
        className={css.filter__input}
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
Filter.prototype = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
