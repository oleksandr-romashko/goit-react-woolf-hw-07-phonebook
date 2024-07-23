import styled from 'styled-components';

/**
 * Styled page container to contain main page elements.
 */
const Page = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '32px',
  lineHeight: '1.15',
  '&:last-child': {
    marginBottom: '40px',
  },

  '& .page-message': {
    marginLeft: '8px',
    marginRight: '8px',
  },
});

export default Page;
