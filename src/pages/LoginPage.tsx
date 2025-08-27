import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Image } from "react-bootstrap";
import { loginValidatorSchema, type LoginFormData } from "../validation/loginValidatorSchema";
import { useForm } from "react-hook-form";
import { LoginFormComp } from "../components/FormComp";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const { handleLogin, loading, user } = useUsers();

  useEffect(() => {
    if (user) {
      navigate("/inicio");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidatorSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await handleLogin(data);
    if (res?.userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(res.userInfo));

      navigate("/inicio");
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center flex-column align-items-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Image src="/logo_negro.png" alt="Logo de torneos" width={300} />
        <h3>Administración de torneos - Federación Tucumana de Gimnasia</h3>
      </div>
      <div className="w-75">
        <LoginFormComp
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loading}
          setValue={setValue}
        />
      </div>
    </Container>
  );
};

export default LoginPage;
