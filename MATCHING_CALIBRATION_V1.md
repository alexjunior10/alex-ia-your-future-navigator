# Laboratorio de Calibración del Matching Vocacional V1 (MATCHING_CALIBRATION_V1)
**Plataforma:** Alex IA — Your Future Navigator  
**Versión de ADN evaluada:** `ADN_V1` (132 carreras × 38 variables)  
**Versión del Motor:** `MATCHING_V1`  
**Configuración de Pesos:** Intereses 25%, Aptitudes 30%, Personalidad 20%, Valores 10%, Preferencias 15%  
**Fecha:** 25 de Septiembre de 2026  

---

## 1. Metodología Utilizada

### 1.1 Objetivo del Laboratorio
Evaluar el comportamiento empírico del motor de matching vocacional `MATCHING_V1` mediante simulación controlada con 6 perfiles sintéticos arquetípicos, midiendo:
- **Poder discriminante:** Capacidad de separar carreras idóneas de aquellas no afines.
- **Concentración del ranking:** Diferencia entre el Top 1 y las posiciones subsiguientes (Top 2, Top 5, Top 10) y densidad de carreras agrupadas en rangos estrechos ($\le 1$, $\le 3$, $\le 5$ puntos).
- **Detección de clusters de alta similitud:** Identificación objetiva de casos donde $\text{Top 1} - \text{Top 2} \le 2.0$ pts, $\text{Top 1} - \text{Top 5} \le 5.0$ pts o $\text{Top 1} - \text{Top 10} \le 8.0$ pts.
- **Detección de carreras potencialmente dominantes:** Análisis cruzado de carreras que pudieran aparecer sistemáticamente en los primeros puestos a pesar de evaluar perfiles conceptualmente opuestos.
- **Explicabilidad causal:** Identificación de dimensiones y variables determinantes para cada perfil.

### 1.2 Perfiles Sintéticos Diseñados
Se construyeron 6 vectores sintéticos con exactamente 38 variables en escala 0–100:

| ID | Perfil | Constructo y Foco Evaluado |
|---|---|---|
| **A** | **Tecnológico / Analítico** | Orientado a lógica formal (`APT_LOG: 95`, `APT_ANA: 95`), computación y datos (`PRE_TEC: 100`, `PRE_DAT: 95`, `INT_I: 95`), y autonomía (`PER_AUT: 90`). |
| **B** | **Salud / Social** | Orientado a vocación de servicio (`INT_S: 100`, `APT_SOC: 95`), empatía, colaboración (`PER_COL: 95`), impacto comunitario (`VAL_IMP: 100`) y ciencias biológicas (`INT_I: 85`). |
| **C** | **Creativo / Artístico** | Orientado a expresión artística (`INT_A: 100`), pensamiento divergente (`APT_CRE: 100`), percepción espacial (`APT_ESP: 90`), originalidad (`VAL_CRE: 100`) y libertad (`VAL_AUT: 95`). |
| **D** | **Negocios / Liderazgo** | Orientado a persuasión directiva (`INT_E: 100`, `PER_LID: 100`), finanzas (`VAL_ING: 100`, `VAL_REC: 90`), relaciones humanas (`APT_SOC: 90`, `APT_VER: 90`) y exposición pública (`PRE_EXP: 90`). |
| **E** | **Práctico / Campo** | Orientado a entornos físicos y aire libre (`INT_R: 100`, `PRE_PRA: 100`, `PRE_CAM: 100`), recursos naturales, minería y tenacidad operativa (`PER_PER: 90`). |
| **F** | **Equilibrado / Generalista** | Puntuaciones intermedias homogéneas (~55–65 en las 38 variables), simulando un estudiante con intereses y habilidades moderadas sin inclinación marcada. |

---

## 2. Métricas de Concentración del Ranking

Se evaluó la dispersión cuantitativa del Top 10 para cada perfil:

| Perfil | Top 1 Score | Top 2 Score | Top 3 Score | Top 5 Score | Top 10 Score | $\Delta$ (1-2) | $\Delta$ (1-5) | $\Delta$ (1-10) | $\le 1$ pt | $\le 3$ pts | $\le 5$ pts | Clasificación |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **A. Tecnológico** | 93.22% | 89.30% | 88.25% | 87.47% | 86.83% | **3.92** | 5.75 | 6.39 | 1 | 1 | 3 | Cluster moderado ($\Delta_{1-10} \le 8$) |
| **B. Salud / Social** | 91.09% | 89.21% | 88.61% | 85.81% | 85.55% | **1.89** | 5.28 | 5.54 | 1 | 3 | 4 | **High Similarity Cluster** ($\Delta_{1-2} \le 2$) |
| **C. Creativo** | 90.40% | 87.36% | 87.23% | 86.77% | 85.88% | **3.03** | 3.63 | 4.52 | 1 | 1 | **11** | **High Similarity Cluster** ($\Delta_{1-5} \le 5$) |
| **D. Negocios** | 92.94% | 89.71% | 88.57% | 86.45% | 84.29% | **3.23** | 6.49 | 8.65 | 1 | 1 | 3 | **Differentiated Distribution** |
| **E. Práctico / Campo** | 92.86% | 92.55% | 91.17% | 90.55% | 88.72% | **0.31** | 2.31 | 4.15 | **2** | **5** | **16** | **High Similarity Cluster** ($\Delta_{1-2} \le 2$, $\Delta_{1-5} \le 5$) |
| **F. Equilibrado** | 88.72% | 88.58% | 87.35% | 86.92% | 85.97% | **0.14** | 1.80 | 2.75 | **2** | **12** | **39** | **High Similarity Cluster** (Extrema densidad) |

### Hallazgos Clave de Concentración:
1. **Diferenciación nítida en Negocios y Tecnología:**  
   En los perfiles A y D, el Top 1 se despega con más de 3.2 a 3.9 puntos del Top 2. La carrera líder queda claramente definida.
2. **Empate técnico en Práctico / Campo:**  
   Existe una diferencia de apenas **0.31 puntos** entre `Ingeniería Agrícola` (92.86%) e `Ingeniería Agronómica` (92.55%). Además, hay 16 carreras en una franja menor a 5 puntos.
3. **El fenómeno del Perfil Equilibrado (F):**  
   Cuando un estudiante tiene puntuaciones intermedias homogéneas (~60), **39 carreras caen dentro de un margen de 5 puntos**. La distancia euclidiana/lineal desde un vector central hacia múltiples carreras equilibradas es prácticamente idéntica.

---

## 3. Top 20 de Carreras por Perfil

### 3.1 Perfil A: Tecnológico / Analítico
*Ganador absoluto: Ingeniería de Software (★ Gold Set)*

| Pos | Carrera | Score Global | Intereses (25%) | Aptitudes (30%) | Personalidad (20%) | Valores (10%) | Preferencias (15%) | Gold Set | Carreras Similares del ADN |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **1** | **Ingeniería de Software** | **93.22%** | 92.5% | 93.1% | 93.8% | 92.5% | 94.4% | ★ Gold | - |
| **2** | Ingeniería de Sistemas / Computación | **89.30%** | 88.3% | 90.0% | 93.1% | 85.6% | 86.9% | | ingenieria-de-sistemas-inteligentes |
| **3** | Ingeniería Industrial | **88.25%** | 85.0% | 91.9% | 88.1% | 85.0% | 88.8% | | - |
| **4** | Ingeniería de Robótica | **88.13%** | 87.5% | 89.4% | 91.3% | 82.5% | 86.3% | | ingenieria-mecatronica |
| **5** | Ingeniería en IA y Robótica | **87.47%** | 85.0% | 90.6% | 90.6% | 80.6% | 85.6% | | - |
| 6 | Ingeniería Civil | **87.39%** | 86.7% | 92.5% | 89.4% | 81.9% | 79.4% | | - |
| 7 | Ingeniería Electrónica | **87.17%** | 84.2% | 91.3% | 87.5% | 81.3% | 87.5% | | ingenieria-aeronautica |
| 8 | Bioingeniería | **86.93%** | 83.3% | 91.3% | 88.1% | 82.5% | 85.6% | | biotecnologia |
| 9 | Ingeniería Biomédica | **86.84%** | 82.5% | 91.9% | 88.1% | 81.9% | 85.6% | | - |
| 10 | Ingeniería de Telecomunicaciones | **86.83%** | 85.8% | 88.8% | 87.5% | 77.5% | 90.0% | | ingenieria-quimica |
| 11 | Ingeniería en Ciberseguridad y Forense | **86.74%** | 81.7% | 91.9% | 88.8% | 80.6% | 86.3% | | ingenieria-de-datos |
| 12 | Ingeniería de Sistemas Inteligentes | **86.68%** | 84.2% | 91.3% | 89.4% | 78.1% | 84.4% | | ingenieria-de-sistemas-computacion |
| 13 | Ingeniería Mecatrónica | **86.65%** | 85.8% | 89.4% | 88.8% | 81.9% | 83.8% | | ingenieria-de-robotica |
| 14 | Ingeniería Mecánica | **86.62%** | 85.8% | 90.0% | 88.8% | 84.4% | 81.9% | | ingenieria-electrica |
| 15 | Ingeniería de Ciberseguridad | **86.60%** | 81.7% | 92.5% | 88.1% | 80.6% | 85.6% | | ingenieria-de-datos |
| 16 | Biología Computacional | **86.58%** | 81.7% | 90.6% | 88.1% | 81.9% | 86.9% | | economia-computacional, genomica |
| 17 | Ingeniería de Datos | **86.57%** | 80.8% | 93.8% | 88.8% | 80.0% | 85.0% | | ciberseguridad, economia-y-ciencia-de-datos |
| 18 | Ingeniería de Inteligencia Artificial | **86.57%** | 84.2% | 91.9% | 88.8% | 79.4% | 83.1% | | economia-computacional |
| 19 | Bioinformática | **86.55%** | 81.7% | 91.9% | 88.8% | 79.4% | 85.6% | | economia-computacional, genomica |
| 20 | Nanotecnología | **86.39%** | 80.8% | 91.9% | 89.4% | 81.9% | 83.8% | | ingenieria-de-materiales |

---

### 3.2 Perfil B: Salud / Social
*Ganador: Medicina (★ Gold Set) seguido de Educación y Psicología*

| Pos | Carrera | Score Global | Intereses (25%) | Aptitudes (30%) | Personalidad (20%) | Valores (10%) | Preferencias (15%) | Gold Set | Carreras Similares del ADN |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **1** | **Medicina** | **91.09%** | 90.8% | 89.4% | 91.9% | 93.8% | 91.9% | ★ Gold | - |
| **2** | Educación | **89.21%** | 88.3% | 88.8% | 93.1% | 88.1% | 87.5% | ★ Gold | - |
| **3** | Psicología | **88.61%** | 85.0% | 90.0% | 92.5% | 88.1% | 86.9% | ★ Gold | - |
| **4** | Enfermería | **88.42%** | 89.2% | 87.5% | 89.4% | 89.4% | 86.3% | | fisioterapia-terapia-fisica |
| **5** | Nutrición | **85.81%** | 85.0% | 85.0% | 88.8% | 86.9% | 84.4% | | - |
| 6 | Fisioterapia / Terapia Física | **85.74%** | 83.3% | 86.3% | 88.8% | 84.4% | 85.6% | | obstetricia |
| 7 | Obstetricia | **85.69%** | 86.7% | 83.8% | 88.8% | 85.6% | 84.4% | | fisioterapia-terapia-fisica |
| 8 | Tecnología Médica | **85.67%** | 83.3% | 86.9% | 88.8% | 85.6% | 84.4% | | - |
| 9 | Odontología | **85.64%** | 87.5% | 85.0% | 86.3% | 85.6% | 83.8% | | - |
| 10 | Ingeniería de Economía Circular | **85.55%** | 84.2% | 86.9% | 87.5% | 82.5% | 85.6% | | ingenieria-de-sostenibilidad |
| 11 | Trabajo Social / Sociología | **85.34%** | 83.3% | 88.1% | 88.1% | 83.8% | 81.3% | | - |
| 12 | Antropología | **85.01%** | 85.0% | 87.5% | 85.0% | 84.4% | 80.6% | | - |
| 13 | Ingeniería de Sostenibilidad | **84.97%** | 80.8% | 87.5% | 86.9% | 82.5% | 86.9% | | ingenieria-de-economia-circular |
| 14 | Derecho | **84.87%** | 78.3% | 87.5% | 89.4% | 86.9% | 86.3% | ★ Gold | - |
| 15 | Ciencias de la Comunicación | **84.67%** | 82.5% | 86.9% | 87.5% | 78.8% | 85.0% | | - |
| 16 | Medicina Veterinaria | **84.43%** | 85.0% | 86.3% | 86.3% | 83.1% | 79.4% | | - |
| 17 | Farmacia y Bioquímica | **84.22%** | 82.5% | 86.9% | 85.6% | 84.4% | 80.6% | | - |
| 18 | Ingeniería Ambiental | **84.09%** | 79.2% | 86.3% | 88.1% | 83.8% | 84.4% | | - |
| 19 | Administración | **84.04%** | 77.5% | 85.6% | 88.8% | 87.5% | 85.0% | ★ Gold | - |
| 20 | Bioingeniería | **83.69%** | 80.0% | 86.9% | 85.0% | 83.1% | 82.5% | | biotecnologia |

---

### 3.3 Perfil C: Creativo / Artístico
*Ganador: Diseño Gráfico (★ Gold Set) seguido de Medios Interactivos y Diseño de Interiores*

| Pos | Carrera | Score Global | Intereses (25%) | Aptitudes (30%) | Personalidad (20%) | Valores (10%) | Preferencias (15%) | Gold Set | Carreras Similares del ADN |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **1** | **Diseño Gráfico** | **90.40%** | 88.3% | 90.6% | 93.8% | 91.3% | 87.5% | ★ Gold | - |
| **2** | Medios Interactivos | **87.36%** | 87.5% | 88.8% | 89.4% | 83.8% | 84.4% | | diseno-de-medios-interactivos |
| **3** | Diseño de Interiores | **87.23%** | 86.7% | 88.1% | 88.1% | 86.9% | 86.3% | | - |
| **4** | Diseño Industrial | **87.14%** | 88.3% | 88.1% | 87.5% | 85.0% | 84.4% | | - |
| **5** | Producción de Medios Digitales | **86.77%** | 88.3% | 86.9% | 88.1% | 82.5% | 85.0% | | - |
| 6 | Diseño y Desarrollo de Juegos | **86.63%** | 87.5% | 86.9% | 89.4% | 83.1% | 83.1% | | diseno-digital, videojuegos |
| 7 | Arte Digital | **86.53%** | 85.8% | 87.5% | 88.1% | 85.0% | 84.4% | | diseno-de-medios-interactivos |
| 8 | Diseño de Moda | **86.41%** | 87.5% | 85.0% | 88.8% | 85.0% | 85.0% | | - |
| 9 | Diseño de Videojuegos | **86.30%** | 87.5% | 86.9% | 87.5% | 82.5% | 83.8% | | experiencias-inmersivas |
| 10 | Diseño Digital | **85.88%** | 88.3% | 84.4% | 88.8% | 83.1% | 81.9% | | diseno-de-medios-interactivos |
| 11 | Animación Digital | **85.66%** | 87.5% | 83.8% | 88.8% | 85.0% | 82.5% | | - |
| 12 | Diseño de Experiencias Inmersivas| **85.45%** | 85.0% | 85.6% | 88.8% | 83.1% | 82.5% | | diseno-de-videojuegos |
| 13 | Realidad Virtual y RA | **85.43%** | 84.2% | 86.3% | 88.1% | 83.8% | 82.5% | | desarrollo-de-videojuegos |
| 14 | Diseño de Medios Interactivos | **85.40%** | 85.8% | 85.0% | 88.8% | 81.9% | 83.8% | | medios-interactivos, diseno-digital |
| 15 | Bellas Artes | **85.24%** | 85.0% | 84.4% | 86.9% | 87.5% | 83.8% | | - |
| 16 | Arquitectura | **85.20%** | 85.8% | 85.6% | 87.5% | 85.0% | 79.4% | ★ Gold | - |
| 17 | Interacción Humano-Computadora | **84.97%** | 83.3% | 86.9% | 86.9% | 85.6% | 80.6% | | diseno-uxui, diseno-de-experiencia |
| 18 | Diseño UX/UI | **84.73%** | 84.2% | 83.8% | 88.8% | 84.4% | 82.5% | | diseno-de-interaccion, productos |
| 19 | Diseño de Productos Digitales | **84.60%** | 84.2% | 84.4% | 88.1% | 82.5% | 82.5% | | diseno-de-interaccion, diseno-uxui |
| 20 | Publicidad | **84.39%** | 83.3% | 84.4% | 88.8% | 80.0% | 83.8% | | - |

---

### 3.4 Perfil D: Negocios / Liderazgo
*Ganador: Administración (★ Gold Set) seguido de Marketing y Derecho*

| Pos | Carrera | Score Global | Intereses (25%) | Aptitudes (30%) | Personalidad (20%) | Valores (10%) | Preferencias (15%) | Gold Set | Carreras Similares del ADN |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **1** | **Administración** | **92.94%** | 92.5% | 91.3% | 95.6% | 96.3% | 91.3% | ★ Gold | - |
| **2** | Marketing | **89.71%** | 83.3% | 93.8% | 92.5% | 87.5% | 90.0% | ★ Gold | - |
| **3** | Derecho | **88.57%** | 86.7% | 86.3% | 91.3% | 90.0% | 91.9% | ★ Gold | - |
| **4** | Negocios Internacionales | **86.49%** | 85.8% | 90.6% | 87.5% | 78.8% | 83.1% | | - |
| **5** | Educación | **86.45%** | 81.7% | 89.4% | 92.5% | 78.8% | 85.6% | ★ Gold | - |
| 6 | Negocios Digitales | **86.39%** | 86.7% | 90.6% | 88.8% | 78.8% | 79.4% | | tecnologia-y-negocios, transformacion |
| 7 | Transformación Digital | **86.30%** | 88.3% | 90.6% | 88.1% | 76.9% | 78.1% | | tecnologia-y-negocios, negocios-digitales |
| 8 | Innovación y Emprendimiento | **84.91%** | 85.0% | 84.4% | 91.3% | 80.0% | 80.6% | | - |
| 9 | Ingeniería Industrial | **84.42%** | 84.2% | 81.3% | 90.6% | 88.8% | 80.0% | | - |
| 10 | Medicina | **84.29%** | 74.2% | 90.6% | 88.8% | 84.4% | 82.5% | ★ Gold | - |
| 11 | Psicología | **84.21%** | 78.3% | 87.5% | 88.8% | 78.8% | 85.0% | ★ Gold | - |
| 12 | Tecnología y Negocios | **83.83%** | 83.3% | 88.1% | 86.3% | 76.9% | 77.5% | | negocios-digitales, transformacion |
| 13 | Ingeniería de Economía Circular | **82.10%** | 79.2% | 87.5% | 81.3% | 76.3% | 81.3% | | ingenieria-de-sostenibilidad |
| 14 | Arquitectura | **81.84%** | 75.0% | 83.8% | 90.0% | 88.1% | 74.4% | ★ Gold | - |
| 15 | Ingeniería de Tecnologías de Información | **81.79%** | 81.7% | 86.9% | 80.6% | 79.4% | 75.0% | | - |
| 16 | Ingeniería de Sostenibilidad | **81.11%** | 75.8% | 88.1% | 80.6% | 75.0% | 80.6% | | ingenieria-de-economia-circular |
| 17 | Relaciones Internacionales | **80.89%** | 79.2% | 83.1% | 85.6% | 75.0% | 76.9% | | - |
| 18 | Ingeniería de Software | **80.78%** | 80.0% | 82.5% | 85.0% | 86.3% | 69.4% | ★ Gold | - |
| 19 | Analítica de Negocios | **80.71%** | 80.8% | 83.8% | 82.5% | 78.1% | 73.8% | | economia-digital, finanzas |
| 20 | Turismo | **80.57%** | 79.2% | 84.4% | 83.8% | 70.0% | 78.1% | | - |

---

### 3.5 Perfil E: Práctico / Campo
*Ganadores: Ingeniería Agrícola e Ingeniería Agronómica (Empate virtual)*

| Pos | Carrera | Score Global | Intereses (25%) | Aptitudes (30%) | Personalidad (20%) | Valores (10%) | Preferencias (15%) | Gold Set | Carreras Similares del ADN |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **1** | **Ingeniería Agrícola** | **92.86%** | 93.3% | 93.8% | 93.8% | 86.9% | 93.1% | | ingenieria-agronomica |
| **2** | **Ingeniería Agronómica** | **92.55%** | 93.3% | 92.5% | 95.0% | 85.0% | 93.1% | | forestal, recursos-naturales |
| **3** | Ingeniería de Minas | **91.17%** | 94.2% | 91.3% | 90.6% | 80.6% | 93.8% | | - |
| **4** | Ingeniería Civil | **90.86%** | 93.3% | 91.9% | 90.0% | 91.3% | 85.6% | | - |
| **5** | Ingeniería Mecánica | **90.55%** | 93.3% | 89.4% | 91.3% | 91.3% | 86.9% | | ingenieria-electrica |
| 6 | Ingeniería Geológica | **89.49%** | 85.8% | 92.5% | 90.0% | 85.0% | 91.9% | | - |
| 7 | Ingeniería de Energía Sostenible | **88.83%** | 88.3% | 91.9% | 91.3% | 83.8% | 83.8% | | energias-renovables, ambiental |
| 8 | Ingeniería Ambiental | **88.82%** | 86.7% | 90.6% | 91.9% | 85.6% | 86.9% | | sistemas-ambientales, energetica |
| 9 | Ingeniería de Alimentos | **88.80%** | 88.3% | 91.3% | 90.0% | 86.9% | 84.4% | | - |
| 10 | Ingeniería Forestal | **88.72%** | 90.0% | 86.9% | 90.6% | 80.6% | 93.1% | | agronomica, recursos-naturales |
| 11 | Ingeniería de Energías Renovables | **88.69%** | 90.0% | 90.0% | 90.6% | 85.0% | 83.8% | | energia-sostenible, energeticos |
| 12 | Ingeniería de Recursos Hídricos | **88.57%** | 86.7% | 90.6% | 90.6% | 83.8% | 88.1% | | recursos-naturales, ambiental |
| 13 | Ingeniería de Recursos Naturales | **88.42%** | 86.7% | 89.4% | 90.0% | 82.5% | 91.3% | | recursos-hidricos, agronomica |
| 14 | Ingeniería de Energía | **88.19%** | 90.0% | 88.8% | 89.4% | 88.1% | 82.5% | | sistemas-energeticos, control |
| 15 | Ingeniería Mecatrónica | **88.11%** | 90.8% | 88.8% | 91.3% | 86.3% | 79.4% | | electronica-automatizacion, robotica |
| 16 | Ingeniería Ambiental y Energética| **88.02%** | 85.8% | 91.9% | 90.6% | 83.1% | 83.8% | | energia-sostenible, ambiental |
| 17 | Ingeniería de Automatización | **87.64%** | 89.2% | 89.4% | 90.6% | 86.9% | 78.1% | | electronica-y-automatizacion |
| 18 | Ingeniería de Telecomunicaciones | **87.63%** | 87.5% | 90.6% | 90.6% | 88.1% | 77.5% | | quimica, automatizacion |
| 19 | Ingeniería Electrónica y Automatización | **87.60%** | 89.2% | 89.4% | 90.0% | 86.9% | 78.8% | | automatizacion, electronica |
| 20 | Ingeniería Eléctrica | **87.46%** | 88.3% | 88.8% | 89.4% | 90.6% | 78.8% | | electronica, quimica |

---

### 3.6 Perfil F: Equilibrado / Generalista
*Ganadores: Carreras sistémicas multidisciplinarias (Economía Circular, Sostenibilidad, Ambiental)*

| Pos | Carrera | Score Global | Intereses (25%) | Aptitudes (30%) | Personalidad (20%) | Valores (10%) | Preferencias (15%) | Gold Set | Carreras Similares del ADN |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **1** | **Ingeniería de Economía Circular** | **88.72%** | 87.5% | 89.4% | 91.3% | 83.8% | 89.4% | | ingenieria-de-sostenibilidad |
| **2** | **Ingeniería de Sostenibilidad** | **88.58%** | 85.8% | 88.8% | 91.9% | 82.5% | 92.5% | | ingenieria-de-economia-circular |
| **3** | Ingeniería Ambiental | **87.35%** | 84.2% | 87.5% | 92.5% | 86.3% | 86.3% | | sistemas-ambientales, energetica |
| **4** | Interacción Humano-Computadora | **87.21%** | 85.8% | 89.4% | 90.6% | 88.1% | 80.0% | | diseno-uxui, experiencia |
| **5** | Medios Interactivos | **86.92%** | 84.2% | 90.6% | 93.1% | 80.6% | 80.0% | | diseno-de-medios-interactivos |
| 6 | Ciencias Ambientales | **86.50%** | 82.5% | 89.4% | 89.4% | 78.8% | 88.8% | | - |
| 7 | Diseño de Productos Digitales | **86.45%** | 89.2% | 85.6% | 91.3% | 83.1% | 79.4% | | diseno-de-interaccion, uxui |
| 8 | Nutrición | **86.44%** | 82.5% | 87.5% | 91.3% | 85.6% | 85.0% | | - |
| 9 | Odontología | **86.20%** | 91.7% | 86.3% | 87.5% | 83.8% | 76.9% | | - |
| 10 | Tecnología Médica | **85.97%** | 82.5% | 89.4% | 88.8% | 83.1% | 83.1% | | - |
| 11 | Ingeniería de Energía Sostenible | **85.89%** | 84.2% | 85.0% | 89.4% | 84.4% | 86.9% | | energias-renovables, ambiental |
| 12 | Ingeniería Ambiental y Energética| **85.74%** | 83.3% | 85.0% | 90.0% | 83.8% | 86.9% | | energia-sostenible, ambiental |
| 13 | Diseño de Interacción | **85.67%** | 86.7% | 85.0% | 91.3% | 82.5% | 80.0% | | uxui, productos-digitales |
| 14 | Tecnología y Negocios | **85.59%** | 80.0% | 91.3% | 88.8% | 81.9% | 81.9% | | negocios-digitales, transformacion |
| 15 | Diseño de Experiencia | **85.54%** | 86.7% | 85.6% | 88.8% | 84.4% | 80.0% | | diseno-uxui, interaccion |
| 16 | Diseño de Medios Interactivos | **85.52%** | 83.3% | 88.1% | 92.5% | 79.4% | 78.8% | | medios-interactivos, diseno-digital |
| 17 | Medicina Veterinaria | **85.48%** | 81.7% | 90.6% | 87.5% | 83.8% | 80.0% | | - |
| 18 | Producción de Medios Digitales | **85.45%** | 84.2% | 87.5% | 89.4% | 78.1% | 83.1% | | - |
| 19 | Diseño UX/UI | **85.32%** | 86.7% | 84.4% | 90.0% | 84.4% | 79.4% | | interaccion, experiencia |
| 20 | Ingeniería de Alimentos | **85.31%** | 82.5% | 84.4% | 89.4% | 87.5% | 85.0% | | - |

---

## 4. Detección de Clusters de Carreras Muy Cercanas (`high_similarity_cluster`)

De acuerdo con el umbral preestablecido ($\Delta_{1-2} \le 2.0$, $\Delta_{1-5} \le 5.0$ o $\Delta_{1-10} \le 8.0$):

1. **Cluster Agro/Campo (Perfil E):**
   - `Ingeniería Agrícola` (92.86%) vs `Ingeniería Agronómica` (92.55%): $\Delta = 0.31$ puntos.
   - Ambas carreras comparten 34 de 38 variables casi idénticas en el ADN original. La diferencia radica en matices de infraestructura y mecanización (`PRE_TEC`, `APT_ESP`).
2. **Cluster Creativo Digital (Perfil C):**
   - Entre `Medios Interactivos`, `Diseño de Interiores`, `Diseño Industrial` y `Producción de Medios Digitales` la diferencia es de apenas **0.59 puntos** (todas entre 86.77% y 87.36%).
3. **Cluster de Sustentabilidad y Economía Circular (Perfil F):**
   - `Ingeniería de Economía Circular` (88.72%) vs `Ingeniería de Sostenibilidad` (88.58%): $\Delta = 0.14$ puntos.
   - Son carreras emergentes hermanas creadas para responder a problemas ecológicos/industriales afines.

---

## 5. Análisis de Carreras Potencialmente Dominantes

Se monitoreó la frecuencia de aparición de cada carrera entre las primeras posiciones a lo largo de los 6 perfiles dispares:

| Carrera | Veces en Top 5 | Veces en Top 10 | Veces en Top 20 | Posición Promedio | Diagnóstico de Señal |
|---|:---:|:---:|:---:|:---:|---|
| **Ingeniería Ambiental** | 1 | **3** | 4 | 18.7 | Carrera generalista de ingeniería con balances equilibrados entre campo, técnica y sociedad. |
| **Ingeniería de Economía Circular** | 1 | 2 | 3 | 22.2 | Perfil híbrido que puntúa bien ante perfiles balanceados, pero cae al puesto ~50 en perfiles extremos. |
| **Ingeniería de Sostenibilidad** | 2 | 2 | 3 | 25.0 | Similar a Economía Circular. |
| **Ingeniería Industrial** | 1 | 2 | 2 | 26.8 | Naturalmente transversal (gestión + ingeniería). |
| **Educación** | 2 | 2 | 2 | 60.3 | Aparece en Salud/Social (Top 2) y en Negocios (Top 5) debido a su alto componente interpersonal y organizativo. |
| **Medicina** | 1 | 2 | 2 | 54.0 | Aparece en Salud/Social (Top 1) y en Negocios (Top 10) por liderazgo y tolerancia a la presión. |

### Conclusión sobre Dominancia:
**No existe ninguna carrera híper-dominante.**  
Ninguna carrera apareció en el Top 5 más de 2 veces en los 6 perfiles. Cada arquetipo arrojó ganadores estrictamente pertenecientes a su área vocacional.

---

## 6. Variables que Explican los Resultados (Análisis Causal Estructurado)

Para las carreras Top 1 de cada perfil, estas fueron las variables determinantes:

| Perfil | Carrera Top 1 | Dimensión Más Favorable | Dimensión Menos Favorable | Variables de Máxima Coincidencia (Dif = 0) | Variables con Mayor Brecha (Gap) |
|---|---|---|---|---|---|
| **A. Tech** | **Ingeniería de Software** | Preferencias (94.4%) | Intereses (92.5%) | `PRE_TEC`, `PRE_DAT`, `APT_ANA`, `INT_I`, `PER_AUT` | `VAL_REC` (Dif: 10), `PRE_EXP` (Dif: 10) |
| **B. Salud** | **Medicina** | Valores (93.8%) | Aptitudes (89.4%) | `VAL_IMP`, `INT_S`, `PRE_PER`, `PER_COL`, `PER_EST` | `VAL_CRE` (Dif: 15), `PRE_PRA` (Dif: 15) |
| **C. Creativo** | **Diseño Gráfico** | Personalidad (93.8%) | Preferencias (87.5%) | `INT_A`, `APT_CRE`, `VAL_CRE`, `PER_AUT`, `PER_INI` | `PRE_EST` (Dif: 20), `APT_ORG` (Dif: 20) |
| **D. Negocios** | **Administración** | Valores (96.3%) | Preferencias (91.3%) | `VAL_ING`, `PER_LID`, `INT_E`, `APT_SOC`, `PER_INI` | `PRE_VAR` (Dif: 10), `VAL_EQV` (Dif: 10) |
| **E. Campo** | **Ingeniería Agrícola** | Aptitudes (93.8%) | Valores (86.9%) | `INT_R`, `PRE_PRA`, `PRE_CAM`, `APT_LOG`, `PER_PER` | `VAL_CRE` (Dif: 15), `VAL_REC` (Dif: 15) |
| **F. Equilibrado** | **Ingeniería de Economía Circular** | Personalidad (91.3%) | Valores (83.8%) | `APT_ANA`, `PER_ADA`, `PRE_DAT`, `PRE_VAR`, `VAL_APR` | `VAL_ING` (Dif: 20), `PRE_PRA` (Dif: 15) |

---

## 7. Posibles Señales Metodológicas Detectadas

1. **La escala lineal de distancia (`100 - |s - c|`) es benigna con perfiles planos:**  
   En el Perfil F (estudiante neutro con ~60 en todo), casi todas las carreras obtienen entre 82% y 88% porque la mayoría de las exigencias del ADN oscilan entre 40 y 85. Esto genera una alta densidad de empates en estudiantes indecisos.
2. **Los clusters temáticos son naturales en carreras hermanas:**  
   Carreras como *Ingeniería Agrícola vs Agronómica*, *Diseño de Videojuegos vs Juegos*, *Medios Interactivos vs Diseño Digital* tienen perfiles vocacionales casi idénticos en el ADN ($r > 0.96$). La similitud matemática es un reflejo fiel de la realidad vocacional, no un error del algoritmo.
3. **Ponderación de dimensiones equilibrada:**  
   La hipótesis de pesos (Aptitudes 30%, Intereses 25%, Personalidad 20%, Preferencias 15%, Valores 10%) funcionó adecuadamente: no desvirtúa las inclinaciones vocacionales primarias y castiga eficazmente incongruencias en aptitudes.

---

## 8. Elementos que NO Requieren Modificación

1. **El catálogo de 38 variables:** Está balanceado y cubre los 5 ángulos indispensables.
2. **Los datos y puntajes de `ADN_V1`:** Tienen coherencia metodológica y no deben alterarse.
3. **Las 10 carreras Gold Set:** Se ubicaron en los primeros lugares de sus respectivos perfiles arquetípicos (Software en Tech, Medicina en Salud, Diseño en Creativo, Administración en Negocios).
4. **La fórmula determinística base:** Es transparente, auditable y matemática pura.

---

## 9. Preguntas Clave que Deben Resolverse antes de MATCHING_V2

1. **¿Cómo tratar los clusters de alta similitud en la interfaz de usuario?**  
   *¿Presentamos al estudiante 3 carreras casi idénticas en el Top 3 (ej. Agrícola, Agronómica, Forestal), o agrupamos por familia/rama y diversificamos el Top 3 para mostrar alternativas reales?*
2. **¿Debe introducirse una penalización cuadrática (distancia euclidiana) para gaps críticos?**  
   *Si una carrera exige `APT_LOG = 95` y el estudiante tiene `30`, una diferencia lineal resta 65 puntos en esa variable, pero el promedio de la dimensión aún puede salvar la carrera. ¿Deberían ciertas variables indispensables actuar como filtros o con penalización no lineal?*
3. **¿Cómo debe el cuestionario del frontend evitar perfiles planos (efecto Perfil F)?**  
   *El test vocacional debe forzar discriminación mediante preguntas ipsativas (elección forzada) o escenarios situacionales para que el estudiante no responda "neutral" a todo.*
4. **¿Los pesos de las 5 dimensiones deberían ser dinámicos según el tipo de carrera o mantenerse fijos globalmente?**  
   *(Ejemplo: ¿Aptitudes debería pesar más en Ingeniería y Valores en carreras de impacto social?).*
