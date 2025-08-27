import { EnvelopeAt } from "react-bootstrap-icons";
import "../styles/Footer.css"; // Archivo CSS para los estilos
import { FacebookIcon, InstagramIcon } from "./Icons";
import { Link } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="footer-content">
        <Col md={4} sm={12} className="footer-section logo">
          <Image
            src="/logo_blanco.png"
            alt="Logo Federación Tucumana de Gimnasia"
            width={200}
            fluid
          />
        </Col>
        <Col
          md={4}
          sm={12}
          className="footer-section d-flex flex-column align-items-center"
        >
          <h1 className="logo-text">Federación Tucumana de Gimnasia</h1>
          <p className="footer-text d-flex flex-column align-items-center">
            <span>Gimnasia artística femenina y masculina</span>
            <span>Gimnasia Rítmica</span>
          </p>
          <div className="d-flex align-items-center gap-2">
            Contacto:
            <Link
              to={"mailto:fedetucdegimnasia@gmail.com"}
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-1"
            >
              <EnvelopeAt />
              <span>fedetucdegimnasia@gmail.com</span>
            </Link>
          </div>
        </Col>
        <Col md={4} sm={12} className="footer-section social ">
          <h1 className="logo-text">Redes sociales</h1>
          <div className="social-links">
            <Link
              to={"https://www.facebook.com/profile.php?id=100066369534804"}
            >
              <FacebookIcon className="facebook-icon" />
            </Link>
            <Link to={"https://www.instagram.com/fedtucdegimnasia"}>
              <InstagramIcon className="instagram-icon" />
            </Link>
          </div>
        </Col>
      </Row>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Federación Tucumana de Gimnasia |
        Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
