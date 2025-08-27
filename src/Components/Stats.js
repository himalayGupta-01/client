import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
import { getProgressStats } from "../Services/ServiceCall";
import Table from "react-bootstrap/Table";

const Stats = () => {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getStats = async () => {
      await getProgressStats()
        .then((res) => {
          // console.log(res.data);
          setStats(res.data);
        })
        .catch((err) => {
          if (err.response.status >= 400 && err.response.status < 500) {
            // console.log(err.response.data.error);
            navigate("/login");
          }
        });
    };
    getStats();
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
              <h1>Your Statistics</h1>
            </Card.Title>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Status/Level</th>
                  <th>Solved</th>
                  <th>Total</th>
                  <th>% Completed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Easy</th>
                  <td>{stats && stats.EasySolved}</td>
                  <td>{stats && stats.EasyTotal}</td>
                  <td>
                    {stats && (stats.EasySolved / stats.EasyTotal) * 100}%
                  </td>
                </tr>
                <tr>
                  <th>Medium</th>
                  <td>{stats && stats.MediumSolved}</td>
                  <td>{stats && stats.MediumTotal}</td>
                  <td>
                    {stats && (stats.MediumSolved / stats.MediumTotal) * 100}%
                  </td>
                </tr>
                <tr>
                  <th>Hard</th>
                  <td>{stats && stats.ToughSolved}</td>
                  <td>{stats && stats.ToughTotal}</td>
                  <td>
                    {stats && (stats.ToughSolved / stats.ToughTotal) * 100}%
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Stats;
