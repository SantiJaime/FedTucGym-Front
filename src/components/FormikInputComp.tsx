import type { FormikHandlers } from "formik";
import React, { type ElementType, type ReactNode } from "react";
import { Form, InputGroup } from "react-bootstrap";

interface InputProps {
  controlId: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: ReactNode;
  value: string | number;
  errors?: string;
  onChange: FormikHandlers["handleChange"];
  as?: ElementType;
  name: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  controlId: string;
  errors?: string;
  icon: ReactNode;
  as?: ElementType;
  value: number;
  onChange: FormikHandlers["handleChange"];
  name: string;
}

export const FormikInputComp: React.FC<InputProps> = ({
  controlId,
  label,
  type = "text",
  placeholder,
  icon,
  errors,
  onChange,
  value,
  as,
  name,
}) => {
  return (
    <Form.Group as={as} sm={6} md={3} className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id={`InputGroup${controlId}`}>{icon}</InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          type={type}
          isInvalid={!!errors}
          onChange={onChange}
          value={value}
          name={name}
        />
      </InputGroup>
      <small className="text-danger">{errors}</small>
    </Form.Group>
  );
};

export const FormikSelectComp: React.FC<SelectProps> = ({
  label,
  options,
  controlId,
  errors,
  icon,
  as,
  value,
  onChange,
  name,
}) => {
  return (
    <Form.Group as={as} sm={6} md={3} className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id={`InputGroup${controlId}`}>{icon}</InputGroup.Text>
        <Form.Select
          value={value}
          isInvalid={!!errors}
          onChange={onChange}
          name={name}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
      <small className="text-danger">{errors}</small>
    </Form.Group>
  );
};
