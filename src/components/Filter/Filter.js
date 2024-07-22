import { useSelector, useDispatch } from 'react-redux';
import throttle from 'lodash.throttle';

import { selectFilter } from '../../store/filter/selectors';
import { setFilterAction } from 'store/filter/slice';

import { FilterWrapper } from './Filter.styled';
import InteractiveInput from 'components/Input/InteractiveInput';
import { ICON_NAME } from 'components/Icon/Icon';

/**
 * Filter component for filtering contacts.
 * @returns {JSX.Element} Rendered filter component.
 */
const Filter = () => {
  const filterText = useSelector(selectFilter);
  const dispatch = useDispatch();

  /**
   * Handles filter change by writing value to the Redux state.
   * @param {string} event.target.value Filter value.
   */
  const handleFilterChange = ({ target: { value } }) => {
    dispatch(setFilterAction(value));
  };

  /**
   * Clears filter input text by clearing filter Redux state value.
   */
  const handleFilterClear = () => {
    dispatch(setFilterAction(''));
  };

  /**
   * Handles key press when filter input is focused
   * @param {*} event
   */
  const handlesFilterKeyPress = event => {
    if (event.code === 'Escape' && filterText) {
      handleFilterClear();
    }
  };

  return (
    <FilterWrapper>
      Find contacts by name
      <InteractiveInput
        className="filter-input"
        value={filterText}
        type="text"
        placeholder="Search"
        title="Filter contacts"
        onChange={throttle(handleFilterChange, 200, { trailing: false })}
        onKeyUp={handlesFilterKeyPress}
        onAction={handleFilterClear}
        actionIconName={ICON_NAME.CROSS}
      />
    </FilterWrapper>
  );
};

export default Filter;
