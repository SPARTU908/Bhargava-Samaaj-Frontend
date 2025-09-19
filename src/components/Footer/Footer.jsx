import { Container, Row, Col, Image } from "react-bootstrap";
import logo2 from "../../assets/samaajlogo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className=" text-dark   mt-4 w-full">
      <div>
        <Row
          className="align-items-center"
          style={{ backgroundColor: "#ea8d0c" }}
        >
          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <Image src={logo2} alt="Footer Logo" height={120} rounded />
          </Col>
          <Col xs={12} md={8} className="text-white text-center text-md-start">
            <h5 className="mb-2">Contact Details</h5>
            <p className="mb-1">Phone no: 9414076842</p>
            <p className="mb-0">
              401, 3rd Floor, Empire Apartment Mehroli,
              <br />
              Gurgaon Road, Sultanpur, New Delhi - 30
            </p>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
