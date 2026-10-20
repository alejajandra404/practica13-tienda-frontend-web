# tienda-backend

La API de la tienda de las Prácticas 12B y 13 (Unidad III). **No se programa en clase**: es el
backend que usa el frontend de React, hecho igual que el gimnasio de la Unidad II
(NestJS 11 + Prisma 7 + MySQL), con un seeder que carga los 12 productos.

Es un **repositorio aparte**: el frontend (`tienda`) y el backend (`tienda-backend`) viven y se
corren por separado, como en un proyecto real.

---

## Requisitos

- Node 22 (el del curso) y MySQL 8 corriendo, el mismo de la Unidad II.
- La contraseña de `root` de MySQL a la mano.

---

## Cómo correrlo

```bash
git clone <url-del-repositorio> tienda-backend
cd tienda-backend
npm install

cp .env.ejemplo .env                    # en Windows: copy .env.ejemplo .env
#   abre .env y cambia TU_PASSWORD por tu contraseña de root de MySQL

npx prisma migrate dev --name inicial   # crea la base "tienda" y sus tablas
npx prisma db seed                      # carga los 12 productos
npm run start:dev                       # levanta la API en el puerto 3000
```

**Prueba:** abre `http://localhost:3000/productos` en el navegador. Debe salir un JSON con
`data` (los 12 productos) y `meta`.

| Para… | Corre |
|---|---|
| Volver a dejar el inventario como al principio | `npx prisma db seed` |
| Ver la base en el navegador | `npx prisma studio` |
| Levantarla otro día | sólo `npm run start:dev` |

---

## Endpoints

| Método | Ruta | Responde |
|---|---|---|
| GET | `/productos` | `{ data: Producto[], meta }`. Acepta `?categoria=ropa` |
| GET | `/productos/:id` | `{ data: Producto, meta }`, o 404 |
| POST | `/pedidos` | Cuerpo `{ correo, telefono, productos: ["P-001", ...] }`. 201 con `{ data: { folio, total } }`; 400 si el correo, el teléfono o el carrito no son válidos; 409 si no alcanza la existencia |

El pago es **simulado**: no se cobra nada. Se guarda el pedido, se descuenta el inventario y se
regresa un folio (`PED-0001`). Hay peticiones de ejemplo en `peticiones.http`.

---

## Posibles errores

| Síntoma | Causa | Qué hacer |
|---|---|---|
| `Falta DATABASE_URL. Revisa el archivo .env` | No se creó `.env` | `cp .env.ejemplo .env` |
| Error de acceso o de conexión a MySQL al migrar o al arrancar | MySQL apagado, o contraseña mal en `.env` | Revisar `DATABASE_URL` |
| `EADDRINUSE: address already in use :::3000` | Ya hay otra API en el puerto 3000 (¿el gimnasio?) | Detener la otra, o poner `PORT=3001` en `.env` y cambiar el `baseURL` del frontend |
| El frontend dice `blocked by CORS policy` | Vite no está en el puerto 5173 | Agregar el puerto en `enableCors` de `src/main.ts` |
| Las existencias ya no son las del principio | Pedidos de prueba | `npx prisma db seed` |

---

## Lo que ya conocen de la Unidad II

- `PrismaService` con el driver adapter de MySQL (`src/prisma/`).
- El sobre `{ data, meta }` de la Práctica 9B (`src/comun/sobre.interceptor.ts`).
- `ValidationPipe` con el DTO de `class-validator` (`src/pedidos/dto/`).
- CORS abierto a `http://localhost:5173`, el puerto de Vite.
- La transacción de `pedidos.service.ts`: el pedido y los descuentos de inventario, todo o nada.

## Archivos

```
tienda-backend/
├── prisma/schema.prisma        Producto, Pedido y RenglonPedido
├── prisma/seed.ts              los 12 productos
├── src/main.ts                 CORS, ValidationPipe y el sobre
├── src/productos/              GET /productos y /productos/:id
├── src/pedidos/                POST /pedidos (DTO, 404, 409, transacción, folio)
├── src/prisma/                 PrismaService y PrismaModule
├── src/comun/sobre.interceptor.ts
├── peticiones.http
└── .env.ejemplo
```
