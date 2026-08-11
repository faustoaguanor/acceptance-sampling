# Muestreo de aceptación — ISO 2859-1 e ISO 3951-1

Aplicación web estática para calcular planes de muestreo de aceptación y
extraer una muestra reproducible desde un archivo CSV o XLSX. Está orientada
a controles de calidad de datos, expedientes y mediciones, con procesamiento
local en el navegador.

## Qué incluye

- Planes simples por atributos de NTE INEN-ISO 2859-1.
- Tablas 1, 2-A, 2-B y 2-C para nivel general II y niveles I/III.
- Inspección normal, estricta y reducida.
- AQL 1,0 %, 4,0 % y 10 %.
- Resolución explícita de flechas: muestra la letra original, la letra
  aplicada, `n`, `Ac` y `Re`.
- Extracción aleatoria simple o estratificada proporcional, con opción de
  asignar al menos un elemento por estrato.
- Planes simples por variables de forma `k`, con un límite de especificación
  único y método `s` o `σ`.
- Descarga de la muestra en CSV o XLSX. El XLSX incluye las hojas `Muestra`,
  `Registro` y, si corresponde, `Estratos`.

## Uso rápido

1. Abra `index.html` en un navegador moderno. También puede publicarlo con
   GitHub Pages.
2. Elija **Por atributos** o **Por variables** y defina lote, nivel, tipo de
   inspección y AQL.
3. Cargue un CSV/XLSX cuyo encabezado esté en la primera fila.
4. Seleccione muestreo simple o estratificado y, para este último, la columna
   que identifica el estrato.
5. Pulse **Generar muestra** y descargue el respaldo CSV/XLSX.

La dependencia de Excel está incluida en `libs/xlsx.full.min.js`, por lo que
la lectura y descarga de XLSX no depende de que una CDN esté disponible.

## Publicar desde Windows

Si descargó este proyecto como paquete, abra PowerShell en la carpeta raíz y
ejecute:

```powershell
gh auth status
.\publish.ps1
```

El script inicializa Git, configura el repositorio remoto y publica la rama
`main`. Está pensado para este repositorio vacío; si ya contiene cambios,
revise el estado antes de ejecutar el `push`.

## Comprobación de la flecha: N = 41, AQL = 4,0 %

Con inspección normal y nivel general II, el tamaño de lote `N = 41` produce
la letra de código `D`. En la Tabla 2-A, la flecha de la columna AQL 4,0 %
indica usar el primer plan por debajo: letra `E`, `n = 13`, `Ac = 1` y
`Re = 2`. La aplicación muestra ambos valores para que el salto no quede
oculto.

## Ejemplo 1: trámites catastrales

Archivos: [`examples/tramites-catastrales/`](examples/tramites-catastrales/).

`tramites_catastrales_iso2859.csv` contiene 41 registros sintéticos. Para
reproducir el caso anterior:

- seleccione **Por atributos**, inspección **normal**, nivel general **II** y
  AQL **4,0 %**;
- cargue el CSV y use muestreo simple para obtener `n = 13`;
- para probar estratificación, seleccione `ADMINISTRACION_ZONAL` como columna
  del estrato y use asignación proporcional;
- cuente los trámites no conformes de la muestra y registre ese valor en el
  control `d` para emitir el dictamen.

La carpeta contiene instrucciones y datos sin información personal.

## Ejemplo 2: puntos GNSS de Quito

Archivos: [`examples/gnss-quito/`](examples/gnss-quito/).

Se incluyen dos universos sintéticos separados porque el límite de aceptación
es distinto por ámbito:

- `puntos_gnss_quito_urbanos.csv`: tolerancia `0,33 m`.
- `puntos_gnss_quito_rurales.csv`: tolerancia `2,00 m`.

La columna `ERROR_POSICIONAL_M` representa el error horizontal ya calculado:

`sqrt((ESTE_GNSS - ESTE_REF)^2 + (NORTE_GNSS - NORTE_REF)^2)`

Para evaluar una muestra por variables, seleccione esa columna, límite
superior `U` y escriba `0,33` o `2,00` según el archivo. Las tablas B/C de
ISO 3951-1 no están transcritas en esta versión: `n` y `k` deben tomarse de
la tabla oficial aplicable y registrarse en la interfaz. Para un control por
atributos, use la columna `CUMPLE` y un plan de ISO 2859-1.

La tolerancia indicada es un supuesto de trabajo del ejemplo; la tolerancia
oficial debe provenir del procedimiento técnico y de la autoridad competente.

## Límites de uso

La aplicación no implementa planes dobles o múltiples, niveles especiales
S-1 a S-4, límites dobles de variables ni incertidumbre de medición. En
variables, el supuesto de normalidad o aproximación a la normalidad, la
independencia, la aleatoriedad y la trazabilidad de las mediciones deben ser
revisados por el responsable técnico.

El resultado es una ayuda de cálculo y no reemplaza la norma vigente, el plan
de calidad, el procedimiento institucional ni el juicio profesional.

## Privacidad y reproducibilidad

Los archivos se procesan en el navegador y no se envían a un servidor de esta
aplicación. No publique datos reales de ciudadanos, expedientes o coordenadas
en un repositorio público. Conserve el XLSX descargado: contiene el registro
del plan, la semilla usada y, en el caso estratificado, la asignación por
estrato.

## Licencia y atribuciones

El proyecto se distribuye bajo [MIT](LICENSE). Las dependencias y avisos de
terceros están documentados en [ATTRIBUTIONS.md](ATTRIBUTIONS.md).
