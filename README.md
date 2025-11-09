# Backend Express + Frontend Integrador React

## Sobre lo que construi
Desarrolle el backend completo de mi e-commerce Tecsisman con **Express + TypeScript + MongoDB** como contraparte directa del frontend en React. Ajuste la arquitectura del curso a mis flujos reales y dedique tiempo a pulir la UI para que la experiencia sea consistente entre ambos mundos.

## Como lo organize y por que
1. **Estructura modular en src/**
      - `controllers/` manejan la lógica HTTP.  
   - `routes/` definen endpoints con validaciones.  
   - `models/` contienen los esquemas de Mongoose.  
   - `middlewares/` (auth, admin, manejo de errores) concentran reglas transversales.  
   - `helpers/` agrupa utilidades (tokens, validaciones, mailer, seeds).  
   - `database/` aloja la conexión central a Mongo.  
   Esta división me permite escalar nuevas entidades sin mezclar responsabilidades.
2. **MongoDB Atlas + Compass**
   Mantengo la cadena en src/database/config.ts, uso Atlas Uso Atlas para el entorno deployado y Compass para revisar datos desde mi PC cuando cargo seeds o pruebo queries.

3. **Autenticacion y roles**
   - Registro/login con JWT usando JWT_SECRET.
   - Verificacion via correo y ADMIN_KEY para promover usuarios.
  - Middleware `isAdmin` protege las rutas críticas como creación/edición de productos.

4. **Gestion de productos**
   - CRUD completo en `productsController`.  
   - Soporte para imágenes locales (se guardan en `/uploads`) o URLs manuales.  
   - Cada producto almacena categoria, precio, stock y flags de recomendados.
   - GET /products y GET /products/:id alimentan al frontend para eliminar los datos estáticos.
5. **Mailer y notificaciones**
   Lleve el servicio a Resend para asegurar envios estables en produccion.

## Accesos y URLs
- **Frontend (Vercel):** https://proyecto-nucba-fullstack.vercel.app/
- **Backend desplegado:** https://proyecto-nucba-fullstack-1.onrender.com/
- **Backend local:** http://localhost:4000

### Cuentas de prueba
| Rol    | Email           | Contrasena        |
| ------ | ----------------| ----------------- |
| Admin  | admin@store.com | W3B5173_4DM1N_K3Y |
| Cliente|                  |                   |

pueden realizar cualquier registro como clientes y verificar
> Las contraseñas están hasheadas en la base. Estas cuentas quedaron listas para QA y demostraciones. Si agrego nuevas, debo validar el correo desde el enlace que envío automáticamente.
>para hashear la contraseña utilicé el siguiente comando: node -e "const bcrypt=require('bcryptjs'); const hash=bcrypt.hashSync('W3B5173_4DM1N_K3Y', bcrypt.genSaltSync()); console.log(hash)", ese hash lo copié y pegué en mongoDBcompass

## Variables de entorno necesarias
Utilicé resend (https://resend.com) para envíar los correos de autenticación y pedidos, asi que solo necesito la API key y un remitente valido (para pruebas puedo usé onboarding@resend.dev, correo por defecto si no tenía dominio). Guardé todo en Backend/.env:
`
PORT=4000
DB_URL=mongodb+srv://...
JWT_SECRET=MY_P4G3_53CR37_K3Y
JWT_EXPIRES_IN=4h
ADMIN_KEY=W3B5173_4DM1N_K3Y
CLAVESECRETA=...
KEYFORADMIN=...
RESEND_API_KEY=re_XXXXXXXXXXXX
MAILER_FROM="Tecsisman Store <onboarding@resend.dev>"
`
CLAVESECRETA` y `KEYFORADMIN` me permiten generar administradores rápidamente desde Postman durante las pruebas.
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
- POST /auth/register registra usuarios y envia el correo de verificacion.
- POST /auth/login maneja el login con JWT.
- POST /auth/admin crea administradores usando ADMIN_KEY.
- GET /products devuelve el listado con filtros basicos.
- GET /products/:id trae el detalle para Product Detail.
- POST /products crea productos (solo admin, admite uploads o URLs).
- PUT /products/:id actualiza datos e imagenes.
- DELETE /products/:id realiza eliminacion logica/fisica segun el flujo.

## Integracion con el frontend
El frontend (React + Redux) consume BASE_URL=http://localhost:4000/. Migre cada vista para que use la API real, arme un panel admin responsive con enfoque mobile-first y conecte el checkout con los endpoints de carrito y usuarios.
