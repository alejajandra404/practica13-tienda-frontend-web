# Práctica 13 – La tienda: composición, eventos y estado

## Ejercicio 1: el marco de la página

### ¿Por qué el Layout no necesita saber que es una tienda?

Porque el Layout solo acomoda tres lugares: uno arriba, uno en medio y uno abajo. Lo que va en cada lugar se lo manda el que lo usa (en mi caso `App`): el encabezado, el pie y lo que va entre sus etiquetas (`children`). El Layout no lee ni usa nada de productos o carrito, nada más los pone en su lugar. 

## Ejercicio 2: el catálogo

### ¿Qué pasa si escribes onClick={onAgregar(producto)} sin la flecha?

Lo probé quitándole la flecha al botón. Me salió esto

- En el editor, la línea se subrayó en rojo con este error: `Type 'void' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'`. Más o menos significa que `onClick` quería una función y yo le di otra cosa.
- La página sí siguió cargando, pero al recargar, sin tocar nada, la consola ya traía los nombres de los productos escritos. Salieron los 12, cada uno dos veces. Creo que se repiten porque React en modo desarrollo pinta dos veces.
- Cuando le daba clic a "Agregar al carrito" no pasaba nada, no se imprimía nada nuevo.

## Ejercicio 3: filtrar y agregar al carrito

### ¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?

Lo probé cambiando `setCarrito([...carrito, producto])` por `carrito.push(producto)`. Lo que vi:

- Le daba clic a "Agregar al carrito" y no pasaba nada: el contador y el total se quedaban igual.
- No salió ningún error, ni en la consola ni en el editor.
- Cuando volví a poner `setCarrito([...carrito, producto])`, de pronto aparecieron en el carrito todos los productos a los que les di clic mientras tenía el `push`.

Lo que entiendo esq el `push` sí agrega el producto al arreglo, por eso después aparecieron, pero no avisa a React de que algo cambió. React solo vuelve a pintar la página cuando se usa `setCarrito`. Creo que los productos aparecieron al volver a poner la línea buena porque en ese momento la página se pintó otra vez y ya vio el arreglo con todo lo que le había metido.
