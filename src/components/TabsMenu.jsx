import Nav from "react-bootstrap/Nav";
import { useAppState } from "../context/appContext";

const TabsMenu = ({ setTabs, tab }) => {
  const { state } = useAppState();

  return (
    <Nav activeKey={tab} fill variant="tabs">
      <Nav.Item>
        <Nav.Link
          eventKey="eventos"
          onClick={() => {
            setTabs("eventos");
          }}
        >
          Eventos
        </Nav.Link>
      </Nav.Item>
      {state.login && (
        <Nav.Item>
          <Nav.Link
            eventKey="entradas"
            onClick={() => {
              setTabs("entradas");
            }}
          >
            Mis entradas
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default TabsMenu;
