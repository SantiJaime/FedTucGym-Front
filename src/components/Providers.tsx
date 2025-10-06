import { type ReactNode } from "react";
import MembersProvider from "../context/members/MembersProvider";
import TournamentsProvider from "../context/tournaments/TournamentsProvider";
import MembersTournamentsProvider from "../context/members_tournaments/MembersTournamentsProvider";
import UserProvider from "../context/user/UserProvider";
import GymsProvider from "../context/gyms/GymsProvider";

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <UserProvider>
      <GymsProvider>
        <MembersProvider>
          <TournamentsProvider>
            <MembersTournamentsProvider>
              {children}
            </MembersTournamentsProvider>
          </TournamentsProvider>
        </MembersProvider>
      </GymsProvider>
    </UserProvider>
  );
};

export default Providers;
