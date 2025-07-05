import React, { useState, useEffect } from "react";
import { texts } from "../data/texts";
import styles from "../styles/App.module.css";

export default function Detail({ textId, onBack }) {
  const text = texts.find((t) => t.id === textId);
  const [showTranslations, setShowTranslations] = useState(false);
  const [openPersian, setOpenPersian] = useState([]);
  const [printMode, setPrintMode] = useState(null); // null | 'de' | 'both'

  useEffect(() => {
    setOpenPersian(Array(text?.content.length || 0).fill(false));
  }, [textId]);

  const handleParagraphClick = (idx) => {
    setOpenPersian((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const handlePrint = (mode) => {
    setPrintMode(mode);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintMode(null), 500);
    }, 100);
  };

  if (!text) {
    return (
      <main className={styles.container}>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-color)",
            marginTop: 80,
          }}
        >
          متن مورد نظر یافت نشد.
        </p>
        <div className={styles.fabBar}></div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1>{text.title.de}</h1>
      <h2>{text.title.fa}</h2>

      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <button
          className={styles.printButton}
          onClick={() => handlePrint("de")}
        >
          Print Deutsch
        </button>
        <button
          className={styles.printButton}
          onClick={() => handlePrint("both")}
        >
          Print Deutsch + Persisch
        </button>
      </div>

      <div className={styles.progressContainer}></div>

      {/* ✅ بخش پرینت‌شدنی */}
      <div className="print-root">
        <section className={styles.textContent}>
          {text.content.map((p, i) => (
            <div
              key={i}
              className={styles.textParagraph}
              style={
                printMode
                  ? { margin: 0, padding: 0, boxShadow: "none", border: "none" }
                  : {}
              }
            >
              <p
                className={styles.germanText}
                dir="ltr"
                lang="de"
                onClick={() => handleParagraphClick(i)}
                style={{ cursor: "pointer", userSelect: "none" }}
                title="ترجمه / übersetzung"
              >
                {p.de}
              </p>
              <p
                className={styles.persianText}
                dir="rtl"
                lang="fa"
                style={{
                  display:
                    printMode === "both"
                      ? "block"
                      : printMode === "de"
                      ? "none"
                      : showTranslations || openPersian[i]
                      ? "block"
                      : "none",
                  fontWeight: printMode ? 500 : undefined,
                  color: printMode ? "#000" : undefined,
                }}
              >
                {p.fa}
              </p>
            </div>
          ))}
        </section>
      </div>

      {/* ✅ دکمه‌های شناور */}
      <div className={styles.fabBar}>
        <button
          className={`${styles.fabBtn} ${styles.fabBack}`}
          onClick={onBack}
          title="بازگشت"
        >
          Back
        </button>
        <button
          className={`${styles.fabBtn} ${styles.fabToggle}`}
          onClick={() => setShowTranslations((v) => !v)}
          title={
            showTranslations ? "مخفی کردن همه ترجمه‌ها" : "نمایش همه ترجمه‌ها"
          }
        >
          {showTranslations ? "Deutsch" : "فارسی"}
        </button>
      </div>

      {/* ✅ استایل پرینت */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .print-root, .print-root * {
            visibility: visible !important;
          }
          .print-root {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 0 !important;
            margin: 0 !important;
          }
          .${styles.textContent}, .${styles.textParagraph} {
            display: block !important;
            background: #fff !important;
            color: #000 !important;
            font-size: 12px !important;
            font-family: Tahoma, Arial, sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .${styles.germanText} {
            color: #000 !important;
            font-size: 12px !important;
            margin: 0 0 2px 0 !important;
            padding: 0 !important;
            font-weight: 400 !important;
            direction: ltr !important;
            text-align: left !important;
          }
          .${styles.persianText} {
            color: #00202e !important;
            font-size: 12px !important;
            margin: 0 0 8px 0 !important;
            padding: 0 !important;
            font-weight: 500 !important;
            direction: rtl !important;
            text-align: right !important;
            background: #fff !important;
          }
        }

        @page {
          size: A4 portrait;
          margin: 0.7cm;
        }
      `}</style>
    </main>
  );
}
