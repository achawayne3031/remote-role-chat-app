import * as Yup from "yup";

export const SignUpValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  phone: Yup.string().required("Phone is required"),
});
