import type { ElementType, ReactNode } from "react";
import { Form, InputGroup } from "react-bootstrap";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  options: Option[];
  controlId: string;
  label: string;
  icon: ReactNode;
  register: UseFormRegisterReturn;
  error?: string;
  as?: ElementType;
}

const SelectComp: React.FC<Props> = ({
  label,
  options,
  controlId,
  error,
  icon,
  register,
  as,
}) => {
  return (
    <Form.Group as={as} sm={6} md={3} className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id={`InputGroup${controlId}`}>{icon}</InputGroup.Text>
        <Form.Select {...register} isInvalid={!!error}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
      <small className="text-danger">{error}</small>
    </Form.Group>
  );
};

export default SelectComp;
