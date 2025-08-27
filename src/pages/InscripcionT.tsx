import useUsers from "../hooks/useUsers";
import CardComp from "../components/CardComp";
import useTournaments from "../hooks/useTournaments";
import { Container, Nav, Spinner } from "react-bootstrap";
import { useState } from "react";
import {
  MembersNotInTournamentTableComp,
  MembersTournamentsTableComp,
} from "../components/TableComp";
import useMembers from "../hooks/useMembers";
import SelectTournamentComp from "../components/SelectTournamentComp";
import FilterScoresComp from "../components/FilterScoresComp";
import type { FilterScores } from "../validation/filterScoresValidatorSchema";
import PaginationComp from "../components/PaginationComp";

export default function InscripcionTorneos() {
  const { user } = useUsers();
  const { handleRegisterToTournament } = useMembers();
  const {
    tournaments,
    loading,
    selectedTournament,
    setSelectedTournament,
    membersTournaments,
    membersNotInTournament,
    handleUpdatePayMemberTournament,
    handleGetMembersTournamentsByGym,
    membersTournamentsPagination,
    membersNotInTournamentsPagination,
  } = useTournaments();
  const [activeKey, setActiveKey] = useState("registrados");
  const [loadingFilter, setLoadingFilter] = useState(true);
  const [filters, setFilters] = useState<FilterScores | null>(null);
  const [actualPage, setActualPage] = useState(1);
  const [, setActualPageMNT] = useState(1);

  const condition = selectedTournament !== 0 && loadingFilter === false;

  const handlePaid = async (
    id_member: number,
    id_tournament: number,
    paid: boolean
  ) => {
    await handleUpdatePayMemberTournament({ paid, id_tournament, id_member });
  };

  const registerToTournament = async (member: FullMemberInfo) => {
    await handleRegisterToTournament(member);
  };

  const handleFilter = async (values: FilterScores) => {
    setLoadingFilter(false);
    await handleGetMembersTournamentsByGym(values, actualPage);
  };

  const handlePageChangeMT = async (page: number) => {
    if (filters) {
      await handleGetMembersTournamentsByGym(filters, page);
    }
  };
  const handlePageChangeMNT = async (page: number) => {
    if (filters) {
      await handleGetMembersTournamentsByGym(filters, page);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center min-vh-60 pt-5">
        <CardComp user={user} color="warning" textColor="dark">
          <SelectTournamentComp
            selectedTournament={selectedTournament}
            setSelectedTournament={setSelectedTournament}
            tournaments={tournaments}
            loading={loading}
            paginationInfo={null}
            handleLoadMoreTournaments={() => Promise.resolve()}
          />
        </CardComp>
      </div>
      <Container>
        {selectedTournament !== 0 && (
          <FilterScoresComp
            submitFilter={handleFilter}
            setFilters={setFilters}
          />
        )}
        {condition && (
          <Nav
            fill
            variant="tabs"
            defaultActiveKey={activeKey}
            className="mt-3"
          >
            <Nav.Item>
              <Nav.Link
                eventKey={"registrados"}
                onClick={() => setActiveKey("registrados")}
              >
                Alumnos registrados
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey={"/inscribir"}
                onClick={() => setActiveKey("inscribir")}
              >
                Alumnos para inscribir
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        {condition && activeKey === "registrados" ? (
          <div className="mt-3">
            {loading ? (
              <div className="d-flex justify-content-center gap-1">
                <Spinner animation="border" variant="dark" />
                <h4 className="text-white">Cargando...</h4>
              </div>
            ) : !membersTournaments || membersTournaments.length === 0 ? (
              <h4 className="text-center mt-3">
                No hay alumnos registrados en este torneo
              </h4>
            ) : (
              <>
                <MembersTournamentsTableComp
                  headers={[
                    "DNI del alumno",
                    "Nombre y apellido del alumno",
                    "Gimnasio",
                    "Pagado",
                    "Acciones",
                  ]}
                  location="membersTournaments"
                  membersTournaments={membersTournaments}
                  onClickPaid={handlePaid}
                />
                {membersTournamentsPagination && (
                  <PaginationComp
                    pagination={membersTournamentsPagination}
                    handlePageChange={handlePageChangeMT}
                    setActualPage={setActualPage}
                  />
                )}
              </>
            )}
          </div>
        ) : condition && activeKey === "inscribir" ? (
          <div className="mt-3">
            {loading ? (
              <div className="d-flex justify-content-center gap-1">
                <Spinner animation="border" variant="dark" />
                <h4 className="text-white">Cargando...</h4>
              </div>
            ) : !membersNotInTournament ||
              membersNotInTournament.length === 0 ? (
              <h4 className="text-center mt-3">
                No hay alumnos para inscribir al torneo
              </h4>
            ) : (
              <>
                <MembersNotInTournamentTableComp
                  headers={["DNI", "Nombre", "Gimnasio", "Acciones"]}
                  members={membersNotInTournament}
                  onClickDelete={() => {}}
                  onClickRegister={registerToTournament}
                />
                {membersNotInTournamentsPagination && (
                  <PaginationComp
                    pagination={membersNotInTournamentsPagination}
                    handlePageChange={handlePageChangeMNT}
                    setActualPage={setActualPageMNT}
                  />
                )}
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}
