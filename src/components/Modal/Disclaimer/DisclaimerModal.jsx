import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';

import { setShowDisclaimerAgain } from 'store/persistent/slice';
import { setIsDisclaimerModalOpen } from 'store/modals/slice';

import Button from 'components/Button/BasicButton.styled';
import Icon from 'components/Icon/Icon';
import { Backdrop, ModalContainer, Modal, Title } from '../Modal.styled';
import { Info, ShowImportantInfoForm } from './DisclaimerModal.styled';

const DisclaimerModal = () => {
  const dispatch = useDispatch();
  
  const handleDoNotShowAgainSubmit = (event) => {
    event.preventDefault();
    const checkbox = event.currentTarget.elements['not-show-again-checkbox'];
    const isChecked = checkbox.checked;
    dispatch(setShowDisclaimerAgain(isChecked));
    dispatch(setIsDisclaimerModalOpen(false));
  }

  return ReactDom.createPortal(
    <>
      <Backdrop />
        <Modal>
          <ModalContainer>
            <Title>Important App Notes</Title>
            <Info>
              <h3>
                  <Icon name='important' className='disclaimer-icon' />
                  State of Development and Personal Data Protection
              </h3>
              <p>This application was created for testing purposes and cannot guarantee that your data is safe and secure.</p>
              <p>As it is only a front-end app using a free test mock back-end API, it is not possible to provide an adequate or appropriate level of data security. All data shared with this app should be considered non-private and potentially publicly available.</p>
              <p>You use this application at your own risk and provide your data voluntarily, understanding all the associated risks.</p>
            </Info>
            <Info>
              <h3>
                <Icon name='cross-platform' className='disclaimer-icon' />
                Contacts Sharing Functionality Across Devices
              </h3>
              <p>To share contacts and have access to them on multiple devices, you may set or change a unique user identifier in your profile settings.</p>
              <p>Otherwise, each device (browser application) will obtain its own unique user identifier, and you will see only the contacts related to that identifier.</p>
            </Info>
            <Info>
              <h3>
                <Icon name='idea' className='disclaimer-icon' />
                Feedback
              </h3>
              <p>
              I would love to read your thoughts, questions, issues, typos, and anything else you feel like sharing with me.
              </p>
              <p>You can contact me on&nbsp;
                <a 
                  href="https://github.com/oleksandr-romashko"
                  title="Developer GitHub page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                  .
                </p>
            </Info>

            <ShowImportantInfoForm onSubmit={handleDoNotShowAgainSubmit}>
              <label name='checkbox-label'>
                <input type='checkbox' name='not-show-again-checkbox'/>
                <span>Do not show this message again</span>
              </label>
              <Button type='submit'>Confirm and continue</Button>
            </ShowImportantInfoForm>
          </ModalContainer>
        </Modal>
    </> ,
    document.getElementById('modal-portal')
  )
};

export default DisclaimerModal;