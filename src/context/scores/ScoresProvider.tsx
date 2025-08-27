import { useState, type ReactNode } from "react";
import { ScoresContext } from "./ScoresContext";

const ScoresProvider = ({ children }: { children: ReactNode }) => {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [scoresPagination, setScoresPagination] = useState<Pagination | null>(null);

  return (
    <ScoresContext.Provider value={{ scores, setScores, scoresPagination, setScoresPagination }}>
      {children}
    </ScoresContext.Provider>
  );
};

export default ScoresProvider;
