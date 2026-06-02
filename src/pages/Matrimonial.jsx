import {

  Button,
  Form as BootstrapForm,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Navbar from "../components/Navbar/Navbar";
import Form from "../components/Form/Form";
import styles from "./Matrimonial.module.css";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Matrimonial = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/findyourmatch");
  };

  return (
    <>
      <Navbar />

      <Container className={styles.container}>
  <Row className="justify-content-end justify-content-sm-start mt-4">
    <Col xs="auto">
      <Button
        variant="warning"
        className={`${styles.login} px-2`}
        onClick={handleLoginClick}
      >
        सही जीवनसाथी ढूँढें
      </Button>
    </Col>
  </Row>
</Container>

      <Form />
    </>
  );
};

export default Matrimonial;
