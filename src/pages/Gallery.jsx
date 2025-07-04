import React, { useState } from 'react';
import { texts } from '../data/texts';
import TextCard from '../components/TextCard';
import styles from '../styles/App.module.css';

const levels = [
  { key: 'All', label: 'All' },
  { key: 'A1', label: 'A1' },
  { key: 'A2', label: 'A2' },
  { key: 'B1', label: 'B1' },
  { key: 'B2', label: 'B2' },
  { key: 'C1', label: 'C1' },

];

export default function Gallery({ onSelectText }) {
  const [filter, setFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState(null);

  let filteredTexts = texts;
  if (filter !== 'All') filteredTexts = filteredTexts.filter(t => t.level === filter);
  if (tagFilter) filteredTexts = filteredTexts.filter(t => Array.isArray(t.tag) ? t.tag.includes(tagFilter) : t.tag === tagFilter);

  return (
    <main className={styles.container}>
      <section className={styles.filterSection}>
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
        {tagFilter && (
          <div style={{marginTop: 12}}>
            <span style={{color: 'var(--primary-color)', fontWeight: 600}}>
              فیلتر بر اساس تگ: #{tagFilter}
            </span>
            <button style={{marginRight: 12}} onClick={() => setTagFilter(null)}>
              حذف فیلتر تگ
            </button>
          </div>
        )}
      </section>
      <section className={styles.textGallery}>
        {filteredTexts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>
            هیچ متنی برای نمایش یافت نشد.
          </p>
        ) : (
          filteredTexts.map(text => (
            <TextCard key={text.id} text={text} onClick={() => onSelectText(text.id)} onTagClick={setTagFilter} />
          ))
        )}
      </section>
    </main>
  );
}
