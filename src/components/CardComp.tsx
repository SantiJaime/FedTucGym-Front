import type { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface Props {
  user: UserInfo | null;
  color: ColorType;
  textColor: "white" | "dark";
  children?: ReactNode;
}

const CardComp: React.FC<Props> = ({ user, color, textColor, children }) => {
  return (
    <Card
      bg={color}
      text={textColor}
      style={{ width: "35rem" }}
      className="mb-2"
    >
      <Card.Header
        className="text-center"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        {user?.role}: {user?.full_name}
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          Número de asociado: {user?.userId}
        </Card.Title>
        {user?.id_category && user.id_category > 1 && (
          <Card.Text style={{ fontSize: "1.1rem" }}>
            Categoría: {user.category}
          </Card.Text>
        )}
        {children && (
          <div className="d-flex justify-content-center mt-4">{children}</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardComp;
