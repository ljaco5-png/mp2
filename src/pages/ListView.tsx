import BeanImage from '../components/BeanImage';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBeans } from '../BeansContext';
import styles from './ListView.module.css';

type SortKey = 'flavorName' | 'beanId';

export default function ListView() {
  const { beans, loading, error } = useBeans();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('flavorName');
  const [ascending, setAscending] = useState(true);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = beans.filter((b) => b.flavorName.toLowerCase().includes(q));
    const sorted = [...filtered].sort((a, b) =>
      sortKey === 'beanId'
        ? a.beanId - b.beanId
        : a.flavorName.localeCompare(b.flavorName) || a.beanId - b.beanId
    );
    return ascending ? sorted : sorted.reverse();
  }, [beans, query, sortKey, ascending]);

  if (loading) return <p className={styles.status}>Loading beans (the API can take a moment to wake up)...</p>;
  if (error) return <p className={styles.status}>Error: {error}</p>;

  return (
    <section className={styles.page}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search flavors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className={styles.label}>
          Sort by
          <select
            className={styles.select}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
          >
            <option value="flavorName">Name</option>
            <option value="beanId">ID</option>
          </select>
        </label>
        <button className={styles.button} onClick={() => setAscending((v) => !v)}>
          {ascending ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <p className={styles.count}>{visible.length} beans</p>

      <ul className={styles.list}>
        {visible.map((bean) => (
          <li key={bean.beanId}>
            <Link className={styles.item} to={`/bean/${bean.beanId}`}>
              <BeanImage bean={bean} className={styles.thumb} />
              <span className={styles.name}>{bean.flavorName}</span>
              <span className={styles.id}>#{bean.beanId}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}