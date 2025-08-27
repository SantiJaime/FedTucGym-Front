import { Button, Col, Form, Row } from "react-bootstrap";
import { Bookmark, Search, TagFill } from "react-bootstrap-icons";
import { CATEGORIES, LEVELS } from "../constants/const";
import { useFormik } from "formik";
import { FormikSelectComp } from "./FormikInputComp";
import {
  filterScoresValidatorSchema,
  type FilterScores,
} from "../validation/filterScoresValidatorSchema";

interface Props {
  submitFilter: (values: FilterScores) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterScores | null>>
}

const FilterScoresComp: React.FC<Props> = ({ submitFilter, setFilters }) => {
  const formik = useFormik({
    initialValues: {
      id_category: 0,
      id_level: 0,
    },
    validationSchema: filterScoresValidatorSchema,
    onSubmit: (values) => {
      setFilters(values);
      submitFilter(values);
    },
  });

  const { values, errors, handleSubmit, setFieldValue } = formik;

  return (
    <Form onSubmit={handleSubmit} className="my-3">
      <div>
        <h5>Filtrar alumnos por categoría y nivel</h5>
        <hr />
      </div>
      <Row className="justify-content-center">
        <FormikSelectComp
          as={Col}
          controlId="FilterCategoryId"
          label="Categoría"
          options={CATEGORIES}
          icon={<Bookmark />}
          value={values.id_category}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
            setFieldValue("id_category", Number(ev.target.value));
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
            setFieldValue("id_level", Number(ev.target.value));
          }}
          errors={errors.id_level}
          name="id_level"
        />
      </Row>
      <div className="d-flex justify-content-end">
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

export default FilterScoresComp;
