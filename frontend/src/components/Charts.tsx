import React from 'react';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { colors } from '../theme';

export function TrendChart({
  values,
  width = 280,
  height = 110,
}: {
  values: number[];
  width?: number;
  height?: number;
}) {
  const max = Math.max(...values, 1);
  const pad = 8;
  const points = values
    .map((v, i) => {
      const x = pad + (i * (width - pad * 2)) / Math.max(values.length - 1, 1);
      const y = height - pad - (v / max) * (height - pad * 2);
      return `${x},${y}`;
    })
    .join(' ');
  const last = values.length - 1;
  const lastX = pad + (last * (width - pad * 2)) / Math.max(values.length - 1, 1);
  const lastY = height - pad - (values[last] / max) * (height - pad * 2);

  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <Polyline points={points} fill="none" stroke={colors.accent} strokeWidth={2.5} />
      <Circle cx={lastX} cy={lastY} r={5} fill={colors.accent} />
    </Svg>
  );
}

export function GoalRing({ percent, size = 118 }: { percent: number; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);

  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.track} strokeWidth={stroke} fill="none" />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={colors.accent}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}
