import { useState, type ReactNode } from "react";
import { MembersContext } from "./MembersContext";

const MembersProvider = ({ children }: { children: ReactNode }) => {
  const [members, setMembers] = useState<FullMemberInfo[] | null>(null);
  const [membersPagination, setMembersPagination] = useState<Pagination | null>(null);

  return (
    <MembersContext.Provider value={{ members, setMembers, membersPagination, setMembersPagination }}>
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
