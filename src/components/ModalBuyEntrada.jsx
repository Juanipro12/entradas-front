import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Qr from "./Qr";
import { useAppState } from "../context/appContext";

const ModalBuyEntrada = ({ id, handleClose }) => {
  const [qr, setQr] = useState(null);
  const { addEntrada } = useAppState();

  useEffect(() => {
    setQr(null);
  }, [id]);
  const confirmarCompra = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URI_API}api/entradas/generar-qr`,
        { eventoId: id }
      );
      addEntrada(response.data);
      setQr(response.data.qr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      show={id !== null}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{qr == null ? "Confirmar Compra" : "Entrada"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {qr == null ? (
          "Esta seguro que quieres comprar esta entrada?"
        ) : (
          <div className="d-flex justify-content-center">
            <Qr qrCodeBase64={qr} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {qr == null && (
          <Button variant="primary" onClick={confirmarCompra}>
            Comprar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBuyEntrada;
