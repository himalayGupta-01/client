import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { getProgress, updateProgress } from "../Services/ServiceCall";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [update, setUpdate] = useState(false);
  const [topic, setTopic] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, id) => {
    const isChecked = event.target.checked;
    updateProgress(id, isChecked)
      .then((res) => {
        // console.log(res.data);
        setUpdate(!update);
      })
      .catch((err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
          //console.log(err.response.data.error);
          navigate("/login");
        }
      });
  };
  useEffect(() => {
    const getStudentProgress = async () => {
      await getProgress()
        .then((res) => {
          // console.log(res.data);
          setProgress(res.data);
          setTopic([...new Set(res.data.map((item) => item.topic))]);
        })
        .catch((err) => {
          if (err.response.status >= 400 && err.response.status < 500) {
            // console.log(err.response.data.error);
            navigate("/login");
          }
        });
    };
    getStudentProgress();
  }, [update]);

  return (
    <>
      <NavigationBar />
      <div className="my-5 px-5">
        <Tabs
          defaultActiveKey={topic ? topic[0]: ""}
          className="mb-3"
        >
          {topic &&
            topic.map((temp) => (
              <Tab eventKey={temp} title={temp}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Completed</th>
                      <th>Problem</th>
                      <th>Leet Code</th>
                      <th>Article</th>
                      <th>Youtube Link</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progress &&
                      progress.filter((t)=>t.topic===temp).map((val) => (
                        <tr>
                          <td>
                            <Form>
                              <Form.Check
                                type="switch"
                                onChange={(e) => handleChange(e, val._id)}
                                checked={val.completed}
                              />
                            </Form>
                          </td>
                          <td>{val.subTopic}</td>
                          <td>{val.leetCodeLink}</td>
                          <td>{val.articleLink}</td>
                          <td>{val.ytLink}</td>
                          <td>{val.levelIndicator}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Tab>
            ))}
        </Tabs>
      </div>
    </>
  );
};

export default Progress;
