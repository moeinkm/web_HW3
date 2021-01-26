import * as Yup from "yup";

const requiredMessage = "this field is required.";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(requiredMessage),
  description: Yup.string().required(requiredMessage),
});
