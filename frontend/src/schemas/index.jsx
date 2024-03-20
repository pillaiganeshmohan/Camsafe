import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  lastname: Yup.string().min(2).max(25).required("Please enter your surname"),
  email: Yup.string().email().required("Please enter your email"),
  message: Yup.string().min(30).max(180).required("please enter your message"),
});
