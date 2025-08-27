import * as yup from "yup";

export const filterScoresValidatorSchema = yup.object().shape({
  id_category: yup
    .number()
    .typeError("La categoría es requerida")
    .moreThan(0, "La categoría es requerida")
    .required("La categoría es requerida"),
  id_level: yup
    .number()
    .typeError("El nivel es requerido")
    .moreThan(0, "El nivel es requerido")
    .required("El nivel es requerido"),
});

export type FilterScores = yup.InferType<typeof filterScoresValidatorSchema>;