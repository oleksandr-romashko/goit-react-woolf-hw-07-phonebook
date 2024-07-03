import { useSelector, useDispatch } from 'react-redux';
import throttle from 'lodash.throttle';

import { getFilter } from '../../store/filter/selectors';
import { setFilterAction } from 'store/filter/slice';

import { 
  FilterWrapper, 
  InputWrapper, 
  FilterInput, 
  ClearButton 
} from './Filter.styled';

/**
 * Contacts filter component.
 * @returns {JSX.Element} Rendered filter component.
 */
const Filter = () => {
  const filterText = useSelector(getFilter);
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
  
  return (
    <FilterWrapper>
      Find contacts by name
      <InputWrapper>
        <FilterInput
          value={filterText}
          onChange={throttle(handleFilterChange, 150, { trailing: false })}
          type='text'
          name='filter'
          placeholder='Search'
          title='Search field to filter contact list. Case insensitive.'
        />
        <ClearButton type='button' onClick={handleFilterClear}>⨯</ClearButton>
      </InputWrapper>
    </FilterWrapper>
  );
};

export default Filter;
