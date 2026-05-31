import { Button, Table } from "react-bootstrap";
import { ClipboardPlusFill, Trash3Fill } from "react-bootstrap-icons";
import CreateMemberComp from "./CreateMemberComp";
import CreateScoreModalComp from "./CreateScoreModalComp";

interface MembersProps {
  members: FullMemberInfo[];
  headers: string[];
  onClickDelete: (id: number) => void;
  onClickRegister: (member: FullMemberInfo) => void;
  actions?: boolean;
}

interface TournamentsProps {
  tournaments: Tournament[];
  headers: string[];
  onClickDelete: (id: number) => void;
}

interface MembersTournamentsProps {
  membersTournaments: MembersTournaments[];
  headers: string[];
  onClickDelete?: (
    id_member: number,
    id_tournament: number,
  ) => void;
  location: "scores" | "membersTournaments";
}

interface ScoresProps {
  scores: Score[];
  headers: string[];
}

export const MembersTableComp: React.FC<MembersProps> = ({
  members,
  headers,
  onClickDelete,
  actions = false,
  onClickRegister,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          {headers.map((option) => (
            <th key={option}>{option}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {members?.map((member) => (
          <tr key={member.id}>
            <td>{member.dni}</td>
            <td>{member.full_name}</td>
            <td>
              {member.birth_date} | {member.age} años
            </td>
            <td>{member.gym}</td>
            <td>{member.category}</td>
            <td className="text-center">{member.level}</td>
            <td>
              {!actions ? (
                <div className="d-flex justify-content-evenly">
                  <CreateMemberComp member={member} />
                  <Button
                    variant="danger"
                    className="d-flex align-items-center gap-1"
                    onClick={() => onClickDelete(member.id)}
                  >
                    <Trash3Fill />
                    <span>Eliminar</span>
                  </Button>
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Button
                    variant="warning"
                    className="d-flex align-items-center gap-1"
                    onClick={() => onClickRegister(member)}
                  >
                    <ClipboardPlusFill />
                    <span>Inscribir al torneo</span>
                  </Button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export const MembersNotInTournamentTableComp: React.FC<MembersProps> = ({
  members,
  headers,
  onClickRegister,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          {headers.map((option) => (
            <th key={option}>{option}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {members?.map((member) => (
          <tr key={member.id}>
            <td>{member.dni}</td>
            <td>{member.full_name}</td>
            <td>{member.gym}</td>
            <td>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="d-flex align-items-center gap-1"
                  onClick={() => onClickRegister(member)}
                >
                  <ClipboardPlusFill />
                  <span>Inscribir al torneo</span>
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export const TournamentsTableComp: React.FC<TournamentsProps> = ({
  tournaments,
  headers,
  onClickDelete,
}) => {
  function formatDateRange(range: string): string {
    const cleaned = range.replace(/[[\]()]/g, "");
    const [start, end] = cleaned.split(",");

    const startDate = new Date(start);
    const endDate = new Date(end);

    endDate.setDate(endDate.getDate() - 1);

    const format = (date: Date) => date.toISOString().split("T")[0];

    return `${format(startDate)} | ${format(endDate)}`;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          {headers.map((option) => (
            <th key={option}>{option}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tournaments?.map((tournament) => (
          <tr key={tournament.id}>
            <td>{tournament.name}</td>
            <td className="text-center">
              {formatDateRange(tournament.date_range)}
            </td>
            <td className="text-center">{tournament.inscription_date_end}</td>
            <td>
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  className="d-flex align-items-center gap-1"
                  onClick={() => onClickDelete(tournament.id)}
                >
                  <Trash3Fill />
                  <span>Eliminar</span>
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const MembersTournamentsTableComp: React.FC<MembersTournamentsProps> = ({
  headers,
  membersTournaments,
  onClickDelete,
  location,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          {headers.map((option) => (
            <th key={option}>{option}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {membersTournaments?.map((mt) => (
          <tr key={`${mt.id_gym}-${mt.id_tournament}-${mt.full_name}`}>
            <td>{mt.dni}</td>
            <td>{mt.full_name}</td>
            <td>{mt.gym}</td>
            <td>
              <div className="d-flex justify-content-center">
                {location === "membersTournaments" && onClickDelete ? (
                  <Button
                    variant="danger"
                    className="d-flex align-items-center gap-1"
                    onClick={() =>
                      onClickDelete(mt.id_member, mt.id_tournament)
                    }
                  >
                    <Trash3Fill />
                    <span>
                      Eliminar
                    </span>
                  </Button>
                ) : (
                  <CreateScoreModalComp member={mt} />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const ScoresTableComp: React.FC<ScoresProps> = ({ headers, scores }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          {headers.map((option) => (
            <th key={option}>{option}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <tr key={score.id}>
            <td>{score.member_dni}</td>
            <td>{score.member_name}</td>
            <td>{score.gym}</td>
            <td className="text-center">{score.puntaje}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
