import * as yup from "yup";

const dateValidator = yup
  .string()
  .matches(/^\d{4}-\d{2}-\d{2}$/, "El formato debe ser YYYY-MM-DD")
  .test("is-valid-date", "La fecha no es válida", (value) => {  
    if (!value) return false;
    
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  })
  .test("no-future", "La fecha no puede ser futura", (value) => {
    if (!value) return false;
    const inputDate = new Date(value);
    const today = new Date();
    console.log(inputDate <= today)
    return inputDate <= today;
  })
  .test(
    "not-too-young",
    "El alumno debe tener al menos 2 años",
    (value) => {
      if (!value) return false;
      const inputDate = new Date(value);

      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      return inputDate <= twoYearsAgo;
    }
  )
  .required("La fecha es requerida");

export const createMemberValidatorSchema = yup.object().shape({
  full_name: yup.string().required("El nombre completo es requerido"),
  birth_date: dateValidator,
  dni: yup
    .string()
    .matches(/^\d+$/, "Solo se permiten números (sin letras ni símbolos)")
    .required("El documento es requerido")
    .min(7, "El documento debe tener al menos 7 caracteres")
    .max(8, "El documento debe tener como máximo 8 caracteres"),
  id_level: yup
    .number()
    .typeError("El nivel es requerido")
    .moreThan(0, "El nivel es requerido")
    .required("El nivel es requerido"),
});

export type CreateMemberFormData = yup.InferType<
  typeof createMemberValidatorSchema
>;
