import {
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  ButtonRB,
} from '../button/ButtonRB';

export const FormButtonRow = ({
  submitButtonText = 'Submit',
  resetButtonText = 'Cancel',
  onCancel,
  isLoading
}: FormButtonRowProps) => {

  const isShowButtons = [
    submitButtonText,
    resetButtonText,
  ].some((b: any) => !!b)

  if(!isShowButtons) {
    return null;
  }

  return (
    <ButtonRowStyled className="rb-form-button-row">

      <ResetButton
        isLoading={isLoading}
        resetButtonText={resetButtonText}
        onCancel={onCancel}
      />

      <SubmitButton
        isLoading={isLoading}
        submitButtonText={submitButtonText}
      />
    </ButtonRowStyled>
  );
}

const SubmitButton = ({
  isLoading,
  submitButtonText
}: any) => {

  if (!submitButtonText) {
    return null;
  }

  return (
    <ButtonRB
      disabled={isLoading}
      type="submit">
      {submitButtonText}
    </ButtonRB>
  );
}

const ResetButton = ({
  resetButtonText,
  isLoading,
  onCancel
}: any) => {

  if(!resetButtonText) {
    return null;
  }

  return (
    <ButtonRB
      disabled={isLoading}
      onClick={onCancel}
      color={'inherit'}>
      {resetButtonText}
    </ButtonRB>
  );
}

const ButtonRowStyled = styled(Box)(({
  theme
}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '24px'
}));

export interface FormButtonRowProps {
  /**
   * Displays submit button with given text
   * Submits form on click
   */
  submitButtonText?: string
  /**
   * Displays reset button with given text
   * Resets form with default values on click
   */
  resetButtonText?: string
  /**
   * Form is loading or submitted
   */
  isLoading?: boolean;
  /**
   * Cancel button click override
   */
  onCancel?: Function
}
