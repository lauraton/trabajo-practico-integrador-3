# Trabajo Práctico Integrador N° III

API REST para gestionar usuarios, eventos y categorías. Hecha con Node.js, Express, MongoDB y Mongoose.

## Instalación

1. Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

2. Crear un archivo `.env` copiando `.env.example` y completar las variables:

```
MONGODB_URI = mongodb://localhost:27017/eventos
JWT_SECRET = una_clave_secreta
PORT = 3006
JWT_EXPIRES_IN = 1h
```

3. Iniciar el servidor:

```bash
npm run dev
```

## Endpoints

### Auth

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Ver mi perfil
- `PUT /api/auth/profile` - Actualizar mi perfil
- `POST /api/auth/logout` - Cerrar sesión

### Users (solo admin)

- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Events

- `POST /api/events`
- `GET /api/events`
- `GET /api/events/my`
- `GET /api/events/:id`
- `PUT /api/events/:id` (organizador o admin)
- `DELETE /api/events/:id` (organizador o admin)

### Categories

- `POST /api/categories` (solo admin)
- `GET /api/categories`
- `GET /api/categories/:id`
- `PUT /api/categories/:id` (solo admin)
- `DELETE /api/categories/:id` (solo admin)

## Tecnologías

Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, cookie-parser, express-validator.
