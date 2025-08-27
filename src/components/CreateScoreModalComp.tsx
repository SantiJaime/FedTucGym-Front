import { useState } from "react";
import { Form } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormikInputComp } from "./FormikInputComp";
import { useFormik } from "formik";
import { createScoreValidatorSchema } from "../validation/creareScoreValidatorSchema";
import useScores from "../hooks/useScores";

interface Props {
  member: MembersTournaments;
}

const CreateScoreModalComp: React.FC<Props> = ({ member }) => {
  const { handleCreateScore } = useScores();
  const formik = useFormik({
    initialValues: {
      puntajes: ["", "", "", ""],
    },
    validationSchema: createScoreValidatorSchema,
    onSubmit: (values) => {
      const puntajes = values.puntajes.map((puntaje) => Number(puntaje));
      const promedio = puntajes.reduce((a, b) => a + b, 0) / puntajes.length;
      handleCreateScore(promedio, member);
      resetForm();
      handleClose();
    },
  });

  const { values, errors, handleChange, handleSubmit, resetForm } = formik;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant="dark"
        className="d-flex align-items-center gap-1"
        onClick={handleShow}
      >
        <StarFill />
        <span>Puntuar</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Puntuar a {member.full_name}</h5>
            <h6>DNI: {member.dni}</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {values.puntajes.map((puntaje, index) => (
              <FormikInputComp
                key={index}
                name={`puntajes[${index}]`}
                label={`Puntaje ${index + 1}`}
                controlId={`puntaje${index}`}
                value={puntaje}
                onChange={handleChange}
                errors={errors.puntajes?.[index]}
                icon={<StarFill />}
                placeholder={`Puntaje ${index + 1}`}
              />
            ))}
            <Button className="w-100" variant="dark" type="submit">
              <span>Guardar puntajes</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateScoreModalComp;
