import { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import { getProgress, updateProgress } from "../Services/ServiceCall";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const Progress = () => {
  const [progress, setProgress] = useState([]);
  const [update, setUpdate] = useState(false);
  const [topic, setTopic]=useState([])
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
          const uniqueTopics = [...new Set(res.data.map(item => item.topic))];
          console.log(uniqueTopics)
          setTopic(uniqueTopics);
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
              progress.map((val) => (
                <tr>
                  <td>
                    <Form>
                      <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
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
        </div>
    </>
  );
};

export default Progress;
