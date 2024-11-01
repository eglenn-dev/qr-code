"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  const [qrCodeUrl, setQrCodeUrl] = useState("https://qr.eglenn.app");
  const [outputUrl, setOutputUrl] = useState("");
  const [light, setLight] = useState("#ffffff");
  const [dark, setDark] = useState("#000000");
  const [size, setSize] = useState(300);

  useEffect(() => {
    QRCode.toDataURL(qrCodeUrl, { width: size, color: { dark: dark, light: light } }, function (err: Error | null | undefined, url: string) {
      if (err) {
        console.log("Error generating QR code", err);
        return;
      }
      setOutputUrl(url);
    })
  }, [qrCodeUrl, size, light, dark]);

  return (
    <main className={styles.main}>
      <h1 className="gradient">QR Code Generator</h1>
      <section className={styles.grid}>
        <div className={styles.form}>
          <div className="coolinput">
            <label htmlFor="size" className="text">Size (px)</label>
            <input
              type="text"
              placeholder="Enter size in pixels"
              name="size"
              className="input"
              defaultValue={300}
              onChange={(e) => {
                if (!parseInt(e.target.value)) {
                  setSize(300);
                  return;
                }
                if (parseInt(e.target.value) > 1000) {
                  e.target.value = "1000";
                  setSize(1000);
                } else if (parseInt(e.target.value) < 50 || e.target.value === "") {
                  setSize(50);
                } else {
                  setSize(parseInt(e.target.value));
                }
              }}
            />
          </div>
          <div className="coolinput">
            <label htmlFor="url" className="text">URL</label>
            <input
              type="url"
              placeholder="Enter valid url"
              name="url"
              className="input"
              defaultValue="https://qr.eglenn.app"
              onChange={(e) => {
                if (e.target.value.includes("http://") || e.target.value.includes("https://")) {
                  setQrCodeUrl(e.target.value);
                } else {
                  setQrCodeUrl("https://" + e.target.value);
                }
              }}
            />
          </div>
          <div className="coolinput">
            <label htmlFor="light" className="text">BG</label>
            <input
              type="color"
              name="light"
              className="input"
              defaultValue="#ffffff"
              onChange={(e) => setLight(e.target.value)}
            />
          </div>
          <div className="coolinput">
            <label htmlFor="dark" className="text">Code</label>
            <input
              type="color"
              name="dark"
              className="input"
              defaultValue="#000000"
              onChange={(e) => setDark(e.target.value)}
            />
          </div>
          {outputUrl && <a href={outputUrl} download="qr-code.png" className={styles.downloadButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"></path></svg>
            <span>Download</span>
          </a>}
        </div>
        <div className={styles.imageArea}>
          <div style={{ height: (size + 50), width: (size + 50), maxWidth: "300px", maxHeight: "300px" }} className={styles.imageOutput}>
            {outputUrl && size && <Image src={outputUrl} alt="QR Code" width={size} height={size} />}
          </div>
        </div>
      </section>
    </main>
  );
}
