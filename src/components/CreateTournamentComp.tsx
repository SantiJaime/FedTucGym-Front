import { useFormik } from "formik";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Calendar2Date, PlusCircle, TagFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormikInputComp } from "./FormikInputComp";
import { createTournamentValidatorSchema } from "../validation/createTournamentValidatorSchema";
import { validateDates } from "../utils/extraFunctions";
import { toast } from "sonner";
import useTournaments from "../hooks/useTournaments";

const CreateTournamentComp = () => {
  const { handleCreateTournament } = useTournaments();

  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: "",
      endDate: "",
      inscription_date_end: ""
    },
    validationSchema: createTournamentValidatorSchema,
    onSubmit: async (values) => {
      const areDatesValid = validateDates(values.startDate, values.endDate, values.inscription_date_end);
      if (!areDatesValid) {
        toast.error(
          "La fecha de finalización debe ser igual o posterior a la fecha de inicio y el último día de inscripción menor al inicio"
        );
        return;
      }

      const res = await handleCreateTournament(values);
      if (res) {
        handleClose();
        resetForm();
      }
    },
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = formik;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant="secondary"
        className="d-flex align-items-center gap-1"
        onClick={handleShow}
      >
        <PlusCircle />
        <span>Crear torneo</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo torneo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FormikInputComp
              controlId="TournamentNameId"
              label="Nombre del torneo"
              placeholder="Ej: Torneo de invierno 2025"
              icon={<TagFill />}
              value={values.name}
              onChange={handleChange}
              errors={errors.name}
              name="name"
            />
            <FormikInputComp
              controlId="TournamentStartDateId"
              label="Fecha de inicio"
              placeholder="YYYY-MM-DD"
              icon={<Calendar2Date />}
              value={values.startDate}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                let value = ev.target.value.replace(/[^0-9]/g, "");

                if (value.length > 4)
                  value = `${value.slice(0, 4)}-${value.slice(4)}`;
                if (value.length > 7)
                  value = `${value.slice(0, 7)}-${value.slice(7, 9)}`;

                setFieldValue("startDate", value);
              }}
              errors={errors.startDate}
              name="startDate"
            />
            <FormikInputComp
              controlId="TournamentEndDateId"
              label="Fecha de finalización"
              placeholder="YYYY-MM-DD"
              icon={<Calendar2Date />}
              value={values.endDate}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                let value = ev.target.value.replace(/[^0-9]/g, "");

                if (value.length > 4)
                  value = `${value.slice(0, 4)}-${value.slice(4)}`;
                if (value.length > 7)
                  value = `${value.slice(0, 7)}-${value.slice(7, 9)}`;

                setFieldValue("endDate", value);
              }}
              errors={errors.endDate}
              name="endDate"
            />
            <FormikInputComp
              controlId="InscriptionEndDateId"
              label="Último día para inscribirse"
              placeholder="YYYY-MM-DD"
              icon={<Calendar2Date />}
              value={values.inscription_date_end}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                let value = ev.target.value.replace(/[^0-9]/g, "");

                if (value.length > 4)
                  value = `${value.slice(0, 4)}-${value.slice(4)}`;
                if (value.length > 7)
                  value = `${value.slice(0, 7)}-${value.slice(7, 9)}`;

                setFieldValue("inscription_date_end", value);
              }}
              errors={errors.inscription_date_end}
              name="inscription_date_end"
            />
            <Button variant="dark" type="submit" className="w-100">
              Crear torneo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateTournamentComp;
