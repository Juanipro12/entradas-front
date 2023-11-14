import QRCode from 'react-qr-code'

const Qr = ({qrCodeBase64}) => {
  return (
    <div>
      <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code" />
    </div>
  )
}

export default Qr
