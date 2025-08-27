import React, { createContext } from "react";

type ScoresContextType = {
  scores: Score[] | null;
  setScores: React.Dispatch<React.SetStateAction<Score[] | null>>;
  scoresPagination: Pagination | null;
  setScoresPagination: React.Dispatch<React.SetStateAction<Pagination | null>>;
};

export const ScoresContext = createContext<ScoresContextType | undefined>(
  undefined
);
