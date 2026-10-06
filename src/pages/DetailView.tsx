import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBeans } from '../BeansContext';
import BeanImage from '../components/BeanImage';
import styles from './DetailView.module.css';

const yesNo = (value: boolean) => (value ? 'Yes' : 'No');

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const { beans, loading, error } = useBeans();

  const ordered = useMemo(() => [...beans].sort((a, b) => a.beanId - b.beanId), [beans]);

  if (loading) return <p className={styles.status}>Loading bean...</p>;
  if (error) return <p className={styles.status}>Error: {error}</p>;

  const index = ordered.findIndex((b) => b.beanId === Number(id));
  if (index === -1) {
    return (
      <p className={styles.status}>
        Bean not found. <Link to="/">Back to list</Link>
      </p>
    );
  }

  const bean = ordered[index];
  const prev = ordered[(index - 1 + ordered.length) % ordered.length];
  const next = ordered[(index + 1) % ordered.length];
  const groups = (bean.groupName ?? []).filter(Boolean);
  const ingredients = (bean.ingredients ?? []).filter(Boolean);

  return (
    <section className={styles.page}>
      <div className={styles.nav}>
        <Link className={styles.button} to={`/bean/${prev.beanId}`}>&larr; Previous</Link>
        <span className={styles.position}>{index + 1} of {ordered.length}</span>
        <Link className={styles.button} to={`/bean/${next.beanId}`}>Next &rarr;</Link>
      </div>

      <article className={styles.card}>
        <BeanImage key={bean.beanId} bean={bean} className={styles.image} />
        <h1 className={styles.title}>{bean.flavorName}</h1>
        <p className={styles.description}>
          {bean.description || 'No description available.'}
        </p>

        <dl className={styles.details}>
          <dt>Bean ID</dt><dd>{bean.beanId}</dd>
          <dt>Groups</dt><dd>{groups.length > 0 ? groups.join(', ') : 'None'}</dd>
          <dt>Color group</dt><dd>{bean.colorGroup || 'Unknown'}</dd>
          <dt>Background color</dt><dd>{bean.backgroundColor}</dd>
          <dt>Gluten free</dt><dd>{yesNo(bean.glutenFree)}</dd>
          <dt>Sugar free</dt><dd>{yesNo(bean.sugarFree)}</dd>
          <dt>Seasonal</dt><dd>{yesNo(bean.seasonal)}</dd>
          <dt>Kosher</dt><dd>{yesNo(bean.kosher)}</dd>
          <dt>Ingredients</dt>
          <dd>{ingredients.length > 0 ? ingredients.join(', ') : 'Not listed'}</dd>
          <dt>Image URL</dt><dd className={styles.url}>{bean.imageUrl || 'None'}</dd>
        </dl>
      </article>
    </section>
  );
}