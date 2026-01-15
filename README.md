# 🛒 Gimmick Store App

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD600?style=for-the-badge&logo=pinia&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

Aplicación de e-commerce moderna construida con **Vue 3**, enfocada en el rendimiento y las buenas prácticas de desarrollo. Incluye navegación de productos, detalle, carrito de compras y una suite robusta de **unit testing**.

---

## 🚀 Instalación y ejecución

### Requisitos previos
- **Node.js** ≥ 18
- **Yarn** (Este proyecto utiliza Yarn como gestor de dependencias principal)

> [!WARNING]  
> Este proyecto utiliza **Yarn**. No utilices `npm install`, ya que generará un archivo `package-lock.json` innecesario.

### 1️⃣ Instalar dependencias
```bash
yarn install
```

### 2️⃣ Ejecutar en modo desarrollo
```bash
yarn dev
```

La aplicación estará disponible en: http://localhost:5173

### 3️⃣ Ejecutar pruebas unitarias

```bash
# Ejecución estándar
yarn test

# Con interfaz gráfica (UI)
yarn test:ui
```

### 4️⃣ Build para producción

```bash
yarn build
```

## 🧪 Testing

El proyecto prioriza la fiabilidad mediante Unit Testing con:

- Vitest: Runner rápido y nativo para Vite.
- @testing-library/vue: Para pruebas centradas en el comportamiento del usuario.

Áreas cubiertas:

- Store de Pinia: Lógica de carrito (añadir, eliminar, vaciar).
- Componentes: Renderizado y lógica de ProductCard.
- Páginas: Flujos de navegación en CartPage.

## 🛠️ Decisiones técnicas

### ⚙️ Vue 3 + Vite
Se utiliza **Vue 3 con Composition API** para una mejor organización del código, reutilización de lógica y mayor escalabilidad.  
**Vite** se eligió como bundler por su arranque instantáneo, hot reload rápido y su integración nativa con **Vitest** para testing.

---

### 🧠 Pinia (State Management)
Se implementa **Pinia** para la gestión del estado global del carrito de compras, aportando las siguientes ventajas:

- Reactividad total en el contador de productos.
- Persistencia en `localStorage`, evitando la pérdida del carrito al recargar la página.
- Lógica de negocio desacoplada de la interfaz de usuario.
- Facilidad para realizar **unit testing** de la lógica sin depender de componentes.

---

### 🎨 Tailwind CSS
Se utiliza **Tailwind CSS** para implementar un diseño **card-based UI** completamente responsivo.  
Permite un desarrollo ágil y consistente sin necesidad de escribir CSS personalizado fuera de los componentes, manteniendo claridad y escalabilidad en el diseño.

---

### 🧭 Vue Router
Se usa **Vue Router** para el manejo de rutas dinámicas entre:

- Home
- Product Detail
- Cart

La navegación se realiza de forma programática mediante `useRouter()`, lo que facilita el **testing** y desacopla la navegación de la estructura de la UI.

---

## 📁 Estructura del proyecto

```plaintext
src/
├── components/   # Componentes reutilizables
├── pages/        # Vistas principales de la aplicación
├── stores/       # Estado global (Pinia)
├── router/       # Configuración de rutas
├── test/         # Setup de pruebas
├── types/        # Definiciones de TypeScript
└── utils/        # Funciones auxiliares
```

