
````markdown
# 📘 Challenge Final Akademi – Frontend

Este proyecto es el **frontend** del challenge final de Akademi, desarrollado con **React**. Consume un backend que gestiona cursos, usuarios, inscripciones y calificaciones.

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) (versión recomendada: `>=16.x`)
- [npm](https://www.npmjs.com/)

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone https://github.com/AylenRominaPattuzzi/challengefinal-akademi-aylenpattuzzi-frontend.git
cd challengefinal-akademi-aylenpattuzzi-frontend
npm install
npm start
````

---

## 📁 Estructura del proyecto

```plaintext
src/
├── api/
│   └── axiosInstance.js          # Configuración global de Axios
├── components/
│   ├── common/                   # Componentes reutilizables (botones, inputs, etc.)
│   ├── Course/                   # Componentes relacionados a cursos
│   ├── Grades/                   # Componentes para calificaciones
│   ├── User/                     # Componentes para usuarios y autenticación
│   ├── App.js                    # Componente raíz con las rutas
│   └── Dashboard.js              # Vista principal del dashboard
├── redux/
│   ├── actions/                  # Acciones de Redux
│   ├── reducers/                 # Reducers
│   ├── types/                    # Tipos de acciones
│   └── store.js                  # Configuración del store
├── utils/                        # Funciones auxiliares y helpers
└── index.js                      # Punto de entrada de la aplicación
```

---

## 📦 Dependencias principales

```json
{
  "axios": "^1.9.0",
  "jwt-decode": "^4.0.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hook-form": "^7.56.4",
  "react-redux": "^9.2.0",
  "react-router-dom": "^7.6.1",
  "react-toastify": "^11.0.5",
  "redux": "^5.0.1",
  "redux-thunk": "^3.1.0"
}
