# Contenido — zonas (/zonas)

Capturado verbatim del sitio real (innerText/textContent, 2026-08-19).
`<title>`: «Zonas One Impact»

> Header, menú móvil y footer = canónicos (ver `02-content-home.md`).
> Sin desviaciones de texto ni de links en esta página. Única nota visual:
> el header transparente de links blancos queda aquí sobre fondo crema
> `#F0ECE4`, con muy bajo contraste (rasgo real del sitio).

## 1. hero

- **h1:** «Zonas One Impact»
- **párrafo:** «Conoce los territorios donde ya hemos ejecutado iniciativas y los que se integrarán en las próximas fases.»
- Sin CTA. Fondo crema con patrón topográfico decorativo (SVG inline `aria-hidden`, sin texto).

## 2. zonas-grid

3 tarjetas-link (cada una duplicada 2× en el DOM: pila móvil + grid desktop; contenido idéntico). Orden: Amazonía, México, África.

### Tarjeta 1 → `/zonas/amazonia` (403 actualmente)
- **h2:** «Amazonía»
- **párrafo:** «Pulmón verde clave para la estabilización climática del planeta.»
- **chip:** «Ver más» (+ icono flecha →, decorativo)
- **alt img:** «Amazonía»

### Tarjeta 2 → `/zonas/mexico` (403 actualmente)
- **h2:** «México»
- **párrafo:** «Hogar de los manglares más estratégicos del planeta para la captura de carbono y la preservación costera.»
- **chip:** «Ver más»
- **alt img:** «México»

### Tarjeta 3 → `/zonas/africa` (403 actualmente)
- **h2:** «África»
- **párrafo:** «Territorio esencial para la resiliencia climática global y la protección de comunidades.»
- **chip:** «Ver más»
- **alt img:** «África»

## 3. avances

- **h2:** «Avances desde el territorio»
- **párrafo intro:** «Somos la fuerza colectiva que moviliza las acciones individuales hacia la restauración planetaria.»

5 tarjetas (no son links; duplicadas 2× en DOM: grid desktop + carrusel móvil con dots). Orden:

### Avance 1
- **h3:** «Restauración de ecosistemas en Guainía»
- **fecha:** «• 2026»
- **párrafo:** «Ejecutamos el plan de restauración activa en seis cuencas hidrográficas clave, consolidando el corredor ecológico y la biodiversidad local.»
- **alt img:** «Restauración de ecosistemas en Guainía»

### Avance 2
- **h3:** «Inicio de diagnóstico ecológico costero en Yucatán»
- **fecha:** «• 2026»
- **párrafo:** «Iniciamos la caracterización ambiental en zonas prioritarias de manglar para definir áreas de conservación y establecer línea base de captura de carbono y biodiversidad.»
- **alt img:** «Inicio de diagnóstico ecológico costero en Yucatán»

### Avance 3
- **h3:** «Diseño de corredores verdes en savana oriental»
- **fecha:** «• 2026»
- **párrafo:** «Concluimos los primeros modelos de corredores, incluyendo la definición de zonas, modelación de flujos y proyección de impacto a 10 años.»
- **alt img:** «Diseño de corredores verdes en savana oriental»
- Nota: «savana» (sin b) es la grafía real del sitio; se copia tal cual.

### Avance 4
- **h3:** «Sistema de monitoreo satelital en Borneo»
- **fecha:** «• 2026»
- **párrafo:** «Implementamos sensores remotos y alertas tempranas para detectar deforestación en tiempo real en zonas críticas de biodiversidad.»
- **alt img:** «Sistema de monitoreo satelital en Borneo»

### Avance 5
- **h3:** «Certificación de créditos de carbono en Amazonía»
- **fecha:** «• 2026»
- **párrafo:** «Completamos la validación de 120,000 hectáreas bajo estándar Verra, habilitando la primera emisión de créditos verificados del proyecto.»
- **alt img:** «Certificación de créditos de carbono en Amazonía»
- Cifra con formato exacto: «120,000» (coma como separador de miles).

- **microcopy (solo móvil):** dots del carrusel, `aria-label` «Ir al avance 1» … «Ir al avance 5»

## 4. footer

Canónico (ver `02-content-home.md` §9). Sin desviaciones.
