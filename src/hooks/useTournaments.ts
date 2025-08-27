import { toast } from "sonner";
import useTournamentsContext from "./useTournamentsContext";
import useUsers from "./useUsers";
import {
  createTournament,
  deleteTournament,
  getMembersNotInTournament,
  getMembersTournaments,
  getMembersTournamentsByGym,
  getPastTournaments,
  getTournaments,
  updatePayMemberTournament,
} from "../helpers/tournamentsQueries";
import { useCallback, useEffect, useState } from "react";
import useMembersTournamentsContext from "./useMembersTournamentsContext";
import type { FilterScores } from "../validation/filterScoresValidatorSchema";

const useTournaments = () => {
  const {
    tournaments,
    setTournaments,
    pastTournaments,
    setPastTournaments,
    nextTournament,
    setNextTournament,
    paginationInfo,
    setPaginationInfo,
  } = useTournamentsContext();
  const {
    membersTournaments,
    setMembersTournaments,
    membersNotInTournament,
    setMembersNotInTournament,
    selectedTournament,
    setSelectedTournament,
    membersTournamentsPagination,
    setMembersTournamentsPagination,
    membersNotInTournamentsPagination,
    setMembersNotInTournamentsPagination,
  } = useMembersTournamentsContext();

  const { handleLogout, user } = useUsers();
  const [loading, setLoading] = useState(false);

  const handleGetTournaments = useCallback(async () => {
    try {
      setLoading(true);
      const resTournaments = await getTournaments();
      setTournaments(resTournaments.tournaments);
      const resPastTournaments = await getPastTournaments();
      setPastTournaments(resPastTournaments.tournaments);
      setPaginationInfo(resPastTournaments.paginationInfo);
      setNextTournament(resPastTournaments.tournaments[0]);
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.error);
      if (error.redirect) {
        await handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [
    handleLogout,
    setTournaments,
    setPastTournaments,
    setNextTournament,
    setPaginationInfo,
  ]);

  const handleLoadMoreTournaments = async (page: number) => {
    try {
      setLoading(true);
      const res = await getPastTournaments(page);
      setPastTournaments((prevTournaments) => [
        ...(prevTournaments ?? []),
        ...res.tournaments,
      ]);
      setPaginationInfo(res.paginationInfo);
      toast.success("Se han cargado más torneos a la lista");
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.error);
      if (err.redirect) {
        await handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetMembersTournaments = async (
    dataIds: FilterScores,
    page: number
  ) => {
    try {
      setLoading(true);
      const resMT = await getMembersTournaments(
        {
          ...dataIds,
          id_tournament: selectedTournament,
        },
        page
      );
      setMembersTournaments(resMT.membersTournaments);
      setMembersTournamentsPagination(resMT.pagination);
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.error);
      if (error.redirect) {
        await handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetMembersTournamentsByGym = async (
    dataIds: FilterScores,
    page: number
  ) => {
    if (!user) {
      toast.error(
        "Debe iniciar sesión para ver los alumnos registrados a este torneo"
      );
      return;
    }
    try {
      setLoading(true);
      const resMT = await getMembersTournamentsByGym(
        {
          ...dataIds,
          id_gym: user.userId,
          id_tournament: selectedTournament,
        },
        page
      );
      setMembersTournaments(resMT.membersTournaments);
      setMembersTournamentsPagination(resMT.pagination);
      const resMNT = await getMembersNotInTournament(
        {
          ...dataIds,
          id_gym: user.userId,
          id_tournament: selectedTournament,
        },
        page
      );
      setMembersNotInTournament(resMNT.members);
      setMembersNotInTournamentsPagination(resMNT.pagination);
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.error);
      if (error.redirect) {
        await handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && tournaments === null) {
      handleGetTournaments();
    }
  }, [user, tournaments, handleGetTournaments]);

  const handleCreateTournament = async (tournament: CreateTournament) => {
    if (!user || user.role !== "Administrador") {
      toast.error(
        "Debe iniciar sesión y ser Administrador para crear un torneo"
      );
      return;
    }
    try {
      const newTournament = await createTournament(tournament);
      toast.success(newTournament.message);
      setTournaments([...(tournaments ?? []), newTournament.tournament]);
      return true;
    } catch (err) {
      const error = err as ErrorResponse;

      toast.error(error.error);
      if (error.redirect) {
        handleLogout();
      }
    }
  };

  const handleDeleteTournament = async (id: number) => {
    try {
      const res = await deleteTournament(id);
      setTournaments((prevState) =>
        (prevState ?? []).filter((t) => t.id !== id)
      );
      toast.success(res.message);
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.error);
      if (error.redirect) {
        await handleLogout();
      }
    }
  };

  const handleUpdatePayMemberTournament = async (
    data: UpdatePayMemberTournamentData
  ) => {
    try {
      const res = await updatePayMemberTournament(data);
      setMembersTournaments((prevState) =>
        (prevState ?? []).map((mt) =>
          mt.id_member === data.id_member &&
          mt.id_tournament === data.id_tournament
            ? { ...mt, paid: data.paid }
            : mt
        )
      );

      toast.success(res.message);
    } catch (err) {
      const error = err as ErrorResponse;
      toast.error(error.error);
      if (error.redirect) {
        await handleLogout();
      }
    }
  };

  return {
    tournaments,
    pastTournaments,
    handleCreateTournament,
    handleDeleteTournament,
    handleGetMembersTournaments,
    handleGetMembersTournamentsByGym,
    handleUpdatePayMemberTournament,
    membersTournaments,
    membersNotInTournament,
    loading,
    selectedTournament,
    setSelectedTournament,
    setMembersTournaments,
    membersTournamentsPagination,
    setMembersTournamentsPagination,
    membersNotInTournamentsPagination,
    setMembersNotInTournamentsPagination,
    nextTournament,
    paginationInfo,
    handleLoadMoreTournaments
  };
};

export default useTournaments;
