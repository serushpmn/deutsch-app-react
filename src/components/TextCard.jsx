import React from 'react';
import styles from '../styles/App.module.css';

export default function TextCard({ text, onClick }) {
  return (
    <div
      className={styles.textCard}
      style={{ animationDelay: `${(parseInt(text.id) - 1) * 0.1}s` }}
      onClick={onClick}
    >
      <div className={styles.textCardHeader}>
        <h3 className={styles.textCardTitle}>{text.title.de}</h3>
        <span
          className={styles.textCardLevel}
          style={{ background: `var(--level-${text.level})` }}
        >
          {text.level}
        </span>
      </div>
      <div className={styles.textCardContent}>
        <p>
          {text.content.slice(0, 2).map(p => p.de).join(' ')}
          {text.content.length > 2 ? '...' : ''}
        </p>
      </div>
    </div>
  );
}
