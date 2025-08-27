import { Container, Image } from "react-bootstrap";
import { registerValidatorSchema} from "../validation/registerValidatorSchema";
import { RegisterFormComp } from "../components/FormComp";
import useUsers from "../hooks/useUsers";
import { toast } from "sonner";
import { useFormik } from 'formik';

const RegisterPage = () => {
  const { handleCreateUser } = useUsers();

  const formik = useFormik({
    initialValues: {
      full_name: "",
      password: "",
      id_role: 0,
      id_category: 1,
    },
    validationSchema: registerValidatorSchema,
    onSubmit: async (values) => {
      const res = await handleCreateUser(values);
      if (res?.user) {
        toast.success(res.message);
        resetForm();
      }
    },
  })

  const { values, errors, handleChange, handleSubmit, resetForm } = formik;

  return (
    <Container className="my-5 d-flex justify-content-center flex-column align-items-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Image src="/logo_negro.png" alt="Logo de torneos" width={300} />
        <h3>Administración de torneos - Federación Tucumana de Gimnasia</h3>
      </div>
      <div className="w-75">
        <RegisterFormComp
          errors={errors}
          handleSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
        />
      </div>
    </Container>
  );
};

export default RegisterPage;
