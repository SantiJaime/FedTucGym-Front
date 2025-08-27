import { Container } from "react-bootstrap";
import CreateTournamentComp from "../components/CreateTournamentComp";
import useTournaments from "../hooks/useTournaments";
import { TournamentsTableComp } from "../components/TableComp";
import Swal from "sweetalert2";

const AdministrarTorneos = () => {
  const { tournaments, handleDeleteTournament } = useTournaments();

  const deleteTournament = (id: number) => {
    Swal.fire({
      title: "¿Está seguro de eliminar este torneo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16b800",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteTournament(id);
      }
    });
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between">
        <h2>Administrar torneos</h2>
        <CreateTournamentComp />
      </div>
      <p>Aquí se mostrarán todos los torneos próximos y los nuevos que se vayan creando</p>
      <hr />
      {!tournaments || tournaments.length === 0 ? (
        <h3>No existen torneos próximos</h3>
      ) : (
        <TournamentsTableComp
          tournaments={tournaments}
          headers={[
            "Nombre",
            "Fecha de inicio | Fecha de fin",
            "Último día de inscripción",
            "Eliminar",
          ]}
          onClickDelete={deleteTournament}
        />
      )}
    </Container>
  );
};

export default AdministrarTorneos;
