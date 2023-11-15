import { Button, Row } from "react-bootstrap";
import "./App.css";
import Loader from "./components/Loader";
import Login from "./components/Login";
import { useAppState } from "./context/appContext";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import ModalBuyEntrada from "./components/ModalBuyEntrada";
import TabsMenu from "./components/TabsMenu";
import Qr from "./components/Qr";
import UploadQr from "./components/UploadQr";

function App() {
  const { state } = useAppState();
  const [idEvento, setIdEvento] = useState(null);
  const [tabs, setTabs] = useState("eventos");
  const buyEntrada = (id) => {
    setIdEvento(id);
  };
  return (
    <>
      <h1>Entradas</h1>
      <div>
        {state.isInitialized ? (
          state.login ? (
            <>{state.user.email}</>
          ) : (
            <Login />
          )
        ) : (
          <Loader />
        )}
        {state.login && (
          <ModalBuyEntrada
            id={idEvento}
            handleClose={() => {
              setIdEvento(null);
            }}
          />
        )}
        <TabsMenu setTabs={setTabs} tab={tabs} />
        {tabs == "eventos" && (
          <Row>
            {state.eventoList.map((evento) => {
              return (
                <Card key={evento.id}>
                  <Card.Header>{evento.nombre}</Card.Header>
                  <Card.Body>
                    <Card.Title>{evento.estado}</Card.Title>

                    <Button
                      variant="primary"
                      onClick={() => {
                        buyEntrada(evento.id);
                      }}
                    >
                      Comprar entrada
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        )}
        {tabs == "entradas" && (
          <Row>
            {state.entradaList.map((entrada) => {
              return (
                <Card key={entrada.id}>
                  <Card.Header>Evento: {entrada.Evento.nombre}</Card.Header>
                  <Card.Body>
                    <Card.Title>{entrada.Evento.estado}</Card.Title>
                    <Qr qrCodeBase64={entrada.qr} />
                  </Card.Body>
                </Card>
              );
            })}
          </Row>
        )}
      </div>
    </>
  );
}

export default App;
