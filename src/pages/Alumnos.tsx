import { Container, Spinner } from "react-bootstrap";
import useUsers from "../hooks/useUsers";
import useMembers from "../hooks/useMembers";
import CardComp from "../components/CardComp";
import { MembersTableComp } from "../components/TableComp";
import CreateMemberComp from "../components/CreateMemberComp";
import Swal from "sweetalert2";
import FilterComp from "../components/FilterComp";
import type { FilterMembers } from "../validation/filterMembersValidatorSchema";
import PaginationComp from "../components/PaginationComp";
import { useState } from "react";
import useGyms from "../hooks/useGyms";
import { toast } from "sonner";

export default function Alumnos() {
  const { user } = useUsers();
  const { gyms } = useGyms();
  const {
    members,
    handleDeleteMember,
    handleGetMembers,
    loading,
    membersPagination,
  } = useMembers();
  const [filters, setFilters] = useState<FilterMembers | null>(null);
  const [actualPage, setActualPage] = useState(1);
  const [loadingFilter, setLoadingFilter] = useState(true);

  const onClickDelete = (id: number) => {
    Swal.fire({
      title: "¿Está seguro de eliminar este alumno?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16b800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteMember(id);
      }
    });
  };

  const submitFilter = async (paramFilters: FilterMembers) => {
    if (user && user.role === "Administrador" && paramFilters.id_gym === 0) {
      toast.error("Debe seleccionar un gimnasio");
      return;
    }
    await handleGetMembers(paramFilters, actualPage);
  };

  const handlePageChange = async (page: number) => {
    if (filters) await handleGetMembers(filters, page);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <CardComp user={user} color="danger" textColor="white" />
      </div>
      <div className="d-flex justify-content-between">
        <h3>Tabla de alumnos</h3>
        {user && user.role === "Gimnasio" && <CreateMemberComp />}
      </div>
      <hr />
      <h4>Filtrar por:</h4>
      <FilterComp
        submitFilter={submitFilter}
        setFilters={setFilters}
        setLoadingFilter={setLoadingFilter}
        gyms={gyms}
        user={user}
        color="danger"
        textColor="white"
      />
      <hr />
      {!loadingFilter ? (
        <>
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Spinner variant="dark" />
              <h4>Obteniendo alumnos...</h4>
            </div>
          ) : !members ||
            (members.length === 0 &&
              membersPagination &&
              membersPagination.total === 0) ? (
            <h4 className="text-center">No se encontraron alumnos</h4>
          ) : members.length === 0 &&
            membersPagination &&
            membersPagination.total > 0 ? (
            <PaginationComp
              pagination={membersPagination}
              setActualPage={setActualPage}
              handlePageChange={handlePageChange}
            />
          ) : (
            <>
              <MembersTableComp
                members={members}
                headers={[
                  "DNI",
                  "Nombre y apellido",
                  "Fecha de nacimiento",
                  "Gimnasio",
                  "Categoría",
                  "Nivel",
                  "Acciones",
                ]}
                onClickDelete={onClickDelete}
                onClickRegister={() => {}}
              />
              {membersPagination && (
                <PaginationComp
                  pagination={membersPagination}
                  setActualPage={setActualPage}
                  handlePageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
