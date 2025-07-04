import React, { useState } from 'react';
import { texts } from '../data/texts';
import styles from '../styles/App.module.css';

export default function Detail({ textId, onBack }) {
  const text = texts.find(t => t.id === textId);
  const [showTranslations, setShowTranslations] = useState(false);
  const [openPersian, setOpenPersian] = useState([]);
  const [printMode, setPrintMode] = useState(null); // null | 'de' | 'both'

  if (!text) {
    return (
      <main className={styles.container}>
        <button className={styles.backBtn} onClick={onBack}>
          بازگشت
        </button>
        <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
          متن مورد نظر یافت نشد.
        </p>
      </main>
    );
  }

  // Ensure openPersian is always the right length
  React.useEffect(() => {
    setOpenPersian(Array(text.content.length).fill(false));
  }, [textId]);

  const handleParagraphClick = idx => {
    setOpenPersian(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  // Print logic
  const handlePrint = (mode) => {
    setPrintMode(mode);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintMode(null), 500);
    }, 100);
  };

  return (
    <main className={styles.container}>
      <button className={styles.backBtn} onClick={onBack}>
        Zuruck
      </button>
      <h1>{text.title.de}</h1>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <button className={styles.toggleTranslationBtn} onClick={() => handlePrint('de')}>
          پرینت فقط آلمانی
        </button>
        <button className={styles.toggleTranslationBtn} onClick={() => handlePrint('both')}>
          پرینت با ترجمه
        </button>
      </div>
      <div className={styles.progressContainer}>
        {/* Progress bar can be implemented with scroll event if needed */}
      </div>
      <div className={styles.globalToggleContainer}>
        <button
          className={styles.toggleTranslationBtn}
          onClick={() => setShowTranslations(v => !v)}
        >
          {showTranslations ? 'Nur Deutsch' : 'Mit Persich'}
        </button>
      </div>
      {/* Print-only header */}
      <div id="print-header" style={{ display: 'none' }}>
        <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>deutschtext.ir</div>
        <div style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 8 }}>{text.title.de}</div>
      </div>
      <section className={styles.textContent}>
        {text.content.map((p, i) => (
          <div key={i} className={styles.textParagraph}
            style={printMode ? { margin: 0, padding: 0, boxShadow: 'none', border: 'none' } : {}}>
            <p
              className={styles.germanText}
              dir="ltr"
              lang="de"
              onClick={() => handleParagraphClick(i)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
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
                  printMode === 'both'
                    ? 'block'
                    : printMode === 'de'
                    ? 'none'
                    : showTranslations || openPersian[i]
                    ? 'block'
                    : 'none',
                fontWeight: printMode ? 500 : undefined,
                color: printMode ? '#fff' : undefined,
              }}
            >
              {p.fa}
            </p>
          </div>
        ))}
      </section>
      {/* Print styles */}
      <style>{`
        @media print {
          html, body, * {
            background: #fff !important;
            color: #000 !important;
            -webkit-print-color-adjust: exact;
            box-shadow: none !important;
            border: none !important;
          }
          #print-header {
            display: block !important;
            text-align: center;
            margin-bottom: 12px;
          }
          .${styles.container}, .${styles.textContent}, .${styles.textParagraph} {
            all: unset !important;
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
          .${styles.backBtn}, .${styles.toggleTranslationBtn}, .${styles.progressContainer}, .${styles.globalToggleContainer}, h1, h1:not(:first-child), [class^="${styles.header}"] {
            display: none !important;
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
