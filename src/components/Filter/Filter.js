import { useSelector, useDispatch } from 'react-redux';
import throttle from 'lodash.throttle';

import { selectFilter } from '../../store/filter/selectors';
import { setFilterAction } from 'store/filter/slice';

import {
  FilterWrapper,
  InputWrapper,
  FilterInput,
  ClearButton,
} from './Filter.styled';
import Icon from 'components/Icon/Icon';

/**
 * Contacts filter component.
 * @returns {JSX.Element} Rendered filter component.
 */
const Filter = () => {
  const filterText = useSelector(selectFilter);
  const dispatch = useDispatch();

  /**
   * Handles filter change.
   * @param {string} event.target.value Filter value.
   */
  const handleFilterChange = ({ target: { value } }) => {
    dispatch(setFilterAction(value));
  };

  /**
   * Handles filter input text clear.
   */
  const handleFilterClear = () => {
    dispatch(setFilterAction(''));
  };

  // Add on Escape filter clear when filter is focused and not empty.
  const handleKeyPress = event => {
    if (event.code === 'Escape' && filterText) {
      handleFilterClear();
    }
  };
  const handleFilterFocus = event => {
    const filterInputEl = event.target;
    filterInputEl.addEventListener('keydown', handleKeyPress);
  };
  const handleFilterBlur = event => {
    const filterInputEl = event.target;
    filterInputEl.removeEventListener('keydown', handleKeyPress);
  };

  return (
    <FilterWrapper>
      Find contacts by name
      <InputWrapper>
        <FilterInput
          value={filterText}
          onChange={throttle(handleFilterChange, 110, { trailing: false })}
          type="text"
          name="filter"
          placeholder="Search"
          title="Search field to filter contact list. Case insensitive."
          onFocus={handleFilterFocus}
          onBlur={handleFilterBlur}
        />
        <ClearButton
          type="button"
          onClick={handleFilterClear}
          aria-label="clear filter"
        >
          <Icon name="cross" className="clear-btn-icon" />
        </ClearButton>
      </InputWrapper>
    </FilterWrapper>
  );
};

export default Filter;
