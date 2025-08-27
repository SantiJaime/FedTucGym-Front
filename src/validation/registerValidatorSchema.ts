import * as yup from "yup";

export const registerValidatorSchema = yup.object().shape({
  full_name: yup.string().required("El nombre completo es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  id_role: yup
    .number()
    .typeError("El rol es requerido")
    .moreThan(0, "El rol es requerido")
    .required("El rol es requerido"),
  id_category: yup
    .number()
    .typeError("La categoría es requerida")
    .required("La categoría es requerida"),
});

export type RegisterFormData = yup.InferType<typeof registerValidatorSchema>;
