# AlgoBlocks (DGS)

> Construye las bases de tu futuro como programador bloque a bloque. Aprende la lógica de programación con las bases necesarias de todo lenguaje.

AlgoBlocks es una aplicación web interactiva diseñada para la facultad, cuyo objetivo es ayudar a los alumnos a asimilar y desarrollar la lógica de programación de una forma visual y práctica mediante la composición de diagramas de bloques.

---

## 🏗️ Estructura del Monorepo

El proyecto está organizado en un monorepo para facilitar la gestión simultánea del cliente y del servidor:

```
algoblocks/
├── frontend/             # Aplicación de cliente SPA (React + TypeScript + Vite)
├── backend/              # Servidor API REST (Node.js + Express + TypeScript + Prisma)
├── database/             # Archivos, scripts o esquemas de base de datos
├── docs/                 # Documentación técnica, diagramas y minutas del proyecto
├── docker/               # Configuraciones adicionales de Docker
├── .github/              # Workflows de GitHub Actions para CI/CD
├── docker-compose.yml    # Orquestación de base de datos local (PostgreSQL + pgAdmin)
└── README.md             # Guía principal del proyecto (este archivo)
```

---

## 🎨 Los 6 Elementos Lógicos (Bloques)

La aplicación web permite componer algoritmos usando **6 bloques principales**, diseñados para emular las estructuras fundamentales de la programación:

1. **Input (Entrada):** Permite al usuario ingresar un dato en una variable.
   * *Ejemplo:* `|input: x|` (asigna el valor ingresado por teclado a `x`).
2. **Output (Salida):** Muestra por pantalla el valor de una variable o una cadena literal.
   * *Ejemplo:* `|output: x|` o `|output: "hola"|`.
3. **Asignación:** Inicializa o cambia el valor de una variable con datos duros u operaciones.
   * *Ejemplo:* `|asigna: x = 5|` o `|asigna: c = c + 1|`.
4. **Alternativa (Condicional If-Else):** Bloque compuesto de dos niveles. Arriba se define la condición (por ejemplo `|x > 4|`) y debajo contiene dos secciones: `[Camino Verdadero]` y `[Camino Falso]`.
5. **Ciclo Mientras (While Loop):** Estructura cíclica que ejecuta los bloques de su interior en loop mientras se cumpla la condición.
6. **Ciclo Para (For Loop):** Estructura cíclica que ejecuta los bloques de su interior desde un límite inferior (a) hasta un límite superior (b).

---

## 🛠️ Stack Tecnológico Propuesto

1. **Frontend:**
   * **React** (con **TypeScript** y **Vite**): Framework ágil, tipado y veloz.
   * **CSS Custom Properties (Vanilla CSS)**: Estilos personalizables sin dependencias externas complejas.
   * **React Flow** o **custom Canvas implementation**: Para construir el lienzo de arrastrar y soltar (drag-and-drop) de los bloques de manera responsiva y fluida.
2. **Backend:**
   * **Node.js** + **Express** (con **TypeScript**): Servidor backend robusto y escalable.
   * **Prisma ORM**: Mapeo relacional de objetos de excelente tipado.
3. **Base de Datos & Contenedores:**
   * **PostgreSQL**: Base de datos relacional robusta.
   * **Docker**: Para contenerizar la base de datos y herramientas de administración (`pgAdmin`).

---

## 🚀 Guía de Inicio Rápido (Local)

### Requisitos previos
* Node.js (v18+)
* Docker & Docker Compose

### 1. Iniciar Base de Datos local
Levanta PostgreSQL y pgAdmin usando Docker Compose:
```bash
docker compose up -d
```
* **PostgreSQL:** `localhost:5432`
* **pgAdmin:** `http://localhost:5050` (Usuario: `admin@algoblocks.com` | Contraseña: `admin`)

### 2. Configurar y Arrancar el Backend
1. Ve al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Genera el cliente Prisma y ejecuta las migraciones:
   ```bash
   npx prisma generate
   ```
4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *El servidor se ejecutará en: `http://localhost:3001`*

### 3. Configurar y Arrancar el Frontend
1. Ve al directorio del frontend:
   ```bash
   cd ../frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en: `http://localhost:5173`*
