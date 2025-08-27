import * as yup from "yup";

export const loginValidatorSchema = yup.object().shape({
  full_name: yup
    .string()
    .required("El nombre completo es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormData = yup.InferType<typeof loginValidatorSchema>;
