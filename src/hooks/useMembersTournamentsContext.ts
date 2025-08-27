import { useContext } from "react";
import { MembersTournamentsContext } from "../context/members_tournaments/MembersTournamentsContext";

const useMembersTournamentsContext = () => {
  const context = useContext(MembersTournamentsContext);
  if (!context) {
    throw new Error(
      "useMembersTournamentsContext debe ser usando dentro de <MembersTournamentsProvider>"
    );
  }
  return context;
};

export default useMembersTournamentsContext;