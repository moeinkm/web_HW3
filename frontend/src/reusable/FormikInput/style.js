import styled from 'styled-components';

export const StyledTextBox = styled.div`
  display: flex;
  margin: 15px;
  width: inherit;
  box-shadow: 1px 1px 2px #ddd;
  border: ${({ hasError }) =>
    hasError ? '1px solid red' : '1px solid #ddd'};
  border-radius: 4px;
`;

export const StyledInput = styled.input`
  flex: 1;
  line-height: 34px;
  border-radius: 4px;
  direction: ltr;
  font-size: 13px;
  border: 0;
  padding: 0 15px;

  ::placeholder {
    color: #ddd;
    font-size: 13px;
    direction: rtl;
  }
`;
export const StyledTextArea = styled.textarea`
  flex: 1;
  line-height: 34px;
  border-radius: 4px;
  direction: ltr;
  font-size: 13px;
  border: 0;
  padding: 0 15px;

  ::placeholder {
    color: #ddd;
    font-size: 13px;
    direction: rtl;
  }
`;

export const StyledIcon = styled.i`
  font-size: 1.4rem;
  min-width: 50px;
  justify-content: center;
  display: flex;
  padding: 15px;
`;

export const StyledErrorBox = styled.div`
  direction: ltr;
  text-align: left;
  margin: -10px 0px 0 15px;
  color: red;
  font-size: 0.9rem;
`;

export const StyledLabel = styled.div`
  direction: ltr;
  text-align: left;
  margin: 30px 20px -10px;
  color: #000;
  font-weight: 700;
  font-size: 0.8rem;
`;