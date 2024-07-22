import styled from 'styled-components';

export const FilterWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px',

  '& .filter-input': {
    maxWidth: '250px',
  },
});
