import type { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
} from "react-bootstrap-icons";

interface Props {
  pagination: Pagination;
  setActualPage: Dispatch<SetStateAction<number>>;
  handlePageChange: (page: number) => void;
}

const PaginationComp: React.FC<Props> = ({ pagination, setActualPage, handlePageChange }) => {
  const { page, totalPages } = pagination;
  const goToNextPage = () => {
    if (page < totalPages) {
      setActualPage((prevPage) => prevPage + 1);
      handlePageChange(page + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setActualPage((prevPage) => prevPage - 1);
      handlePageChange(page - 1);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
      <Button
        onClick={goToPreviousPage}
        disabled={pagination.page === 1}
        variant="dark"
        className="d-flex align-items-center gap-1"
      >
        <ArrowLeftCircleFill />
        <span>Anterior</span>
      </Button>
      <span>
        Página <strong>{pagination.page}</strong> de{" "}
        <strong>{pagination.totalPages}</strong>
      </span>
      <Button
        onClick={goToNextPage}
        disabled={pagination.page === pagination.totalPages}
        variant="dark"
        className="d-flex align-items-center gap-1"
      >
        <span>Siguiente</span>
        <ArrowRightCircleFill />
      </Button>
    </div>
  );
};

export default PaginationComp;
