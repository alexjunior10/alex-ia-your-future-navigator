Sí\. Y aquí creo que tenemos que ser bastante ambiciosos con el diseño, porque __el cuestionario puede convertirse en una de las principales diferencias de Alex IA__\.

No quiero que terminemos con el típico:

"Del 1 al 5, ¿te gusta trabajar con personas?"

porque para un estudiante de 13–19 años eso puede sentirse como un formulario escolar y además producir perfiles demasiado planos\. Precisamente la calibración mostró que un perfil generalista puede terminar con __39 carreras dentro de una diferencia de solo 5 puntos__, lo que indica que la calidad de las respuestas de entrada será crítica\. 

A continuación te propongo el __QUESTIONNAIRE DESIGN V1 — Manual de Diseño del Test ADN Vocacional de Alex IA__\.

__QUESTIONNAIRE DESIGN V1__

__Manual de diseño del Test ADN Vocacional — Alex IA__

__Versión:__ QD\_V1  
__Producto:__ Alex IA  
__Población objetivo:__ adolescentes y jóvenes aproximadamente de 13 a 19 años, con posibilidad de ampliar posteriormente a jóvenes de mayor edad\.  
__Motor asociado:__ ADN Vocacional V1 \+ MATCHING\_V1  
__Número de variables:__ 38  
__Dimensiones:__ Intereses, Aptitudes, Personalidad, Valores y Preferencias\.

__1\. Objetivo del cuestionario__

El objetivo del cuestionario no es preguntarle directamente al estudiante:

"¿Qué carrera quieres estudiar?"

ni tampoco:

"¿Qué tan bueno eres en matemática?"

Su objetivo es __inferir un perfil vocacional multidimensional__ a partir de comportamientos, preferencias, decisiones y reacciones ante situaciones\.

El cuestionario debe transformar:

__respuestas del estudiante__

↓

__evidencia conductual/preferencial__

↓

__38 variables ADN__

↓

__perfil vocacional__

↓

__matching con carreras__

El cuestionario debe ayudar a que Alex IA pueda decir:

"Hay patrones en lo que te interesa, cómo piensas, cómo trabajas y qué valoras\."

en lugar de:

"Contestaste que te gusta la tecnología, por eso eres ingeniero\."

__Objetivo secundario__

El cuestionario debe generar información suficientemente rica para que posteriormente el sistema pueda:

- detectar fortalezas; 
- detectar áreas menos compatibles; 
- identificar combinaciones; 
- encontrar rutas profesionales; 
- alimentar el Exploration Engine; 
- permitir al LLM explicar el resultado\. 

__2\. Principios metodológicos__

Estos serán los principios que deberán gobernar todo el cuestionario\.

__Principio 1 — No preguntar directamente lo que queremos medir__

Evitar:

"¿Eres una persona creativa?"

Preferir:

"Te dan un problema y nadie te dice cómo resolverlo\. ¿Qué haces primero?"

__Principio 2 — Priorizar situaciones sobre declaraciones__

Evitar:

"Me gusta liderar\."

Preferir:

"En un proyecto grupal donde nadie está organizando nada, ¿qué haces?"

__Principio 3 — Forzar pequeñas decisiones__

No todo debe permitir marcar:

"Todas me gustan\."

Utilizaremos __elección forzada__ cuando sea metodológicamente apropiado\.

__Principio 4 — No convertir preferencias actuales en destino profesional__

Que un adolescente diga:

"Me gustan los videojuegos"

NO significa:

"Debe estudiar videojuegos\."

La señal debe combinarse con otras evidencias\.

__Principio 5 — El estudiante no debe saber exactamente qué estamos midiendo__

Esto es importante\.

No queremos que piense:

"Ah, esta pregunta está midiendo liderazgo, entonces voy a marcar liderazgo\."

Queremos respuestas más espontáneas\.

__Principio 6 — Evitar perfiles artificialmente planos__

La calibración mostró que los perfiles excesivamente equilibrados generan demasiadas coincidencias cercanas\. 

Por eso utilizaremos:

- elecciones relativas; 
- escenarios; 
- trade\-offs; 
- preguntas de preferencia; 
- consistencia; 
- variedad de formatos\. 

__Principio 7 — Lenguaje adolescente, no lenguaje psicométrico__

No:

"Evalúa tu grado de tolerancia a la ambigüedad\."

Sí:

"Si las reglas cambian a mitad del proyecto, ¿qué tan cómodo te sentirías?"

__Principio 8 — Tecnología como contexto, no como carrera__

Un adolescente puede ser experto usando tecnología y no querer estudiar tecnología\.

Por eso:

TikTok \+ videojuegos \+ IA \+ celular

no deben traducirse automáticamente en:

Tecnología\.

__Principio 9 — No penalizar respuestas "raras"__

Alex IA debe poder encontrar combinaciones poco habituales\.

Por ejemplo:

__arte \+ tecnología \+ lógica__

puede abrir:

videojuegos, UX, computación gráfica, interacción\.

__Principio 10 — El cuestionario no decide__

El resultado debe expresarse como:

"Tu perfil muestra mayor afinidad\.\.\."

no:

"Tu carrera es\.\.\."

__3\. Las 38 variables__

Las 38 variables oficiales se mantienen intactas\.

__Intereses — 6__

- INT\_R 
- INT\_I 
- INT\_A 
- INT\_S 
- INT\_E 
- INT\_C 

__Aptitudes — 8__

- APT\_LOG 
- APT\_NUM 
- APT\_VER 
- APT\_ANA 
- APT\_ESP 
- APT\_CRE 
- APT\_SOC 
- APT\_ORG 

__Personalidad — 8__

- PER\_SOC 
- PER\_INI 
- PER\_PER 
- PER\_ADA 
- PER\_COL 
- PER\_AUT 
- PER\_LID 
- PER\_EST 

__Valores — 8__

- VAL\_EST 
- VAL\_ING 
- VAL\_IMP 
- VAL\_REC 
- VAL\_CRE 
- VAL\_APR 
- VAL\_AUT 
- VAL\_EQV 

__Preferencias — 8__

- PRE\_PER 
- PRE\_DAT 
- PRE\_PRA 
- PRE\_VAR 
- PRE\_EST 
- PRE\_CAM 
- PRE\_TEC 
- PRE\_EXP 

__No agregar, eliminar ni fusionar variables en QD\_V1\.__

__4\. Qué evidencia necesita cada variable__

Este es probablemente __el corazón del manual__\.

No queremos:

Variable → pregunta directa\.

Queremos:

Variable → conjunto de evidencias\.

Por ejemplo:

__INT\_A — Interés artístico__

No preguntamos:

"¿Te gusta el arte?"

Buscamos evidencia en:

- interés por expresión visual; 
- creación; 
- estética; 
- música; 
- imaginación; 
- diseño; 
- producción creativa\. 

__APT\_LOG — Razonamiento lógico__

Evidencia:

- detectar reglas; 
- encontrar patrones; 
- resolver problemas; 
- identificar relaciones; 
- estructurar soluciones\. 

__PER\_LID — Liderazgo__

Evidencia:

- tomar iniciativa en grupos; 
- coordinar; 
- asumir responsabilidad; 
- movilizar personas; 
- tomar decisiones\. 

__VAL\_AUT — Autonomía__

Evidencia:

- preferencia por decidir; 
- necesidad de independencia; 
- comodidad trabajando sin supervisión; 
- preferencia por construir su propio camino\. 

__PRE\_CAM — Preferencia por cambio/movilidad__

Evidencia:

- comodidad ante cambios; 
- variedad de entornos; 
- movimiento; 
- actividades no rutinarias; 
- trabajo fuera de un lugar fijo\. 

Esto significa que __cada variable debería tener múltiples evidencias__, no una sola pregunta\.

__5\. Tipos de pregunta__

Utilizaríamos una mezcla de formatos\.

__Tipo A — Situación__

Estás trabajando en un proyecto y aparece un problema inesperado\. ¿Qué haces primero?

__Tipo B — Elección forzada__

¿Cuál preferirías?

A / B\.

__Tipo C — Ranking corto__

Ordena estas tres actividades desde la que más te atrae hasta la que menos\.

Utilizar con moderación\.

__Tipo D — Escenario__

Imagínate trabajando durante seis meses en un proyecto\.\.\.

__Tipo E — Preferencia de entorno__

¿En cuál de estos lugares te imaginarías trabajando?

__Tipo F — Mini dilema__

Tienes dos opciones\.\.\.

Esto permite observar __trade\-offs__\.

__6\. Blueprint de preguntas__

Antes de escribir las preguntas finales vamos a construir un mapa\.

Por ejemplo:

__Pregunta__

__Principal__

__Secundarias__

Q01

INT\_I

APT\_ANA

Q02

PER\_LID

PER\_INI, PER\_COL

Q03

INT\_A

APT\_CRE

Q04

PRE\_CAM

PER\_ADA

Q05

APT\_LOG

APT\_ANA

Q06

VAL\_IMP

VAL\_EQV

Q07

PRE\_TEC

INT\_I

Q08

APT\_SOC

PER\_SOC

\.\.\.

\.\.\.

\.\.\.

El objetivo será que las 38 variables tengan __múltiples puntos de evidencia__\.

No quiero una situación donde:

"APT\_NUM depende de Q14\."

Porque si el estudiante interpreta mal Q14, destruimos toda la variable\.

__7\. Sistema de puntuación__

Aquí tenemos que separar tres cosas:

__Respuesta__

Lo que selecciona el estudiante\.

↓

__Evidencia__

Qué variables está apoyando esa respuesta\.

↓

__Score__

Cómo esa evidencia termina produciendo un valor 0–100\.

El estudiante __nunca verá este cálculo__\.

Por ejemplo, conceptualmente:

Q07

Respuesta B

→ evidencia:

APT\_ANA \+12

INT\_I \+8

PRE\_DAT \+5

Después de suficientes preguntas:

APT\_ANA = 87

INT\_I = 82

PRE\_DAT = 74

Y finalmente:

ADN\_V1

38 variables

__Importante__

No debemos decidir todavía que cada respuesta valdrá exactamente \+10, \+15, etc\.

Primero diseñaremos el blueprint y después definiremos el __scoring model__\.

__8\. Manejo de respuestas contradictorias__

Esto es importante\.

Supongamos:

Pregunta 5:

"Prefiero trabajar con otras personas\."

Respuesta: muy alta\.

Pero 20 preguntas después:

"Cuando trabajo en grupo, prefiero hacer todo por mi cuenta\."

No debemos concluir:

"El estudiante mintió\."

Debemos calcular __consistencia de evidencia__\.

Podríamos tener:

PER\_COL = 76

confidence = MEDIUM

en lugar de:

PER\_COL = 76

confidence = HIGH

Esto abre una posibilidad futura muy interesante:

__Alex podría decir:__

"Tu perfil muestra una combinación interesante: disfrutas colaborar, pero también necesitas bastante autonomía\."

Eso es mucho más útil que forzar una sola etiqueta\.

__9\. Detección de perfiles planos__

El sistema deberá analizar:

max\(score\) \- min\(score\)

y también la distribución\.

Por ejemplo:

INT:

78

75

73

77

76

74

es bastante plano\.

Pero:

95

82

68

45

30

20

es mucho más diferenciado\.

No significa que un perfil plano sea incorrecto\.

Debe ser:

__un estado que requiere análisis\.__

Podríamos posteriormente realizar:

- una pregunta de desempate; 
- mayor confianza relativa; 
- exploración de rutas\. 

Esto responde directamente a uno de los problemas detectados en Calibration V1\. 

__10\. Detección de patrones de respuesta__

Detectar:

__Straight\-lining__

Ejemplo:

A, A, A, A, A, A\.\.\.

__Todo alto__

5, 5, 5, 5\.\.\.

__Todo bajo__

1, 1, 1\.\.\.

__Respuesta demasiado rápida__

Si técnicamente podemos medirlo\.

__Contradicciones__

Preguntas equivalentes con respuestas opuestas\.

__Selección aleatoria__

Patrones estadísticamente improbables\.

Pero __no penalizar automáticamente__\.

Estos indicadores deben generar:

response\_quality

y no modificar arbitrariamente el ADN\.

__11\. Reglas de consistencia__

Tendremos algunas preguntas deliberadamente relacionadas\.

Ejemplo:

__Q08__

En un equipo, ¿qué prefieres hacer?

__Q31__

Cuando un proyecto grupal se desordena, ¿qué haces?

No son la misma pregunta\.

Pero ambas proporcionan evidencia sobre:

- PER\_COL 
- PER\_LID 
- PER\_ORG 

Esto permite verificar coherencia\.

__12\. Duración objetivo__

Para 13–19 años:

__Objetivo:__

__8–12 minutos\.__

Idealmente:

__35–45 preguntas\.__

Pero no debemos fijar "40 preguntas" por obligación\.

Si logramos obtener suficiente evidencia con 34:

Si necesitamos 43:

La métrica será:

__información obtenida por minuto__, no cantidad de preguntas\.

__13\. Versionado__

Todo debe tener versión\.

QUESTIONNAIRE\_V1

Cada pregunta tendrá:

question\_id

version

dimension

variables\_targeted

question\_type

options

scoring\_rules

Esto permite que dentro de un año sepamos:

"Este estudiante respondió Questionnaire V1\."

y no mezclarlo con V2\.

__14\. Plan de calibración__

Después de construir QD\_V1:

__Fase A__

Simular perfiles\.

__Fase B__

Probar el cuestionario internamente\.

__Fase C__

Probar con estudiantes reales\.

__Fase D__

Generar perfiles\.

__Fase E__

Pasar esos perfiles por MATCHING\_V1\.

__Fase F__

Analizar:

- concentración; 
- diferenciación; 
- consistencia; 
- estabilidad; 
- sensibilidad; 
- carreras hermanas; 
- perfiles planos\. 

Entonces tendremos:

__CALIBRATION V2__

La calibración anterior fue útil como laboratorio inicial, pero se basó en seis perfiles sintéticos\. 

La V2 debe evaluar __perfiles producidos por el propio cuestionario__\.

__15\. Pruebas con perfiles sintéticos__

Antes de estudiantes reales crearemos perfiles como:

__Perfil A__

Tecnología \+ lógica

__Perfil B__

Arte \+ creatividad

__Perfil C__

Salud \+ personas

__Perfil D__

Negocios \+ liderazgo

__Perfil E__

Naturaleza \+ campo

__Perfil F__

Generalista

__Perfil G__

Tecnología \+ arte

__Perfil H__

Ciencia \+ personas

__Perfil I__

Negocios \+ tecnología

__Perfil J__

Creatividad \+ personas

Y hay uno especialmente importante:

__Perfil híbrido__

Por ejemplo:

Tecnología \+ Arte \+ Creatividad

porque precisamente queremos comprobar si Alex descubre:

videojuegos / UX / interacción / computación gráfica

sin que el sistema tenga que inventar una carrera\.

__16\. Criterios para pasar a producción__

No debemos decir simplemente:

"Las preguntas funcionan\."

Necesitamos criterios\.

__El cuestionario debe demostrar:__

__Cobertura__

Las 38 variables reciben evidencia suficiente\.

__Discriminación__

No produce sistemáticamente perfiles planos\.

__Consistencia__

Las preguntas relacionadas no producen contradicciones excesivas\.

__Estabilidad__

Pequeños cambios no destruyen completamente el perfil\.

__Sensibilidad__

Cambiar una respuesta relevante debe producir cambios razonables\.

__Interpretabilidad__

Podemos explicar de dónde salió una variable\.

__UX__

El estudiante entiende las preguntas\.

__Engagement__

El estudiante no abandona masivamente\.

__17\. Diseño específico para Gen Alpha / adolescentes__

Este punto para mí debe ser __obligatorio en el manual__\.

No debemos diseñar como si estuviéramos haciendo un test para adultos\.

__Principio 1__

__Primero la experiencia, después la psicometría visible\.__

La psicometría está detrás\.

__Principio 2__

Preguntas cortas\.

No:

"Cuando te enfrentas a situaciones caracterizadas por incertidumbre\.\.\."

Sí:

"Si las reglas cambian a mitad del juego, ¿qué haces?"

__Principio 3__

Visual\.

Cards, iconos, microanimaciones\.

__Principio 4__

Una pregunta por pantalla\.

No 15 preguntas en una página\.

__Principio 5__

Feedback de progreso\.

Pero evitar:

"Pregunta 27 de 42 😩"

Mejor:

__Vamos 60% 🚀__

__Principio 6__

Evitar infantilizar\.

13 años no significa "niño"\.

El diseño debe sentirse:

moderno \+ juvenil \+ inteligente\.

No:

colores infantiles \+ emojis por todas partes\.

__Principio 7__

No usar demasiado lenguaje de IA\.

El estudiante no necesita saber:

"Ahora nuestra IA analizará tus variables\."

Mejor:

__"Ya casi terminamos\. Estamos armando el mapa de cómo eres y qué te mueve\."__

__Principio 8__

Microinteracciones\.

Después de ciertas preguntas:

"Interesante 👀"

"Esto dice algo distinto a lo anterior\."

Pero sin revelar el diagnóstico\.

__Principio 9__

Evitar preguntas que dependan de experiencias adultas\.

Por ejemplo:

"¿Prefieres estabilidad laboral?"

Un adolescente puede no entender realmente lo que implica\.

Mejor:

"¿Qué te atrae más?"

__A\.__ Saber exactamente qué haré cada día\.  
__B\.__ Tener días diferentes\.  
__C\.__ Poder decidir cómo trabajar\.  
__D\.__ Probar cosas nuevas constantemente\.

__Principio 10__

Permitir "no sé"\.

Esto es fundamental\.

Un adolescente de 13 años __no tiene por qué saber quién quiere ser__\.

"No sé" no debe interpretarse automáticamente como una señal negativa\.

__18\. Arquitectura final__

La arquitectura conceptual del cuestionario queda:

                  ONBOARDING DISCOVERY

                         │

                 3 preguntas rápidas

                         │

                 Discovery Signals

                         │

                         ▼

                QUESTIONNAIRE V1

                    35–45 Q

                         │

           ┌─────────────┴─────────────┐

           │                           │

     Evidencia por variable       Consistencia

           │                           │

           └─────────────┬─────────────┘

                         ▼

                  ADN VOCACIONAL

                    38 variables

                         │

                         ▼

                    MATCHING V1

                         │

                ┌────────┴────────┐

                │                 │

             Ranking          Discovery

          cuantitativo         Signals

                │                 │

                └────────┬────────┘

                         ▼

                 EXPLORATION ENGINE

                         │

                         ▼

                       LLM

                         │

                         ▼

                EXPERIENCIA FINAL

__Pero hay una decisión importante que todavía NO cerraría__

Hay algo que debemos diseñar __antes de escribir las 35–45 preguntas__:

__¿Cómo exactamente una respuesta se convierte en un score 0–100?__

Porque tenemos dos caminos:

__Modelo A — directo__

Respuesta → score de variables\.

__Modelo B — evidencia acumulada__

Respuesta → evidencia → múltiples señales → estimación final\.

Yo prefiero __B__ para Alex IA\.

Y además podríamos tener:

Score: 84

Confidence: 0\.82

Evidence: 6 preguntas

Esto sería muy potente para el sistema, aunque __no necesariamente se mostraría al estudiante__\.



__19\. Adaptación por etapa educativa__

Este capítulo formaliza la metodología de adaptación del cuestionario según la etapa educativa del estudiante (3.º, 4.º y 5.º de secundaria), garantizando la invariancia del constructo y un diseño para comparabilidad psicométrica.

__REGLA METODOLÓGICA FUNDAMENTAL:__
> "Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."

1. __El grado escolar es la variable principal de adaptación:__ Se adopta grade_level (3S, 4S, 5S) como eje segmentador. La edad cronológica se descarta como variable primaria. Egresados se tratará posteriormente como cohorte independiente.
2. __Invariancia del constructo:__ Cada pregunta evalúa rigurosamente la misma variable canónica del ADN Vocacional (las 38 variables oficiales). No se crean variables fragmentadas por grado.
3. __Diseño para comparabilidad psicométrica y evaluación en piloto:__ El cuestionario se diseña conceptual y operacionalmente para maximizar la comparabilidad. La invariancia psicométrica empírica entre 3S, 4S y 5S será evaluada y contrastada posteriormente con los datos del piloto.
4. __Confirmación de V1 con las 40 preguntas actuales:__ V1 utilizará exactamente las 40 preguntas actuales del banco. No se crearán variantes adicionales de dificultad antes del piloto; las posibles variantes Q29_5S o Q30_5S quedan formalmente registradas únicamente como hipótesis técnicas para calibración posterior.
5. __Ámbitos de adaptación contextual:__ En 3S los problemas se sitúan en dinámicas cotidianas del aula y tareas guiadas; en 5S en proyectos autónomos con fechas límite, restricciones de recursos e interacción comunitaria.
6. __Parsimonia psicométrica y proporción de adaptación:__ 28 preguntas (70%) operan en versión BASE universal (incluyendo Q34 experimental sin scoring), 10 preguntas (25%) incorporan adaptación contextual o léxica (Q05, Q13, Q15, Q17, Q19, Q21, Q23, Q26, Q35, Q39), y 2 preguntas de aptitud (5%) quedan bajo observación de calibración en piloto (Q29, Q30) junto con la calibración perceptual de Q33.
7. __Unicidad del Motor de Matching (MATCHING_V1):__ El algoritmo y las 132 carreras operan de manera idéntica e independiente del grado.
8. __Registro de metadatos del intento:__ Cada intento registra grade_level, student_id, attempt_id y variant_id para analítica psicométrica.
9. __Versionamiento formal:__ Codificación normalizada con question_id, base_question_id, variant_id, grade_level y difficulty_level.
