import { useState, type ReactNode } from "react";
import type { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import type { LoginFormData } from "../validation/loginValidatorSchema";

interface Props {
  controlId: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: ReactNode;
  register: UseFormRegisterReturn;
  error?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  autoComplete?: string;
  setValue?: UseFormSetValue<LoginFormData>;
  name?: string;
}

const InputComp: React.FC<Props> = ({
  controlId,
  label,
  type = "text",
  placeholder,
  icon,
  register,
  error,
  onChange,
  value,
  autoComplete,
  setValue,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id={`InputGroup${controlId}`}>{icon}</InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          type={inputType}
          {...register}
          isInvalid={!!error}
          onChange={onChange}
          value={value}
          autoComplete={autoComplete}
          name={name}
          onInput={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setValue?.(name as keyof LoginFormData, ev.target.value)
          }
        />
        {isPassword && (
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword((prevState) => !prevState)}
            type="button"
            tabIndex={-1}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        )}
      </InputGroup>
      <small className="text-danger">{error}</small>
    </Form.Group>
  );
};

export default InputComp;
