import * as yup from "yup";
import type { InferType } from "yup";

export const filterMembersValidatorSchema = yup.object({
  full_name: yup
    .string()
    .matches(
      /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
      "El nombre no puede contener números ni símbolos"
    )
    .optional(),
  dni: yup
    .string()
    .matches(/^\d+$/, "El documento debe ser un número")
    .min(7, "El documento debe tener al menos 7 caracteres")
    .max(8, "El documento debe tener como máximo 8 caracteres")
    .optional(),
  id_category: yup.number().required(),
  id_level: yup.number().required(),
  id_gym: yup
    .number()
    .typeError("El gimnasio es obligatorio")
    .required("El gimnasio es obligatorio"),
});

export type FilterMembers = InferType<typeof filterMembersValidatorSchema>;
