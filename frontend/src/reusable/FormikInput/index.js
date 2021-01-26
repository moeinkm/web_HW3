import React from 'react';
import {
  StyledTextBox,
  StyledInput,
  StyledIcon,
  StyledErrorBox,
  StyledLabel,
  StyledTextArea
} from './style';

const FormikInput = props => {
  const { formik, type, icon, name, placeholder, label,isTextArea } = props;
  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledTextBox hasError={name in formik.errors && name in formik.touched}>
          {icon && <StyledIcon className={icon} />}
          {!isTextArea ? ( <StyledInput
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
          ) : (
              <StyledTextArea
                  id={name}
                  name={name}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
              />
          )}
      </StyledTextBox>

      {name in formik.errors && name in formik.touched ? (
        <StyledErrorBox>{formik.errors[name]}</StyledErrorBox>
      ) : null}
    </div>
  );
};

export default FormikInput;
