# Skill Exchange Frontend

## Descripción

Este proyecto corresponde al desarrollo del frontend para la plataforma **Skill Exchange**, una aplicación web que permite visualizar habilidades, usuarios y metas mediante el consumo de una API REST protegida con autenticación JWT.

La aplicación fue desarrollada utilizando **Next.js**, **React**, **Axios** y **Tailwind CSS**, aplicando componentes reutilizables y consumo dinámico de datos mediante parámetros de consulta.

---

## Tecnologías utilizadas

* Next.js (App Router)
* React
* Axios
* Tailwind CSS
* JWT Authentication
* API REST

---

## Funcionalidades implementadas

### Autenticación

Se implementó autenticación mediante JWT utilizando:

* Login con correo y contraseña.
* Almacenamiento del `access_token` y `refresh_token`.
* Interceptor de Axios para enviar automáticamente el token.
* Validación de sesión mediante `/users/me/`.
* Redirección automática al login cuando el token es inválido.

---

### Dashboard

Se desarrolló una vista principal que:

* Obtiene la información del usuario autenticado.
* Muestra datos básicos del perfil.
* Protege el acceso mediante validación del token.

---

### Gestión de usuarios

Se desarrolló una página de usuarios con:

* Listado dinámico consumiendo `/users/`.
* Búsqueda por nombre o correo mediante query params.
* Tabla responsive.
* Avatar generado con iniciales del usuario.
* Formateo de fecha de ingreso.

Ejemplo:

```http
GET /users/?search=miguel
```

---

### Gestión de habilidades (Skills)

Se desarrolló una página para visualizar habilidades utilizando `/skills/`.

Funciones implementadas:

* Filtrado por categoría.
* Búsqueda por texto.
* Ordenamiento.
* Paginación.
* Tarjetas reutilizables.

Parámetros utilizados:

```http
?category=
?ordering=
?search=
?page=
```

Ejemplo:

```http
GET /skills/?category=technical&page=2
```

Componentes reutilizables:

* CategoryFilter
* Pagination
* SkillCard

---

## Estructura del proyecto

```text
src/

app/
├── login/
├── dashboard/
│   ├── page.jsx
│   ├── users/
│   └── skills/

components/
├── skills/
│   ├── CategoryFilter.jsx
│   ├── SkillCard.jsx
│
├── ui/
│   └── Pagination.jsx

lib/
└── api.js
```

---

## Configuración del proyecto

Instalar dependencias:

```bash
npm install
```

Crear archivo:

```text
.env.local
```

Agregar:

```env
NEXT_PUBLIC_API_BASE_URL=https://apiskills.danidev.co/api
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

---

## Decisiones de implementación

* Se centralizó el consumo del API usando Axios.
* Se reutilizaron componentes para evitar duplicación.
* Se utilizaron query params para filtros y búsqueda.
* Se implementó manejo de estados de carga y error.
* Se utilizó navegación con App Router de Next.js.

---

## Autor

Proyecto desarrollado como práctica académica para consumo de APIs y construcción de interfaces frontend.
