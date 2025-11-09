# Backend Express + Frontend Integrador React

## Sobre lo qué construí
Desarrollé el backend completo de mi e‑commerce, tecsisman, usando **Express + TypeScript + MongoDB**. Lo enfoqué en ser la contraparte del frontend que ya tenía en React, realizando algunas mejoras en la UI, luego prioricé seguir la arquitectura enseñada en las clases de curso pero adaptando estos conocimientos a mi contenido y flujos.

## Cómo lo organicé y por qué
1. **Estructura modular en `src/`**  
   - `controllers/` manejan la lógica HTTP.  
   - `routes/` definen endpoints con validaciones.  
   - `models/` contienen los esquemas de Mongoose.  
   - `middlewares/` (auth, admin, manejo de errores) concentran reglas transversales.  
   - `helpers/` agrupa utilidades (tokens, validaciones, mailer, seeds).  
   - `database/` aloja la conexión central a Mongo.  
   Esta división me permite escalar nuevas entidades sin mezclar responsabilidades.
2. **MongoDB Atlas + Compass**  
   La conexión vive en `src/database/config.ts`. Uso Atlas para el entorno deployado y Compass para revisar datos desde mi PC cuando cargo seeds o pruebo queries.
3. **Autenticación y roles**  
   - Registro/login con JWT (firmados con `JWT_SECRET`).  
   - Verificación por correo y un `ADMIN_KEY` para promover usuarios.  
   - Middleware `isAdmin` protege las rutas críticas como creación/edición de productos.
4. **Gestión de productos**  
   - CRUD completo en `productsController`.  
   - Soporte para imágenes locales (se guardan en `/uploads`) o URLs manuales.  
   - Cada producto almacena categoría, precio, stock, banderas de recomendados, etc.  
   - `GET /products` y `GET /products/:id` alimentan al frontend para eliminar data estática.
5. **Mailer y notificaciones**  
   Agregué funcionalidades de mailer por si en algun futuro lo llego a necesitar.

## Accesos y URLs
- **Frontend (Vercel):** `https://proyecto-nucba-fullstack.vercel.app/`
- **Backend deployado:** ` `
- **Backend local:** `http://localhost:4000`

### Cuentas de prueba
| Rol    | Email              | Contraseña        |
| ------ | ------------------ | ----------------- |
| Admin  | admin@store.com    | W3B5173_4DM1N_K3Y |
| Cliente|                    |                   |

pueden realizar cualquier registro como clientes y verificar
> Las contraseñas están hasheadas en la base. Estas cuentas quedaron listas para QA y demostraciones. Si agrego nuevas, debo validar el correo desde el enlace que envío automáticamente.
>para hashear la contraseña utilicé el siguiente comando: node -e "const bcrypt=require('bcryptjs'); const hash=bcrypt.hashSync('W3B5173_4DM1N_K3Y', bcrypt.genSaltSync()); console.log(hash)", ese hash lo copié y pegué en mongoDBcompass

## Variables de entorno necesarias
**Con mailer hice pruebas desde un correo personal, por tal razón eso queda a libertad de quien quiera probar la app con otras cuentas**
Guardo todo en `backend/.env`:
```
PORT=4000
DB_URL=mongodb+srv://...
JWT_SECRET=MY_P4G3_53CR37_K3Y
JWT_EXPIRES_IN=4h
ADMIN_KEY=W3B5173_4DM1N_K3Y
CLAVESECRETA=...
KEYFORADMIN=...
MAILER_USER=...
MAILER_PASS=...
MAILER_FROM="tecsismanstore Store <tecsismancol@gmail.com>"
```
`CLAVESECRETA` y `KEYFORADMIN` me permiten generar administradores rápidamente desde Postman durante las pruebas.
## Scripts útiles
- `npm run dev` - ejecuta el servidor con ts-node-dev.
- `npm run build` - transpila a JavaScript en `dist/`.
- `npm start` - corre la build compilada.
## Cómo correrlo en local
1. `cd backend`
2. `npm install`
3. Si quieren cambiar algo deben modificar`.env` con las variables anteriores además de necesitar un cluster de mongo y las credenciales de mailer.
4. `npm run dev` para arrancar en `http://localhost:4000`.
5. El frontend se levanta con `BASE_URL=http://localhost:4000/`.
6. Para modo producción: `npm run build && npm start`.
## Endpoints principales
- `POST /auth/register` - registro de usuarios y envío de correo de verificación.
- `POST /auth/login` - login con JWT.
- `POST /auth/admin` - creación de administradores usando `ADMIN_KEY`.
- `GET /products` - listado completo con filtros básicos.
- `GET /products/:id` - detalle para la vista Product Detail.
- `POST /products` - creación (solo admin, soporta uploads + URLs).
- `PUT /products/:id` - actualización de datos e imágenes.
- `DELETE /products/:id` - eliminación lógica/física según la necesidad del flujo.
## Integración con el frontend
El frontend (React + Redux) consume `BASE_URL=http://localhost:4000/`. Migré cada vista para que consuma la API real, desarrollé un panel admin responsivo, centrandome en mobile first para manejar inventario y conecté el checkout con los endpoints del carrito y usuarios.

