// Fuente: 02-content-zonas.md §3 (verbatim, incl. «savana» y «120,000») ·
// 04-assets-map.md. Orden = orden observado de las 5 tarjetas.
// `zoneSlug` no existe en el sitio: mapeo avance→zona del plan aprobado
// (guainia→amazonia · yucatan→mexico · corredores→africa ·
// borneo-monitoreo→borneo · amazonia-carbono→amazonia).
import type { ProgressUpdate } from './types';

export const progressUpdates: ProgressUpdate[] = [
  {
    id: 'guainia',
    title: 'Restauración de ecosistemas en Guainía',
    date: '• 2026',
    description:
      'Ejecutamos el plan de restauración activa en seis cuencas hidrográficas clave, consolidando el corredor ecológico y la biodiversidad local.',
    image: require('../../assets/images/advances/guainia.jpg'),
    zoneSlug: 'amazonia',
  },
  {
    id: 'yucatan',
    title: 'Inicio de diagnóstico ecológico costero en Yucatán',
    date: '• 2026',
    description:
      'Iniciamos la caracterización ambiental en zonas prioritarias de manglar para definir áreas de conservación y establecer línea base de captura de carbono y biodiversidad.',
    image: require('../../assets/images/advances/yucatan.jpg'),
    zoneSlug: 'mexico',
  },
  {
    id: 'corredores',
    title: 'Diseño de corredores verdes en savana oriental',
    date: '• 2026',
    description:
      'Concluimos los primeros modelos de corredores, incluyendo la definición de zonas, modelación de flujos y proyección de impacto a 10 años.',
    image: require('../../assets/images/advances/corredores.jpg'),
    zoneSlug: 'africa',
  },
  {
    id: 'borneo-monitoreo',
    title: 'Sistema de monitoreo satelital en Borneo',
    date: '• 2026',
    description:
      'Implementamos sensores remotos y alertas tempranas para detectar deforestación en tiempo real en zonas críticas de biodiversidad.',
    image: require('../../assets/images/advances/borneo-monitoreo.jpg'),
    zoneSlug: 'borneo',
  },
  {
    id: 'amazonia-carbono',
    title: 'Certificación de créditos de carbono en Amazonía',
    date: '• 2026',
    description:
      'Completamos la validación de 120,000 hectáreas bajo estándar Verra, habilitando la primera emisión de créditos verificados del proyecto.',
    image: require('../../assets/images/advances/amazonia-carbono.jpg'),
    zoneSlug: 'amazonia',
  },
];

// /zonas §3, encabezado de la sección y aria-labels de los dots del carrusel móvil.
export const progressSection = {
  title: 'Avances desde el territorio',
  intro:
    'Somos la fuerza colectiva que moviliza las acciones individuales hacia la restauración planetaria.',
  dotLabels: [
    'Ir al avance 1',
    'Ir al avance 2',
    'Ir al avance 3',
    'Ir al avance 4',
    'Ir al avance 5',
  ],
} as const;
