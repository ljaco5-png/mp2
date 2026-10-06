import { useState } from 'react';
import type { Bean } from '../types';

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

interface Props {
  bean: Bean;
  className?: string;
}

export default function BeanImage({ bean, className }: Props) {
  const [failed, setFailed] = useState(false);

  if (!failed && bean.imageUrl) {
    return (
      <img
        className={className}
        src={bean.imageUrl}
        alt={bean.flavorName}
        onError={() => setFailed(true)}
      />
    );
  }

  const fill = HEX.test(bean.backgroundColor) ? bean.backgroundColor : '#cccccc';
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label={bean.flavorName}>
      <ellipse cx="50" cy="50" rx="42" ry="26" transform="rotate(-25 50 50)"
        fill={fill} stroke="#000000" strokeOpacity="0.2" strokeWidth="2" />
      <ellipse cx="38" cy="38" rx="14" ry="5" transform="rotate(-25 38 38)"
        fill="#ffffff" fillOpacity="0.45" />
    </svg>
  );
}