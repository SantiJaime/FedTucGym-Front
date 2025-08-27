import * as yup from "yup";

export const createScoreValidatorSchema = yup.object().shape({
  puntajes: yup
    .array()
    .of(
      yup
        .string()
        .required("Este campo es obligatorio")
        .matches(
          /^\d+(\.\d+)?$/,
          "Solo se permiten números válidos (pueden tener decimales usando .)"
        )
        .test(
          "min",
          "El número debe ser al menos 1",
          (value) => Number(value) >= 1
        )
        .test(
          "max",
          "El número no debe ser mayor a 10",
          (value) => Number(value) <= 10
        )
    )
    .length(4, "Debe haber exactamente 4 puntajes"),
});
