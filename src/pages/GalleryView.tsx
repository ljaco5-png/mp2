import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBeans } from '../BeansContext';
import BeanImage from '../components/BeanImage';
import type { Bean } from '../types';
import styles from './GalleryView.module.css';

function groupsOf(bean: Bean): string[] {
  const groups = (bean.groupName ?? [])
    .flatMap((g) => g.split(','))
    .map((g) => g.trim())
    .filter(Boolean);
  return groups.length > 0 ? groups : ['Ungrouped'];
}

export default function GalleryView() {
  const { beans, loading, error } = useBeans();
  const [selected, setSelected] = useState<string[]>([]);

  const allGroups = useMemo(
    () => Array.from(new Set(beans.flatMap(groupsOf))).sort(),
    [beans]
  );

  const visible = useMemo(
    () =>
      selected.length === 0
        ? beans
        : beans.filter((b) => groupsOf(b).some((g) => selected.includes(g))),
    [beans, selected]
  );

  const toggle = (group: string) =>
    setSelected((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );

  if (loading) return <p className={styles.status}>Loading beans...</p>;
  if (error) return <p className={styles.status}>Error: {error}</p>;

  return (
    <section className={styles.page}>
      <div className={styles.filters}>
        {allGroups.map((group) => (
          <button
            key={group}
            className={selected.includes(group) ? `${styles.chip} ${styles.active}` : styles.chip}
            aria-pressed={selected.includes(group)}
            onClick={() => toggle(group)}
          >
            {group}
          </button>
        ))}
        {selected.length > 0 && (
          <button className={styles.clear} onClick={() => setSelected([])}>
            Clear
          </button>
        )}
      </div>

      <p className={styles.count}>{visible.length} beans</p>

      <div className={styles.grid}>
        {visible.map((bean) => (
          <Link key={bean.beanId} className={styles.card} to={`/bean/${bean.beanId}`}>
            <BeanImage bean={bean} className={styles.image} />
            <span className={styles.name}>{bean.flavorName}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}