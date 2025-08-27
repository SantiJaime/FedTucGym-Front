import { useContext } from "react";
import { ScoresContext } from "../context/scores/ScoresContext";

const useScoresContext = () => {
  const context = useContext(ScoresContext);
  if (!context) {
    throw new Error("useScoresContext debe usarse dentro de <ScoresProvider>");
  }
  return context;
};

export default useScoresContext;
