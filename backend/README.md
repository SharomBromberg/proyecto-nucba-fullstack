## Backend Nucba Store

### Variables de entorno

Configura un archivo `.env` en `backend/` con:

```
PORT=4000
DB_URL="mongodb+srv://..."
JWT_SECRET=MY_P4G3_53CR37_K3Y
JWT_EXPIRES_IN=4h
ADMIN_KEY=W3B5173_4DM1N_K3Y
MAILER_USER=tu_correo@gmail.com
MAILER_PASS=tu_contraseña_de_app
MAILER_FROM="Nucba Store <tu_correo@gmail.com>"
```

### Scripts

```
npm run dev    # Arranca con ts-node-dev
npm run build  # Genera dist
npm start      # Corre la versión compilada
```

### Endpoints principales

- `POST /auth/register` – Crea usuarios, envía código de verificación.
- `POST /auth/login` – Devuelve `{ usuario, token }`.
- `GET /auth/renew` – Renueva token con header `x-token`.
- `GET /products` – Lista productos (acepta `?category=` y `?recommended=`).
- `GET /products/:id` – Devuelve un producto por id.
- `GET /orders` – Lista órdenes del usuario (header `x-token`).
- `POST /orders` – Crea una orden con el payload que envía el checkout del front.

### Endpoints para administradores

Todos requieren:
1. Hacer login con un usuario creado usando el header `admin-key: W3B5173_4DM1N_K3Y` en el registro.
2. Enviar el token en `x-token`.

- `POST /products` – Crea un producto. Acepta `multipart/form-data` (campo `image`) o un string `img` con la URL. Ejemplo:
  ```json
  {
    "title": "Nintendo Switch",
    "description": "Consola híbrida",
    "img": "/assets/product-pictures/switch.png",
    "price": 300,
    "category": "Consolas",
    "stock": 20,
    "recommended": true
  }
  ```
- `PUT /products/:id` – Actualiza cualquier campo.
- `DELETE /products/:id` – Elimina el producto.

> Los archivos se almacenan en `backend/uploads` y se exponen públicamente en `https://tu-api/uploads/archivo.jpg`.

### Integración con el frontend

1. En `frontend/src/utils/constants.js` define `export const BASE_URL = 'http://localhost:4000/';` durante el desarrollo, y cambia al dominio del deploy cuando publiques (Render/Railway).
2. El flujo actual del front ya consume `/auth`, `/orders` y `/products`, así que no necesitas más cambios para probar compras.
3. Para paneles de admin, reutiliza `axios` añadiendo helpers que llamen a los nuevos endpoints protegidos. Siempre envía `x-token` con el token del usuario admin.

Con esto el backend queda alineado con el front actual y permite administrar productos sin modificar la UI existente.*** End Patch
