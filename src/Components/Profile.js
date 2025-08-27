import { useEffect, useState , lazy, Suspense} from "react";
import NavigationBar from "./NavigationBar";
import { getStudent } from "../Services/ServiceCall";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getStudentProfile = async () => {
      await getStudent()
        .then((res) => {
          console.log(res.data.student);
          setStudent(res.data.student);
        })
        .catch((err) => {
          if (err.response.status >= 400 && err.response.status < 500) {
            //console.log(err.response.data.error);
            navigate("/login");
          }
        });
    };
    getStudentProfile();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container
        fluid
        className="d-flex mt-5 justify-content-center align-items-center bg-white "
      >
        <Card className="shadow p-4" style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title className="d-flex">
              <h1>{student && student.firstName} {student && student.lastName}</h1>
            </Card.Title>
            <br/>
            <Card.Text className="d-flex">
              Email: {student && student.email}
            </Card.Text>
            <Card.Text className="d-flex">
              Mobile: {student && student.mobile}
            </Card.Text>
            <Card.Text className="d-flex">
              Age: {student && student.age}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
