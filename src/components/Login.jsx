import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAppState } from "../context/appContext";

const Login = () => {
  const [email, setEmail] = useState('')

  const { onLogin } = useAppState()

  const login = async (e) =>{
    e.preventDefault()
    onLogin(email)
  }

  return (
    <>
    <Card className="text-center">
      <Card.Header>Login</Card.Header>
      <Card.Body>
        <InputGroup size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg">Email</InputGroup.Text>
          <Form.Control
            onChange={(e)=>{setEmail(e.target.value);}}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <Button className="m-4" variant="primary" onClick={login}>Login</Button>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </>
  );
};

export default Login;
