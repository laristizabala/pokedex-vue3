# 📦 Pokedex - Prueba Técnica Frontend

Este proyecto fue desarrollado como parte de la prueba técnica de Frontend Developer, utilizando **Vue 3**. Se ha puesto un énfasis significativo en la aplicación de **buenas prácticas de arquitectura, escalabilidad y mantenibilidad** del código.

## 🔗 Url

```bash
https://pokedex-lal.netlify.app/
```

## 🚀 Instalación y Ejecución

Para descargar y ejecutar el proyecto, sigue los siguientes pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    cd nombre-del-proyecto
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Correr el proyecto en modo desarrollo:**
    ```bash
    npm run dev
    ```
4.  **Compilación para producción:**
    ```bash
    npm run build
    ```

## 🛠 Tecnologías y Herramientas Utilizadas

- **Vue 3 (Composition API):** Framework principal para la construcción de la interfaz de usuario.
- **Vite:** Entorno de desarrollo moderno y rápido.
- **Pinia:** Manejo de estado modular y reactivo para la aplicación, incluyendo la gestión de la lista de Pokémon favoritos.
- **Axios:** Cliente HTTP para el consumo eficiente de la PokeAPI.
- **Sass (SCSS):** Preprocesador CSS para la organización, reutilización de estilos y optimización del CSS.
- **`storeToRefs` (VueUse):** Para desestructurar propiedades reactivas de Pinia stores, manteniendo la reactividad en los componentes.
- **Interceptores de Axios:** Implementados para un manejo centralizado de peticiones y posibles errores en la comunicación con la API.
- **Funciones de Utilidad:**
  - **Filtros/Ayudantes personalizados:** Para formateo de textos (ej. capitalizar nombres de Pokémon).
  - **`navigator.clipboard.writeText()`:** Implementación directa de la API nativa para la funcionalidad de copiar al portapapeles.
- **Animaciones y Transiciones CSS:** Utilizadas para la pantalla de carga (Pokebola animada) y transiciones suaves en la UI, mejorando la experiencia de usuario.
- **Optimización de Imágenes:** Conversión de imágenes a formato **WebP** para optimizar los tiempos de carga y el uso eficiente de recursos.

## 🧩 Arquitectura del Proyecto

El proyecto ha sido estructurado siguiendo principios de **separación de responsabilidades** y modularidad para facilitar su crecimiento y mantenimiento:

```bash
src/
│
├── assets/           # Recursos estáticos (imágenes optimizadas)
 ├── scss/            # Variables y estilos globales en SASS
├── components/       # Componentes reutilizables (Footer, Searcher, Modal, etc.)
├── services/         # Capa de comunicación con APIs (axios centralizado)
├── stores/           # Módulos de estado (Pinia por feature)
├── utils/            # Funciones auxiliares (capitalizar texto)
├── views/            # Vistas principales de la aplicación
└── router/           # Configuración de rutas (en caso de escalar múltiples vistas)
```

## 🧱 Decisiones de arquitectura y principios aplicados

- Los componentes fueron diseñados con responsabilidades muy claras y únicas.
- Se evitó la lógica compleja dentro de los templates para favorecer la legibilidad.
- Las vistas están compuestas por pequeños componentes reutilizables que cumplen una única función. Cada componente, servicio y store cumple una única función
- La lógica de consumo de API fue centralizada en la capa de services, evitando repetir solicitudes HTTP en múltiples lugares.
- Se reutilizó lógica de estado dentro de los stores mediante actions, manteniendo el código limpio y sin duplicación.
- Esta arquitectura permite agregar nuevas vistas, servicios o features sin afectar el código existente.
- Se persiste los datos mediante el uso de states y su manejo con storeToRefs
- La lógica de negocio, la gestión de estado, la comunicación HTTP y la interfaz de usuario están claramente separadas en diferentes capas.
- Al utilizar un store modularizado, una capa de servicios para la API, y la organización por componentes, el proyecto está preparado para crecer de forma ordenada.

## 📝 Propuestas

- Se sigue lo indicado en los mockups, respetando diseños, si fuera un caso real, me gustaría hablar con el equipo y ver la posibilidad de revisar el flujo entre vistas, revisar el redireccionamiento, que otros atributos se pueden agregar por personaje y si podemos agregar otros recursos visuales que nos ayuden a enriquecer mucho más el proyecto.
- Implementar manejo centralizado de errores y estados vacíos.
