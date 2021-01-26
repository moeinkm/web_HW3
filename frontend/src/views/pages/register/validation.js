import * as Yup from "yup";

const requiredMessage = "this field is required.";

export const validationSchema = Yup.object().shape({
  username: Yup.string().required(requiredMessage),
  email: Yup.string().required(requiredMessage).email(),
  password: Yup.string().required(requiredMessage),
  repeat: Yup.string()
    .required(requiredMessage)
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
