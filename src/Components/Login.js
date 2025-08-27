import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../Services/AuthCall";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    setError("");
    e.preventDefault();
    await login({ email: email, password: password })
      .then((result) => {
        if (result) {
          navigate("/");
        }
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        if (error.response.status >= 400 && error.response.status <= 500) {
          setError("Invalid Credentails");
        }
      });
  };

  useEffect(() => {
    async function doLogout() {
      await logout().then((result) => {
        // console.log(result.data.message);
      });
    }
    doLogout();
  }, []);

  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center bg-light"
    >
      <Row>
        <Col>
          <Card className="shadow-lg p-4 rounded-4" style={{ width: "24rem" }}>
            <h3 className="text-center mb-4">Login</h3>
            <Form onSubmit={loginUser}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Login
              </Button>
              {error && (
                <div className="text-center text-danger mt-3">
                  <small>{error}</small>
                </div>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
