# 🌿 BlogAppWebCrisol - Ecosistema Digital

¡Bienvenido a **BlogAppWebCrisol**! Una plataforma de contenidos tipo blog robusta, elegante y moderna, construida con el stack MERN (MongoDB, Express, React, Node.js) y diseñada bajo principios de arquitectura limpia y experiencia de usuario premium.

---

## 🚀 Vista General

Este repositorio contiene tanto el **Frontend** (Vite + React) como el **Backend** (Node.js + Express), integrados para ofrecer un manejo de contenidos dinámico, autenticación segura y una interfaz editorial de alta gama.

- **Frontend**: [Explorar cliente](./client-crisol)
- **Backend**: [Explorar servidor](./server-crisol)

---

## ✨ Características Principales

### 💻 Frontend (Elegancia Editorial)
- **Diseño Neo-Editorial**: Tipografía sofisticada, espacios generosos y una estética de "revista moderna".
- **Modo Oscuro/Claro**: Gestión de temas integrada mediante Context API y CSS Variables.
- **Interacciones Fluidas**: Animaciones orquestadas con **Framer Motion** para una experiencia viva.
- **Contenido Dinámico**: Gestión de blogs, noticias y comentarios con **TanStack Query** para estados de carga perfectos.
- **Seguridad**: Rutas protegidas por roles (Admin/User) y persistencia de sesión con **Zustand**.

### 🛠️ Backend (Potencia y Seguridad)
- **Arquitectura DDD**: Estructura de carpetas organizada por Repositorios, Controladores y Capas de Servicio.
- **Seguridad JWT**: Implementación robusta de JSON Web Tokens con manejo de roles y estados `verified`.
- **IA Integrada**: Generación de contenidos asistida por IA para creadores.
- **Manejo de Imágenes**: Integración con **ImageKit** para optimización de assets.
- **Documentación**: API totalmente documentada con **Swagger**.

---

## 🧪 Estrategia de Testing (Calidad Asegurada)

El proyecto cuenta con una cobertura de pruebas exhaustiva que garantiza la estabilidad de cada nueva funcionalidad.

- **Frontend Tests (Vitest + RTL)**: 
  - Pruebas unitarias de componentes (Banner, Cards).
  - Pruebas de hooks personalizados (`useInputs`, `useIsLoginContext`).
  - Pruebas de seguridad (`ProtectedRoute`).
  - Pruebas de repositorios y queries de datos.
- **Backend Tests (Jest + Supertest)**:
  - Pruebas de integración para endpoints de usuario y blogs.
  - Base de datos en memoria para pruebas aisladas.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand, TanStack Query. |
| **Backend** | Node.js, Express, MongoDB (Mongoose), JWT, Cloudinary/ImageKit, Gemini AI. |
| **Mantenimiento** | ESLint, Vitest, Jest, Supertest, GitHub Actions (CI/CD). |

---

## 🏁 Cómo Empezar

### Requisitos
- Node.js (v18+)
- MongoDB (Local o Atlas)

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Johnmontoya/BlogAppWebCrisol.git
   cd BlogAppWebCrisol
   ```

2. **Configurar el Backend**:
   ```bash
   cd server-crisol
   npm install
   # Crea un archivo .env basado en la configuración necesaria
   npm run server
   ```

3. **Configurar el Frontend**:
   ```bash
   cd ../client-crisol
   npm install
   npm run dev
   ```

4. **Correr Tests**:
   ```bash
   # Frontend
   cd client-crisol && npm test
   # Backend
   cd server-crisol && npm test
   ```

---

## 🤝 Contacto e Infraestructura

Este proyecto fue diseñado siguiendo las mejores prácticas de la industria, asegurando escalabilidad, mantenibilidad y un diseño de impacto. ✨

---
> [!TIP]
> **Dashboard de Pruebas**: Puedes ver los resultados visuales de los tests de frontend ejecutando `npm run test:ui` en la carpeta `client-crisol`.
