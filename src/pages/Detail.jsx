import React, { useState } from 'react';
import { texts } from '../data/texts';
import styles from '../styles/App.module.css';

export default function Detail({ textId, onBack }) {
  const text = texts.find(t => t.id === textId);
  const [showTranslations, setShowTranslations] = useState(false);

  if (!text) {
    return (
      <main className={styles.container}>
        <button onClick={onBack}>بازگشت</button>
        <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
          متن مورد نظر یافت نشد.
        </p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <button onClick={onBack}>بازگشت</button>
      <h1>{text.title.fa}</h1>
      <div className={styles.progressContainer}>
        {/* Progress bar can be implemented with scroll event if needed */}
      </div>
      <div className={styles.globalToggleContainer}>
        <button onClick={() => setShowTranslations(v => !v)}>
          {showTranslations ? 'مخفی کردن همه ترجمه‌ها' : 'نمایش همه ترجمه‌ها'}
        </button>
      </div>
      <section className={styles.textContent}>
        {text.content.map((p, i) => (
          <div key={i} className={styles.textParagraph}>
            <p className={styles.germanText}>{p.de}</p>
            <p
              className={styles.persianText}
              style={{ display: showTranslations ? 'block' : 'none' }}
            >
              {p.fa}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
