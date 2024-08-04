import styled from 'styled-components';

export const ProfileWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',

  '& .profile-remove-all-data-btn': {
    width: 'fit-content',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
});

export const UserProfileForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',

  '& .user-form-element': {
    marginTop: '12px',
  },

  '& label .label-text': {
    marginTop: '12px',
    fontWeight: 500,
  },

  '& .user-input': {
    minWidth: '276px',

    '@media screen and (min-width: 420px)': {
      minWidth: '312px',
    },
    '@media screen and (min-width: 576px)': {
      minWidth: '332px',
    },
    '@media screen and (min-width: 768px)': {
      minWidth: '352px',
    },

    '&:not([disabled]):placeholder-shown + div > button.action': {
      display: 'block',
    },

    '&.with-action[disabled] + div > button.action': {
      display: 'block',
    },
  },

  '& .user-form-warnings .show-warning': {
    marginTop: '16px',
    marginBottom: '4px',
  },

  '&:not([data-edited]) .js-edited-show, &[data-edited] .js-edited-hide': {
    display: 'none',
  },

  '&:not([data-edited]) .js-edited-hide, &[data-edited] .js-edited-show': {
    display: 'flex',
  },
});

export const ProfileFormActionsWrapper = styled('div')({
  display: 'flex',
  columnGap: '8px',

  '@media screen and (min-width: 420px)': {
    columnGap: '10px',
  },
  '@media screen and (min-width: 576px)': {
    columnGap: '12px',
  },
  '@media screen and (min-width: 768px)': {
    columnGap: '14px',
  },

  '& button > svg': {
    marginRight: '7px',
    width: '14px',
    height: '14px',

    '@media screen and (min-width: 420px)': {
      marginRight: '6px',
      width: '15px',
      height: '15px',
    },
    '@media screen and (min-width: 576px)': {
      marginRight: '6px',
      width: '17px',
      height: '17px',
    },
    '@media screen and (min-width: 768px)': {
      marginRight: '6px',
      width: '18px',
      height: '18px',
    },
  },
});

export const Section = styled('section')({
  '& > p:first-child ': {
    marginBottom: '12px',
    fontWeight: 500,
  },

  '& .do-not-show-label': {
    display: 'flex',
    alignItems: 'baseline',
    columnGap: '8px',
    cursor: 'pointer',

    '& input[type="checkbox"]': {
      width: '16px',
      height: '16px',

      '&:hover': {
        cursor: 'pointer',
      },
      '&:focus': {
        outline: '1px solid var(--color-accent-blue-light)',
        border: '1px solid var(--color-accent-blue-light)',
        boxShadow:
          '0px 0px 3px 6px rgba(148, 192, 249, .9), inset 0px 0px 0px 2px rgba(148, 192, 249, 0.8)',
        borderRadius: '1px',
      },
    },
  },

  '& details': {
    boxSizing: 'border-box',
    width: '100%',
    minWidth: '100%',
    maxWidth: '300px',
    borderRadius: '5px',
    color: 'var(--color-accent-red-normal)',

    '& p.normal-black-text': {
      marginLeft: '16px',
      marginRight: '16px',
      color: 'var(--color-basic-black)',
    },

    '& summary': {
      paddingTop: '6px',
      paddingBottom: '6px',
      borderRadius: '5px 5px 5px 5px',
      fontWeight: 500,
      outlineOffset: '3px',
      cursor: 'pointer',

      '&::marker': {
        fontSize: '18px',
        color: 'var(--color-basic-black)',
      },
    },

    '& .profile-remove-all-data-btn': {
      marginTop: '6px',
      marginBottom: '8px',
      marginLeft: '16px',
      marginRight: '16px',
      minWidth: '152px',
      '@media screen and (min-width: 420px)': {
        minWidth: '160px',
      },
      '@media screen and (min-width: 576px)': {
        minWidth: '180px',
      },
      '@media screen and (min-width: 768px)': {
        minWidth: '196px',
      },
    },
  },
});

/**
 * Informational text about delete operation results.
 */
export const InfoText = styled('p')({
  maxHeight: 0,
  opacity: 0,
  margin: 0,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  transition: 'opacity 280ms ease-in-out, max-height 480ms ease-in-out',

  // prevent text select
  '-webkit-user-select': 'none' /* Safari */,
  '-ms-user-select': 'none' /* IE 10 and IE 11 */,
  'user-select': 'none' /* Standard syntax */,

  '@media screen and (min-width: 420px)': {
    fontSize: '16px',
    lineHeight: '16px',
  },

  '&.danger-error': {
    marginLeft: '16px',

    '@media screen and (min-width: 576px)': {
      marginLeft: '18px',
    },
  },

  '&[data-info-show="true"]': {
    maxHeight: '300px',
    opacity: 1,
    marginTop: '8px',
  },

  '&.success': {
    color: 'green',
  },

  '&.fail': {
    color: 'red',
  },
});
