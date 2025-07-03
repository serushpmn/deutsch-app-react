import React from 'react';
import styles from '../styles/App.module.css';

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <div className={styles.themeSwitch}>
      <label>
        <input
          type="checkbox"
          checked={dark}
          onChange={onToggle}
        />
        <span style={{ marginRight: 8 }}>
          حالت شب
        </span>
      </label>
    </div>
  );
}
