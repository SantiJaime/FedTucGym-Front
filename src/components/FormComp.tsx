import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import InputComp from "./InputComp";
import { EnvelopeAtFill, LockFill, PersonCircle } from "react-bootstrap-icons";
import {
  type FieldErrors,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import type { RegisterFormData } from "../validation/registerValidatorSchema";
import type { LoginFormData } from "../validation/loginValidatorSchema";
import { FormikInputComp, FormikSelectComp } from "./FormikInputComp";
import type { FormikErrors, FormikHandlers } from "formik";

interface LoginProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: SubmitHandler<LoginFormData>;
  loading?: boolean;
  setValue?: UseFormSetValue<LoginFormData>;
}

interface RegisterProps {
  errors: FormikErrors<RegisterFormData>;
  values: RegisterFormData;
  handleSubmit: FormikHandlers["handleSubmit"];
  handleChange: FormikHandlers["handleChange"];
  loading?: boolean;
}

const loadingSpinner = (
  <div className="d-flex align-items-center justify-content-center gap-2">
    <Spinner animation="border" variant="light" size="sm" />
    <span>Cargando...</span>
  </div>
);

export const RegisterFormComp: React.FC<RegisterProps> = ({
  errors,
  handleSubmit,
  loading,
  handleChange,
  values,
}) => {
  const ROLES_OPTIONS = [
    { label: "Sin seleccionar rol", value: 0 },
    { label: "Administrador", value: 1 },
    { label: "Juez", value: 2 },
    { label: "Gimnasio", value: 3 },
  ];
  const CATEGORIES_OPTIONS = [
    { label: "Sin categoría", value: 1 },
    { label: "Activo", value: 2 },
    { label: "Adherente", value: 3 },
  ];
  return (
    <Form onSubmit={handleSubmit} className="bg-light p-3 rounded-4 mt-3">
      <h5>Crear una nueva cuenta</h5>
      <hr />
      <FormikInputComp
        controlId="FullNameId"
        label="Nombre completo"
        placeholder="Ej: Juan Pérez"
        icon={<PersonCircle />}
        value={values.full_name}
        onChange={handleChange}
        name="full_name"
        errors={errors.full_name}
      />
      <FormikInputComp
        controlId="RegisterPasswordId"
        label="Contraseña"
        placeholder="************"
        type="password"
        icon={<LockFill />}
        value={values.password}
        onChange={handleChange}
        errors={errors.password}
        name="password"
      />
      <FormikSelectComp
        controlId="RegisterRoleId"
        options={ROLES_OPTIONS}
        label="Rol del usuario"
        icon={<PersonCircle />}
        value={values.id_role}
        onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
          handleChange({
            target: {
              name: "id_role",
              value: Number(ev.target.value),
            },
          });
        }}
        errors={errors.id_role}
        name="id_role"
      />
      {values.id_role === 3 && (
        <FormikSelectComp
          controlId="RegisterCategoryId"
          options={CATEGORIES_OPTIONS}
          label="Categoría del gimnasio"
          icon={<PersonCircle />}
          value={values.id_category}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange({
              target: {
                name: "id_category",
                value: Number(ev.target.value),
              },
            });
          }}
          errors={errors.id_category}
          name="id_category"
        />
      )}
      <div className="d-flex justify-content-end">
        <Button type="submit" variant="dark" disabled={loading}>
          {loading ? loadingSpinner : "Crear cuenta"}
        </Button>
      </div>
    </Form>
  );
};
export const LoginFormComp: React.FC<LoginProps> = ({
  register,
  errors,
  handleSubmit,
  loading,
  onSubmit,
  setValue,
}) => {
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-light p-3 rounded-4 mt-3"
    >
      <h5>Iniciar sesión</h5>
      <hr />
      <InputComp
        controlId="LoginFullnameId"
        label="Nombre completo"
        placeholder="Juan Pérez"
        icon={<EnvelopeAtFill />}
        register={register("full_name")}
        error={errors.full_name?.message}
        autoComplete="full_name"
        setValue={setValue}
        name="full_name"
      />
      <InputComp
        controlId="LoginPasswordId"
        label="Contraseña"
        placeholder="************"
        type="password"
        icon={<LockFill />}
        register={register("password")}
        error={errors.password?.message}
        autoComplete="current-password"
        setValue={setValue}
        name="password"
      />
      <div className="d-flex justify-content-end">
        <Button type="submit" variant="dark" disabled={loading}>
          {loading ? loadingSpinner : "Iniciar sesión"}
        </Button>
      </div>
    </Form>
  );
};
