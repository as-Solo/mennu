# Mennu: Gestiona Platos y Menús de Forma Dinámica

![App Screenshot](./public/PortadaMennu.jpg)

**Mennu** es una aplicación web diseñada para facilitar la gestión de menús y platos en un restaurante. Los usuarios pueden añadir, modificar, filtrar y visualizar menús y platos de manera eficiente. Además, la aplicación ofrece un sistema dinámico para organizar estos elementos según diversas categorías, proporcionando una experiencia simple y amigable para los administradores de restaurantes.

[Mennu](https://mennu-ih.netlify.app/)

- [Investiga el codigo](https://github.com/as-Solo/mennu)

- [Servidor js](https://github.com/as-Solo/mennu-api)

### Sobre el Desarrollo

Este proyecto fue desarrollado como una herramienta interna para la gestión de menús de restaurantes, enfocándose en la simplicidad y eficiencia a través del uso de tecnologías modernas. **Mennu** permite a los administradores gestionar la carta de su restaurante en tiempo real, organizando platos según atributos clave como nombre, precio, categoría y más.

### Collaborators

[Patricia Nieto](https://github.com/PatriNieto)

[Alejandro S. del Solo](https://github.com/as-Solo)

## 🚀 Características Principales

- **Sistema Dinámico de Platos y Menús**: Añade, edita o elimina platos y menús, y organiza todo de forma rápida y eficiente.
- **Filtrado Avanzado**: Filtra platos por atributos como nombre, descripción, categoría, precio y más.
- **Ordenación de Datos**: Ordena los resultados por criterios como nombre, precio o calificación de forma ascendente o descendente.
- **Interfaz Intuitiva**: Diseñada para ser fácil de usar, incluso para usuarios no técnicos.
- **Creación de Menús**: Combina diferentes platos en un menú único, ideal para la planificación diaria de un restaurante.

## 🛠️ Tecnologías Utilizadas

- **Axios**: Se usa para manejar las peticiones HTTP desde el frontend al backend.
- **Bootstrap**: Libreria de estilos.
- **CSS3**: Se emplea para darle estilo y asegurar una experiencia visual agradable.
- **HTML**: Para una sólida estructuración y etiquetado semántico.
- **JavaScript**: Lenguaje para todo el scripting de la página.
- **Node.js**: Para gestionar la lógica del backend y la comunicación con el servidor.
- **React**: Se utiliza para construir una interfaz de usuario reactiva y rápida.

## 📂 Estructura del Proyecto

- `/client/`: Todo el código del frontend desarrollado en React, que incluye los componentes para la visualización y gestión de platos y menús.
- `/server/`: Código backend desarrollado con Express que gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de los menús y platos.
- `/routes/`: Define las rutas para las operaciones API del backend.

    ## Client Routes

    **NOTA -** Aquí una tabla dee referencia a las distintas rutas posibles

    ## React Router Routes (React App)
    | Path                      | Page            | Components | Behavior |
    | ------------------------- | ----------------| ----------------  |  ------------------------------------------------------------  |
    | `/` | Home | DishCard | Página de inicio|
    | `/dishes` | Dishes | DishCardItem, DishFilters, DishSkeletonCard | Muestra la carta del restaurante con todos los platos que hay en ella |
    | `/menus` | Menus | MenuFilter | Muestra todos los menus creados|
    | `/menus/menu-detail/:menuId` | MenuDetail | | Muestra el menu seleccionado y todo su contenido |
    | `/dishes/dish-detail/:dishId` | DishDetail |                   | Muestra toda la informacion del plato seleccionado y permite la modificacion del mismo |
    | `/add-menu` | AddMenuForm   |  | Permite crear un menú, seleccionando de entre la carta los platos disponibles|
    | `/add-dish` | AddDishForm   |  | Permite crear de cero un plato nuevo |

    ## Otros Componentes
    - MyNavBar
    - DishCard
    - MenuCard
  
    ## Links del proyecto
    [Repositorio del cliente](https://github.com/as-Solo/mennu)

    [Repositorio del servidor](https://github.com/as-Solo/mennu-api)

    [Aplicacion deployeada](https://mennu-ih.netlify.app/)


## 🔥 Funcionalidades Clave

- **Gestión Completa de Platos**: Permite a los administradores agregar, modificar y eliminar platos con información relevante como precio, descripción, categoría, opciones veganas o sin gluten.
- **Creación de Menús Personalizados**: Crea menús combinando diferentes platos, ideal para administrar opciones diarias o especiales.
- **Búsqueda Rápida**: Busca platos o menús por texto, con filtros avanzados por atributos clave como precio, categoría o rating.
- **Ordenación de Resultados**: Los usuarios pueden ordenar los platos o menús por nombre, precio o valoración, de forma ascendente o descendente.

## 🎯 Retos Técnicos y Soluciones

Durante el desarrollo del proyecto, enfrentamos varios desafíos:

- **Manejo de Filtros Dinámicos**: Se implementó un sistema que permite filtrar platos de manera eficiente sin recargar la página.
- **Ordenación de Datos en el Frontend**: Se implementó un sistema que permite ordenar los resultados en tiempo real según diferentes atributos.
- **Optimización de la UX**: Se trabajó en la interfaz para que fuera intuitiva, con formularios accesibles y una organización clara de los elementos.

## 🎮 Cómo Usar la Aplicación

1. **Visualizar platos y menús**: Explora la lista de platos y menús, utilizando los filtros y opciones de ordenación.
2. **Añadir un plato**: Completa el formulario con información relevante (nombre, precio, categoría, etc.) y guarda el nuevo plato.
3. **Editar o eliminar platos**: Haz clic en cualquier plato para modificar su información o eliminarlo.
4. **Eliminar menús**: Haz clic en cualquier menú para poder eliminarlo.
5. **Filtrar y ordenar**: Utiliza el panel de filtros para refinar tu búsqueda o cambia la ordenación según tus necesidades.

## 👨‍💻 Próximas Mejoras

- **Integración de autenticación**: Añadir un sistema de autenticación para que solo los administradores puedan gestionar los platos y menús.
- **Optimización para distintos dispositivos**: Mejorar la experiencia de usuario en cualquier tipo de pantallas incluyendo efectos y transiciones mejorados.
- **Reportes de ventas**: Implementar una funcionalidad para generar reportes basados en los platos más pedidos o populares.

## 📈 Habilidades Adquiridas

Desarrollar **Mennu** ha permitido mejorar las siguientes habilidades:

- **Gestión del Estado en React**: Manejo eficiente del estado para mantener actualizados los platos y menús en tiempo real.
- **Optimización de las peticiones al servidor**: Mejoras en la estructura y rendimiento del backend para soportar consultas complejas.
- **Diseño de Interfaces con CSS**: Creación de una interfaz intuitiva y visualmente atractiva para los usuarios.

## ❤️ Agradecimientos

Agradecemos muchisimo el apoyo y soporte, tanto técnico como humano, durante el desarrollo de este proyecto a:

- [Jorge Berrizbeitia](https://github.com/jorgeberrizbeitia)
## 🤝 Contribuciones

Si deseas colaborar en este proyecto, ¡siéntete libre de enviar un *pull request* o abrir una *issue*! Estamos abiertos a cualquier sugerencia o mejora.

