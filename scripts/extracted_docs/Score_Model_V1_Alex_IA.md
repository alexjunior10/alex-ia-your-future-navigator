__ALEX IA — SCORE MODEL V1__

*Modelo de puntuación del cuestionario ADN Vocacional · SCORE\_V1*

Este documento define cómo transformar las respuestas del Question Bank V1 en evidencia para las 38 variables oficiales del ADN Vocacional y, finalmente, en un perfil 0–100 compatible con MATCHING\_V1\. Es una especificación de scoring para pilotaje; no pretende presentar como validado psicométricamente un modelo que todavía requiere calibración con estudiantes reales\.

# 1\. Principios

- El cuestionario mide evidencia sobre variables; no asigna carreras directamente\.
- Las 38 variables oficiales no se modifican\.
- MATCHING\_V1 recibe un vector final de 38 scores entre 0 y 100\.
- La respuesta de una pregunta puede aportar evidencia a varias variables, pero cada aporte debe estar explícitamente trazado\.
- Interés, aptitud, personalidad, valor y preferencia conservan significado separado\.
- La ausencia de evidencia no debe interpretarse automáticamente como baja puntuación\.
- El modelo debe ser determinista: misma respuesta \+ misma versión = mismo perfil\.
- Los resultados intermedios deben conservar trazabilidad para poder explicar de dónde salió cada score\.
- El score es un indicador de compatibilidad con el constructo definido, no una medida de talento absoluto, inteligencia, éxito futuro o valor personal\.

# 2\. Flujo completo

Respuesta → evidencia de opción → peso de pregunta → agregación por variable → normalización 0–100 → indicador de cobertura/confianza → perfil ADN 38D → MATCHING\_V1\.

# 3\. Escala de evidencia

Evidencia

Valor

Interpretación

Uso

Muy favorable

\+2

La respuesta aporta evidencia clara hacia la variable

Suma completa

Favorable

\+1

Aporta evidencia moderada

Suma parcial

Neutra

0

No discrimina claramente

No empuja el score

Desfavorable

\-1

Aporta evidencia moderada en sentido contrario

Resta parcial

Muy desfavorable

\-2

Aporta evidencia clara en sentido contrario

Resta completa

# 4\. Pesos por tipo de pregunta

Tipo

Peso

Razón

Ejemplos

Mini\-reto objetivo

1\.25

Existe una respuesta/dificultad observable

Q29–Q33

Mini\-caso con criterio

1\.10

Permite observar resolución aplicada

Q35–Q36

Escenario/dilema

1\.00

Evidencia conductual contextual

Q03,Q13,Q16,Q18\.\.\.

Elección forzada

0\.90

Discrimina preferencias, pero depende del contexto

Q01,Q04,Q23\.\.\.

Consistencia/integración

0\.75

Sirve principalmente para corroborar patrones

Q37–Q40

Los pesos son iniciales\. No deben interpretarse como pesos psicométricos validados\. En Calibration V2 podrán ajustarse con datos de respuesta reales\.

# 5\. Regla de evidencia por opción

Cada alternativa se codifica antes de la implementación\. Una alternativa puede producir evidencia en 1–4 variables\. Ejemplo conceptual: si Q01 opción A representa interés por construir/reparar, puede codificarse INT\_R = \+2 y dejar INT\_I, INT\_A e INT\_S en 0\. No se debe asignar automáticamente −2 a las otras variables solo porque el estudiante no las eligió\.

Regla clave: en una elección forzada, 'no elegir' no significa 'rechazar'\. Por defecto, las alternativas no elegidas generan 0, salvo que el diseño del ítem haya sido expresamente construido como trade\-off bipolar\.

# 6\. Agregación por variable

Para cada variable V se calculan aportes ponderados:

E\(V\) = Σ\(eᵢ × wᵢ × qᵢ × cᵢ\) / Σ\(wᵢ × qᵢ × cᵢ\)

donde eᵢ es la evidencia −2\.\.\+2; wᵢ es el peso del tipo de pregunta; qᵢ es el peso de calidad de respuesta; cᵢ es un factor de consistencia/cobertura definido más adelante\.

Si no existe evidencia válida para una variable, no se fuerza un valor artificial de 0 de evidencia\. El sistema conserva un estado 'insuficiente' y aplica el prior neutro 50 únicamente para poder completar el vector que consume MATCHING\_V1\.

# 7\. Transformación a 0–100

Transformación provisional: Score\_base\(V\) = 50 \+ 25 × E\(V\)\. Como E\(V\) está entre −2 y \+2, el resultado queda entre 0 y 100\.

Ejemplos: E=\+2 → 100; E=\+1 → 75; E=0 → 50; E=−1 → 25; E=−2 → 0\.

Este mecanismo conserva un centro neutro en 50 y evita que una sola respuesta convierta una variable en 0 o 100 salvo que exista evidencia explícita de extremo\.

# 8\. Cobertura y shrinkage

Para evitar que una variable con una sola evidencia parezca tan confiable como una variable observada en varios contextos, el sistema calculará un indicador de cobertura independiente del score\.

Cobertura

Evidencias válidas

Estado

Acción

Baja

1

INSUFICIENTE

Mantener score provisional cercano a 50 y marcar para calibración

Media

2

PARCIAL

Score utilizable con confianza limitada

Adecuada

3

SUFICIENTE

Score normal para MATCHING\_V1

Alta

4\+

ROBUSTA

Mayor estabilidad ante una respuesta aislada

Para V1 se recomienda NO alterar agresivamente el score por cobertura; el sistema debe mostrar la cobertura como metadata\. Después del piloto se decidirá si hace falta shrinkage estadístico\. Esto evita introducir una corrección arbitraria antes de tener datos reales\.

# 9\. Calidad de respuesta

qᵢ será 1\.0 por defecto\. Se podrá reducir únicamente por señales explícitas de calidad, nunca por la respuesta 'que no nos gusta'\.

- Respuesta omitida/no válida: q=0 para ese ítem\.
- No sé / prefiero no responder: q=0 para la evidencia de ese ítem, salvo que el formato permita tratarla como señal específica\.
- Respuesta demasiado rápida: NO penalizar automáticamente en V1\.
- Contradicción entre preguntas: NO penalizar automáticamente; registrar inconsistencia para análisis\.
- Patrón de selección repetitiva: registrar como señal de calidad, pero no cambiar automáticamente el score en V1\.

# 10\. Mini\-retos de aptitud

Los mini\-retos objetivos no deben convertirse en una escala de autopercepción\. Para Q29–Q33, la respuesta correcta aporta evidencia positiva y la incorrecta aporta evidencia limitada/negativa según la dificultad\. En V1 se recomienda una codificación conservadora:

Resultado

Evidencia base

Interpretación

Ejemplo

Correcta

\+2

Desempeño favorable en el ítem

Q29

Incorrecta

−1

No demuestra el desempeño esperado; no equivale a incapacidad

Q29

Omitida

0

Sin evidencia

Q29

No se recomienda usar −2 por una sola respuesta incorrecta\. El nivel de aptitud debe emerger de varios ítems y, posteriormente, de dificultad calibrada\.

# 11\. Mini\-reto creativo Q34

Q34 no debe calificarse simplemente por escoger C\. Para la versión implementable, conviene convertirlo en respuesta abierta breve o en una tarea con varias alternativas de calidad previamente rubricadas\.

- 0: no genera una alternativa aplicable\.
- \+1: genera una alternativa útil pero convencional\.
- \+2: genera varias alternativas o una solución claramente original y adecuada al problema\.

# 12\. Consistencia

Q37–Q40 son corroborativas\. Una discrepancia no invalida al estudiante: puede representar contexto, ambivalencia real o error de medición\. El motor debe conservar una métrica de consistencia separada\.

Consistency\_Index\_V1 = 1 − \(número de contradicciones relevantes / número de pares contrastados\)\. Rango 0–1\. En V1 se reporta como metadata y NO se usa para bajar directamente los 38 scores\.

# 13\. Perfil plano

Un perfil plano ocurre cuando muchas variables quedan cerca del centro y ninguna dimensión muestra señales claras\. V1 no debe inventar diferenciación\. Se calcularán:

- Media del vector de 38 variables\.
- Desviación estándar del vector\.
- Número de variables ≥75\.
- Número de variables ≤25\.
- Entropía/diversidad de preferencias e intereses cuando se implemente\.

Si el perfil es demasiado plano, el resultado puede etiquetarse internamente como 'perfil aún por explorar'\. La interfaz podrá recomendar explorar más antes de presentar una conclusión fuerte\.

# 14\. Separación de dimensiones

Primero se calcula cada variable individual\. Luego se puede calcular un resumen por dimensión únicamente como metadata:

Dimensión

Variables

Peso posterior en MATCHING\_V1

Intereses

INT\_R, INT\_I, INT\_A, INT\_S, INT\_E, INT\_C

25%

Aptitudes

APT\_LOG, APT\_NUM, APT\_VER, APT\_ANA, APT\_ESP, APT\_CRE, APT\_SOC, APT\_ORG

30%

Personalidad

PER\_SOC, PER\_INI, PER\_PER, PER\_ADA, PER\_COL, PER\_AUT, PER\_LID, PER\_EST

20%

Valores

VAL\_EST, VAL\_ING, VAL\_IMP, VAL\_REC, VAL\_CRE, VAL\_APR, VAL\_AUT, VAL\_EQV

10%

Preferencias

PRE\_PER, PRE\_DAT, PRE\_PRA, PRE\_VAR, PRE\_EST, PRE\_CAM, PRE\_TEC, PRE\_EXP

15%

Estos pesos no se vuelven a aplicar dentro de SCORE\_V1\. Se aplican posteriormente en MATCHING\_V1, tal como está definido en el motor de matching\.

# 15\. Contradicciones y respuestas difíciles

- No imponer coherencia artificial: una persona puede valorar estabilidad y preferir variedad, o valorar autonomía y funcionar mejor con estructura\.
- Contradicción entre dos preguntas del mismo constructo genera señal para revisión, no castigo\.
- Si una pregunta está mal entendida o tiene evidencia de mala calidad, puede excluirse del agregado sin modificar respuestas anteriores\.
- El sistema debe guardar evidencia por pregunta para poder recalcular el perfil cuando cambie SCORE\_MODEL\_VERSION\.

# 16\. Ejemplo completo

Supongamos que INT\_I recibe tres evidencias: \+2 en Q01, \+2 en Q03 y \+1 en Q06\. Con pesos 0\.90, 1\.00 y 0\.90:

E\(INT\_I\) = \(2×0\.90 \+ 2×1\.00 \+ 1×0\.90\) / \(0\.90\+1\.00\+0\.90\) = 1\.625

Score\_base = 50 \+ 25×1\.625 = 90\.625 → presentación: 90\.6 \(o 91 si la UI requiere entero\)\.

El valor exacto almacenado debe conservar precisión suficiente; el redondeo se hace solo en presentación\.

# 17\. Estructura de datos recomendada

test\_response  
\- response\_id  
\- test\_attempt\_id  
\- question\_id  
\- selected\_option  
\- raw\_answer  
\- response\_time\_ms  
\- valid  
\- quality\_flag  
\- question\_bank\_version  
  
variable\_evidence  
\- test\_attempt\_id  
\- variable\_code  
\- question\_id  
\- evidence\_value \(\-2\.\.\+2\)  
\- question\_weight  
\- quality\_weight  
\- weighted\_evidence  
\- scoring\_version  
  
test\_profile  
\- test\_attempt\_id  
\- variable\_code  
\- score\_0\_100  
\- evidence\_count  
\- coverage\_status  
\- consistency\_status  
\- scoring\_version  
\- created\_at

# 18\. Reglas de versionado

- QUESTION\_BANK\_V1 identifica el contenido y opciones\.
- SCORE\_V1 identifica cómo las respuestas se convierten en evidencia/scores\.
- MATCHING\_V1 permanece separado\.
- Cambiar una asignación de respuesta→variable requiere nueva versión de SCORE\_MODEL\.
- Cambiar preguntas/opciones requiere nueva versión de QUESTION\_BANK\.
- Los resultados históricos deben conservar las versiones con las que fueron calculados\.

# 19\. Criterios para pasar a implementación

- Cada una de las 38 variables tiene al menos 3 oportunidades razonables de evidencia en el banco final o una justificación explícita para cobertura menor\.
- Todas las opciones del banco tienen mapping explícito y revisado\.
- No existen mappings ambiguos como '\+1/\+\.\.\.' o reglas que dependan de interpretación del desarrollador\.
- Las preguntas de aptitud tienen claves de corrección y dificultad documentadas\.
- Q34 tiene una rúbrica implementable\.
- Existe un esquema de almacenamiento de respuestas y evidencia trazable\.
- El motor produce exactamente 38 scores 0–100\.
- El motor es determinista y versionado\.
- Se puede recalcular un resultado histórico con la misma versión\.
- Se realiza un piloto antes de Calibration V2\.

# 20\. Decisiones que deliberadamente dejamos abiertas

- Los pesos exactos por pregunta se podrán recalibrar con datos reales\.
- La función de shrinkage por cobertura no se fija todavía\.
- Los umbrales de perfil plano se determinarán después del piloto\.
- La dificultad de los mini\-retos se calibrará por edad/grado\.
- No se decide todavía un modelo adaptativo\.
- No se altera el ADN de las 132 carreras ni MATCHING\_V1\.

# 21\. Próximo paso

Antes de pedir a Antigravity que implemente el scoring, hay una revisión necesaria del Question Bank: convertir cada pregunta en un mapping de opciones completamente estructurado\. En particular, algunas preguntas del banco inicial tienen mappings resumidos que sirven para diseño humano pero todavía no son una especificación inequívoca para código\. La siguiente versión debe contener una matriz QUESTION × OPTION × VARIABLE × EVIDENCE × WEIGHT\.



# 22\. Metadatos de adaptación por grado y comparabilidad longitudinal

__REGLA METODOLÓGICA FUNDAMENTAL:__
> "Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."

1. __Invarianza del cálculo de scoring:__ La normalización de evidencia y la transformación a 0–100 [Score(V) = 50 + 25 × E(V)] se ejecuta idénticamente para 3S, 4S y 5S. No existen fórmulas ni ponderaciones diferenciadas por grado.
2. __Invariancia del constructo y diseño para comparabilidad:__ El modelo se fundamenta en la invariancia del constructo y el diseño para comparabilidad psicométrica. Se deja explícito que la invariancia psicométrica empírica entre 3S, 4S y 5S será evaluada posteriormente con los datos del piloto.
3. __Confirmación de V1 sin variantes prematuras:__ V1 se ejecutará con las 40 preguntas actuales del banco. Las posibles variantes de dificultad (como Q29_5S o Q30_5S) quedan reservadas exclusivamente como hipótesis para calibración posterior.
4. __Esquema de metadatos por respuesta:__ question_id, base_question_id, variant_id, grade_level, difficulty_level, selected_option y response_time_ms.
5. __Modelo de persistencia longitudinal:__ student_id, grade_level, questionnaire_version, questionnaire_attempt, profile_38d y matching_version.
6. __Indicadores psicométricos para piloto:__ Dificultad clásica (p-value), discriminación biserial puntual (r_pbis), curvas características del ítem (ICC) y varianza de los 38 scores finales por cohorte.
