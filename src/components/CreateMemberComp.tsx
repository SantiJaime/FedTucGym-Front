import { useState } from "react";
import {
  CalendarDate,
  PencilSquare,
  PersonAdd,
  PersonCircle,
  Tag,
} from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useMembers from "../hooks/useMembers";
import { createMemberValidatorSchema } from "../validation/createMemberValidatorSchema";
import { OneTwoThreeIcon } from "./Icons";
import { useFormik } from "formik";
import { FormikInputComp, FormikSelectComp } from "./FormikInputComp";

interface Props {
  member?: FullMemberInfo;
}

const CreateMemberComp: React.FC<Props> = ({ member }) => {
  const { handleCreateMember, handleUpdateMember } = useMembers();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      full_name: member?.full_name ?? "",
      birth_date: member?.birth_date ?? "",
      dni: member?.dni.toString() ?? "",
      id_level: member?.id_level ?? 0,
    },
    validationSchema: createMemberValidatorSchema,
    onSubmit: async (values) => {
      if (member) {
        const res = await handleUpdateMember(member.id, values);
        if (res?.member) {
          handleClose();
        }
        return;
      }

      const res = await handleCreateMember(values);
      if (res?.member) {
        resetForm({
          values: {
            full_name: "",
            birth_date: "",
            dni: "",
            id_level: 0,
          },
        });
        handleClose();
      }
    },
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = formik;

  return (
    <>
      {member ? (
        <Button
          variant="info"
          onClick={handleShow}
          className="d-flex align-items-center gap-2"
        >
          <PencilSquare />
          <span>Editar</span>
        </Button>
      ) : (
        <Button
          variant="danger"
          onClick={handleShow}
          className="d-flex align-items-center gap-2"
        >
          <PersonAdd />
          <span>Crear alumno</span>
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{member ? "Editar alumno" : "Crear alumno"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FormikInputComp
              controlId="MemberFullNameId"
              label="Nombre completo"
              placeholder="Ej: Juan Perez"
              icon={<PersonCircle />}
              onChange={handleChange}
              value={values.full_name}
              errors={errors.full_name}
              name="full_name"
            />
            <FormikInputComp
              controlId="MemberBirthDateId"
              label="Fecha de nacimiento"
              placeholder="YYYY-MM-DD"
              icon={<CalendarDate />}
              value={values.birth_date}
              name="birth_date"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                let value = ev.target.value.replace(/[^0-9]/g, "");

                if (value.length > 4)
                  value = `${value.slice(0, 4)}-${value.slice(4)}`;
                if (value.length > 7)
                  value = `${value.slice(0, 7)}-${value.slice(7, 9)}`;

                setFieldValue("birth_date", value);
              }}
            />
            <FormikInputComp
              controlId="MemberDniId"
              label="DNI"
              placeholder="Ej: 12345678"
              icon={<OneTwoThreeIcon />}
              value={values.dni}
              onChange={handleChange}
              name="dni"
              errors={errors.dni}
            />
            <FormikSelectComp
              label="Nivel"
              options={[
                { label: "Sin seleccionar nivel", value: 0 },
                { label: "1", value: 1 },
                { label: "1-B", value: 2 },
                { label: "2", value: 3 },
                { label: "3", value: 4 },
                { label: "4", value: 5 },
                { label: "5", value: 6 },
                { label: "6", value: 7 },
                { label: "7", value: 8 },
                { label: "8", value: 9 },
                { label: "9", value: 10 },
                { label: "10", value: 11 },
              ]}
              controlId="MemberLevelId"
              icon={<Tag />}
              errors={errors.id_level}
              value={values.id_level}
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange({
                  target: {
                    name: "id_level",
                    value: Number(ev.target.value),
                  },
                });
              }}
              name="id_level"
            />

            <Button variant="dark" type="submit" className="w-100">
              {member ? "Guardar cambios" : "Crear alumno"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateMemberComp;
