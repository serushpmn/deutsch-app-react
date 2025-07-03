import React, { useState } from 'react';
import { texts } from '../data/texts';
import TextCard from '../components/TextCard';
import styles from '../styles/App.module.css';

const levels = [
  { key: 'all', label: 'همه' },
  { key: 'beginner', label: 'مبتدی' },
  { key: 'intermediate', label: 'متوسط' },
  { key: 'advanced', label: 'پیشرفته' },
];

export default function Gallery({ onSelectText }) {
  const [filter, setFilter] = useState('all');
  const filteredTexts = filter === 'all' ? texts : texts.filter(t => t.level === filter);

  return (
    <main className={styles.container}>
      <section className={styles.filterSection}>
        <h2>فیلتر بر اساس سطح:</h2>
        <div className={styles.filterButtons}>
          {levels.map(l => (
            <button
              key={l.key}
              className={filter === l.key ? styles.active : ''}
              onClick={() => setFilter(l.key)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </section>
      <section className={styles.textGallery}>
        {filteredTexts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            هیچ متنی برای نمایش یافت نشد.
          </p>
        ) : (
          filteredTexts.map(text => (
            <TextCard key={text.id} text={text} onClick={() => onSelectText(text.id)} />
          ))
        )}
      </section>
    </main>
  );
}
