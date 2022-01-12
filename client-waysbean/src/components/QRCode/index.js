import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import QRCode from "qrcode";

import styles from "./QRCode.module.css";

const QrCodeComponent = ({ code }) => {
  const dataCode = {
    transation_Id: code.id,
    subtotal: code.subtotal,
    status: code.status,
  };

  const codeString = JSON.stringify(dataCode);
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(codeString).then((data) => {
      setQr(data);
    });
  }, []);

  console.log(code);
  return (
    <div className={styles.QRWrapper}>
      <Image src={qr} fluid />
    </div>
  );
};

export default QrCodeComponent;
