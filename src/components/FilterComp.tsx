import { Button, Col, Form, Row } from "react-bootstrap";
import { Bookmark, PersonCircle, Search, TagFill } from "react-bootstrap-icons";
import { OneTwoThreeIcon } from "./Icons";
import { CATEGORIES, LEVELS } from "../constants/const";
import {
  filterMembersValidatorSchema,
  type FilterMembers,
} from "../validation/filterMembersValidatorSchema";
import { useFormik } from "formik";
import { FormikInputComp, FormikSelectComp } from "./FormikInputComp";
import { toast } from "sonner";

interface Props {
  submitFilter: (paramFilters: FilterMembers) => void;
  color: ColorType;
  textColor: "white" | "dark";
  setFilters: React.Dispatch<React.SetStateAction<FilterMembers | null>>;
  setLoadingFilter: React.Dispatch<React.SetStateAction<boolean>>;
  gyms: User[] | null;
  user: UserInfo | null;
}

const FilterComp: React.FC<Props> = ({
  color,
  textColor,
  setFilters,
  submitFilter,
  setLoadingFilter,
  gyms,
  user,
}) => {
  const formik = useFormik({
    initialValues: {
      full_name: "",
      dni: "",
      id_category: 0,
      id_level: 0,
      id_gym: 0,
    },
    validationSchema: filterMembersValidatorSchema,
    onSubmit: (values) => {
      if (user && user.role === "Administrador" && values.id_gym === 0) {
        toast.error("Debe seleccionar un gimnasio");
        return;
      }
      setFilters(values);
      setLoadingFilter(false);
      submitFilter(values);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <FormikInputComp
          as={Col}
          controlId="FilterNameId"
          label="Nombre completo (o parcial)"
          placeholder="Ej: Juan"
          icon={<PersonCircle />}
          value={values.full_name}
          onChange={handleChange}
          errors={errors.full_name}
          name="full_name"
        />
        <FormikInputComp
          as={Col}
          controlId="FilterDniId"
          label="DNI completo"
          placeholder="Ej: 12345678"
          icon={<OneTwoThreeIcon />}
          value={values.dni}
          onChange={handleChange}
          errors={errors.dni}
          name="dni"
        />
        <FormikSelectComp
          as={Col}
          controlId="FilterCategoryId"
          label="Categoría"
          options={CATEGORIES}
          icon={<Bookmark />}
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
        <FormikSelectComp
          as={Col}
          controlId="FilterLevelId"
          label="Nivel"
          options={LEVELS}
          icon={<TagFill />}
          value={values.id_level}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange({
              target: {
                name: "id_level",
                value: Number(ev.target.value),
              },
            });
          }}
          errors={errors.id_level}
          name="id_level"
        />
        {gyms && user && user.role === "Administrador" ? (
          <FormikSelectComp
            as={Col}
            controlId="FilterGymId"
            label="Gimnasio"
            options={[
              { value: 0, label: "Sin seleccionar gimnasio" },
              ...gyms.map((gym) => ({
                value: gym.id,
                label: gym.full_name,
              })),
            ]}
            icon={<PersonCircle />}
            value={values.id_gym}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange({
                target: {
                  name: "id_gym",
                  value: Number(ev.target.value),
                },
              });
            }}
            errors={errors.id_gym}
            name="id_gym"
          />
        ) : (
          ""
        )}
      </Row>
      <div className="d-flex justify-content-between align-items-center">
        <div className={`bg-${color} p-2 rounded-4 text-${textColor}`}>
          <h6 className="text-decoration-underline">¡Importante!</h6>
          <p>
            Si desea obtener todos los alumnos, deje los campos en blanco y
            presione en <b>Filtrar 🔍</b>
          </p>
        </div>
        <Button
          type="submit"
          variant="dark"
          className="d-flex align-items-center gap-1"
        >
          <span>Filtrar</span>
          <Search />
        </Button>
      </div>
    </Form>
  );
};

export default FilterComp;
