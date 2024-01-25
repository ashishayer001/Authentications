import Yup from "yup";

export let RegisterUserSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .trim()
    .max(55, "Name must be at max 55 characters."),

  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase()
    .max(55, "Name must be at max 55 characters."),

  password: Yup.string()
    .required("Password is required.")
    .trim()
    .min(4, "Password must be at least 4 characters.")
    .max(20, "Password must be at max 20 characters."),
});



export let loginUserSchema = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required.").trim(),
});
