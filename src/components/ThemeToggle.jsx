import React from 'react';
import styles from '../styles/App.module.css';

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className={`${styles.themeToggle} ${dark ? styles.dark : ''}`}
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <div className={styles.toggleTrack}>
        <div
          className={styles.toggleThumb}
          style={{
            transform: dark
              ? `translateX(calc(var(--toggle-width) - var(--toggle-height)))`
              : 'translateX(0)',
            background: dark
              ? 'linear-gradient(145deg, #b69df8, #9a7ff5)'
              : 'linear-gradient(145deg, #ffffff, #f0f0f0)'
          }}
        />
      </div>
      <span className={styles.toggleLabel}>
        {/* {dark ? 'Night Mode' : 'Day Mode'} */}
      </span>
    </button>
  );
}