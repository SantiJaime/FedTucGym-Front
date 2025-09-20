import * as yup from "yup";

const dateValidator = yup
  .string()
  .matches(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato YYYY-MM-DD")
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
  .test("no-past", "La fecha no puede ser pasada", (value) => {
    if (!value) return false;
    const inputDate = new Date(value);
    const today = new Date();
    return inputDate >= today;
  });

export const createTournamentValidatorSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre del torneo es requerido")
    .min(3, "El nombre del torneo debe tener al menos 3 caracteres"),
  startDate: dateValidator,
  endDate: dateValidator,
  inscription_date_end: dateValidator,
});
