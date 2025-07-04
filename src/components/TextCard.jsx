import React from 'react';
import styles from '../styles/App.module.css';

export default function TextCard({ text, onClick, onTagClick }) {
  // Combine the first two German sentences for preview
  const preview = text.content.slice(0, 2).map(p => p.de).join(' ');
  const previewShort = preview.length > 60 ? preview.slice(0, 60) + '...' : preview;

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
        <p>{previewShort}</p>
        {text.tag && (
          <div className={styles.textCardTags}>
            {Array.isArray(text.tag)
              ? text.tag.map((tag, i) => (
                  <span
                    key={i}
                    className={styles.textTag}
                    onClick={e => {
                      e.stopPropagation();
                      onTagClick && onTagClick(tag);
                    }}
                  >
                    #{tag}
                  </span>
                ))
              : (
                  <span
                    className={styles.textTag}
                    onClick={e => {
                      e.stopPropagation();
                      onTagClick && onTagClick(text.tag);
                    }}
                  >
                    #{text.tag}
                  </span>
                )}
          </div>
        )}
      </div>
    </div>
  );
}
