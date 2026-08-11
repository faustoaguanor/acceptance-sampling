# Puntos GNSS de Quito — ejemplo de tolerancia

Estos archivos contienen puntos ficticios para probar la evaluación de error
posicional. No son coordenadas de puntos oficiales de Quito.

- `puntos_gnss_quito_urbanos.csv`: límite superior de `0,33 m`.
- `puntos_gnss_quito_rurales.csv`: límite superior de `2,00 m`.

La columna `ERROR_POSICIONAL_M` ya contiene el error horizontal calculado a
partir de las coordenadas de referencia y GNSS. `TOLERANCIA_M` documenta el
límite usado y `CUMPLE` permite convertir el caso en una inspección por
atributos.

## Prueba por variables

1. Seleccione **Por variables**, límite superior `U` y cargue uno de los CSV.
2. Use `ERROR_POSICIONAL_M` como columna de medición.
3. Escriba el límite del archivo: `0,33` para urbano o `2,00` para rural.
4. Tome `n` y `k` de la tabla oficial de ISO 3951-1 para el nivel y AQL que
   correspondan; esta versión deja esos valores manuales para las tablas B/C.
5. Genere la muestra y descargue el XLSX como respaldo del análisis.

## Prueba por atributos

Seleccione **Por atributos**, use `CUMPLE` como referencia para revisar los
puntos no conformes y aplique el plan de ISO 2859-1 que corresponda al
procedimiento. Mantenga separados los universos urbano y rural porque sus
tolerancias no son intercambiables.

La tolerancia de cada archivo es un supuesto de demostración. En un proceso
real debe estar respaldada por la especificación técnica, el procedimiento y
la autoridad competente.

