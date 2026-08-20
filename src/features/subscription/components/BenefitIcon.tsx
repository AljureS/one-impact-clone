// Iconos de beneficios: los 6 SVG inline del sitio transcritos verbatim de
// raw/suscripcion-assets.json › iconosBeneficios (viewBox 0 0 40 40, rect
// fondo dark-green rx 8, trazos blancos 1.5). Decorativos en el sitio (sin
// aria-label) → sin props de accesibilidad. El orden del array sigue el
// orden de `benefits` en @/data/plans (02-content-suscripcion §3).
import { Fragment, ReactElement } from 'react';
import Svg, { Circle, Line, Path, Polygon, Rect } from 'react-native-svg';

import { colors, radius, spacing } from '@/shared/theme';

// Intrínsecos del dibujo observado, no tokens.
const STROKE = 1.5;

const GLYPHS: ReactElement[] = [
  <Fragment key="ipass">
    <Rect
      x={8}
      y={12}
      width={24}
      height={18}
      rx={3}
      stroke={colors.white}
      strokeWidth={STROKE}
      fill="none"
    />
    <Circle cx={15} cy={20} r={3} fill={colors.white} />
    <Line
      x1={22}
      y1={18}
      x2={29}
      y2={18}
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
    <Line
      x1={22}
      y1={22}
      x2={27}
      y2={22}
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
  </Fragment>,
  <Fragment key="coordenadas">
    <Path
      d="M20 10 C16 10 13 13 13 17 C13 22.5 20 31 20 31 C20 31 27 22.5 27 17 C27 13 24 10 20 10Z"
      stroke={colors.white}
      strokeWidth={STROKE}
      fill="none"
    />
    <Circle cx={20} cy={17} r={2.5} fill={colors.white} />
  </Fragment>,
  <Fragment key="travesia">
    <Path
      d="M9 28 C13 28 13 20 20 20 S27 12 31 12"
      stroke={colors.white}
      strokeWidth={STROKE}
      fill="none"
      strokeLinecap="round"
    />
    <Circle cx={9} cy={28} r={2.5} fill={colors.white} />
    <Circle cx={20} cy={20} r={2.5} fill={colors.white} />
    <Circle cx={31} cy={12} r={2.5} fill={colors.white} />
  </Fragment>,
  <Fragment key="academy">
    <Polygon points="20,10 32,16 20,22 8,16" fill={colors.white} />
    <Path
      d="M14 19 L14 27 C16.5 29 23.5 29 26 27 L26 19"
      stroke={colors.white}
      strokeWidth={STROKE}
      fill="none"
      strokeLinejoin="round"
    />
    <Line
      x1={32}
      y1={16}
      x2={32}
      y2={24}
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
  </Fragment>,
  <Fragment key="wallet">
    <Rect
      x={8}
      y={14}
      width={24}
      height={16}
      rx={3}
      stroke={colors.white}
      strokeWidth={STROKE}
      fill="none"
    />
    <Path
      d="M8 20 L32 20"
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
    <Rect x={24} y={22} width={6} height={5} rx={2} fill={colors.white} />
    <Path
      d="M12 14 L15 10"
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
    <Path
      d="M19 14 L22 10"
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
  </Fragment>,
  <Fragment key="fondo">
    <Path
      d="M20 10 L29 14 L29 22 C29 27.5 20 32 20 32 C20 32 11 27.5 11 22 L11 14 Z"
      stroke={colors.white}
      strokeWidth={STROKE}
      fill="none"
      strokeLinejoin="round"
    />
    <Line
      x1={20}
      y1={17}
      x2={20}
      y2={24}
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
    <Line
      x1={16.5}
      y1={20.5}
      x2={23.5}
      y2={20.5}
      stroke={colors.white}
      strokeWidth={STROKE}
      strokeLinecap="round"
    />
  </Fragment>,
];

interface BenefitIconProps {
  index: number;
}

export function BenefitIcon({ index }: BenefitIconProps) {
  return (
    <Svg width={spacing[40]} height={spacing[40]} viewBox="0 0 40 40">
      <Rect width={40} height={40} rx={radius.lg} fill={colors.darkGreen} />
      {GLYPHS[index]}
    </Svg>
  );
}
