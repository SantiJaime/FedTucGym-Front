import React, { createContext } from "react";

type MembersContextType = {
  members: FullMemberInfo[] | null;
  setMembers: React.Dispatch<React.SetStateAction<FullMemberInfo[] | null>>;
  membersPagination: Pagination | null;
  setMembersPagination: React.Dispatch<React.SetStateAction<Pagination | null>>;
};

export const MembersContext = createContext<MembersContextType | undefined>(undefined);