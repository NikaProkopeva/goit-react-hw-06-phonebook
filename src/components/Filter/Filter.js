import actions from 'components/redux/actions';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import filter from './Filter.module.css';

const Filter = ({ title }) => {
  const value = useSelector(state => state.contacts.filter);

  const dispatch = useDispatch();

  return (
    <label className={filter.label}>
      <span className={filter.label__title}>{title}</span>
      <input
        className={filter.input}
        type="text"
        name="filter"
        value={value}
        onChange={e => dispatch(actions.changeFilter(e.currentTarget.value))}
      />
    </label>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Filter;
