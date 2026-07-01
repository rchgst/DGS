# DGS

> Construí tu lógica de programación bloque a bloque, de forma visual y práctica.

DGS es una herramienta web didáctica pensada para la facultad. Los alumnos construyen algoritmos conectando bloques en un lienzo visual y, en tiempo real, ven el código C equivalente generado automáticamente. También pueden ejecutar el algoritmo directamente en el navegador, sin instalar nada.

---

## Cómo funciona
La interfaz tiene dos paneles: el lienzo a la izquierda y el código C a la derecha. Mientras el alumno conecta bloques, el código se actualiza solo. Al hacer clic en "Ejecutar", el algoritmo corre en una consola simulada dentro de la misma página.

El sistema traduce el diagrama en dos pasos:
1. **El parser** convierte los nodos y conexiones del lienzo en un AST (árbol de sintaxis abstracta) en TypeScript.
2. **Los traductores** recorren ese árbol y generan código: uno produce C (para mostrar), el otro produce JavaScript (para ejecutar en el navegador de forma segura).

---

## Los 6 bloques
Con estos bloques se puede representar cualquier algoritmo básico:

| Bloque | Qué hace |
| :--- | :--- |
| **Input** | El usuario ingresa un valor en una variable |
| **Output** | Muestra un valor o texto en pantalla |
| **Asignación** | Crea o modifica una variable (x = 5, c = c + 1) |
| **If-Else** | Bifurca el flujo según una condición |
| **While** | Repite instrucciones mientras se cumpla una condición |
| **For** | Itera desde un valor a hasta un valor b |

---

## Stack
* **React + TypeScript + Vite** — base del proyecto
* **@xyflow/react** — lienzo drag-and-drop con nodos y conexiones
* **@monaco-editor/react** — panel de código con resaltado de sintaxis C
* **js-interpreter** — intérprete JS sandboxed para ejecutar en el navegador
* **lz-string** — compresión de diagramas en la URL para compartir sin registro

---

## Estructura del proyecto
```
src/
├── components/
│   ├── Canvas.tsx           # Lienzo interactivo (React Flow)
│   ├── Toolbox.tsx          # Barra lateral con los 6 bloques
│   ├── CodeViewer.tsx       # Panel Monaco Editor (muestra el C)
│   └── Console.tsx          # Terminal simulada
│
├── core/
│   ├── types.ts             # Interfaces del AST
│   ├── parser.ts            # React Flow → AST
│   │
│   ├── interpreter/
│   │   └── runner.ts        # Orquesta js-interpreter
│   │
│   └── translators/
│       ├── ILanguage.ts     # Interfaz base (patrón Strategy)
│       ├── CLanguage.ts     # AST → C
│       └── JSLanguage.ts    # AST → JS con tracking de bloque activo
│
├── hooks/
│   ├── useParser.ts         # Dispara el parser cuando cambia el canvas
│   └── useRunner.ts         # Controla el estado de ejecución
│
├── utils/
│   └── share.ts             # Compresión/descompresión con lz-string
│
├── App.tsx                  # Layout principal y estado global
└── main.tsx                 # Entrada de Vite
```

---

## Cómo correrlo localmente
### Requisitos: Node.js v18+

```bash
git clone git@github.com:rchgst/DGS.git
cd DGS
pnpm install
pnpm dev
```
La app queda disponible en `http://localhost:5173`.

---

## Compartir diagramas
No hay cuentas ni guardado en servidor. Cuando el alumno hace clic en "Compartir", el diagrama se comprime con `lz-string` y se codifica directo en la URL. Quien recibe el link ve el diagrama cargado automáticamente.
