import { toast } from "sonner";
import useUsers from "./useUsers";
import { getUsersByRole } from "../helpers/userQueries";
import { useCallback, useEffect } from "react";
import useGymsContext from "./useGymsContext";

const useGyms = () => {
  const { gyms, setGyms } = useGymsContext();
  const { user, handleLogout } = useUsers();

  const handleGetGyms = useCallback(async () => {
    try {
      const res = await getUsersByRole(3);
      setGyms(res.users);
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.error);
      if (err.redirect) {
        await handleLogout();
      }
    }
  }, [setGyms, handleLogout]);

  useEffect(() => {
    if (user && user.role === "Administrador") {
      handleGetGyms();
    }
  }, [user, handleGetGyms]);

  return {
    gyms,
    handleGetGyms,
  };
};

export default useGyms;
