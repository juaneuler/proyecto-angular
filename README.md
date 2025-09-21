# Proyecto Angular - Sistema de Gestión

Este proyecto es una aplicación completa desarrollada con **Angular 20**, que implementa un sistema integral para la gestión de alumnos, cursos, inscripciones y usuarios. Fue desarrollado como entrega final para el curso de Angular en Coderhouse.


## Funcionalidades principales

- **Sistema de autenticación**:
  - Login con diferentes roles (admin/usuario)
  - Protección de rutas según permisos
  - Información contextual en la interfaz según usuario logueado

- **Gestión completa** con operaciones CRUD para:
  - Alumnos
  - Cursos
  - Inscripciones
  - Usuarios

- **Experiencia de usuario mejorada**:
  - Toolbar dinámico que muestra título contextual según la ruta
  - Manejo de "sin datos" en todas las tablas
  - Footer con información del proyecto
  - Navegación personalizada según estado de autenticación y rol


## Características técnicas

- **Arquitectura por módulos** con Lazy Loading para optimizar rendimiento
- **Gestión de Estado Global con NgRx** con actions, reducer y selectors
- **Comunicación con API REST** (Mock API) para todas las entidades
- **Formularios Reactivos** con validaciones avanzadas
- **Tipado estricto** en toda la aplicación (sin uso de `any`)
- **Directivas personalizadas** para mejorar la presentación
- **Pipes para transformación** de datos (ej: nombres completos)
- **Servicios con estado** utilizando BehaviorSubject y Observables
- **Guards** para proteger rutas según rol de usuario
- **Notificaciones** con Angular Material Snackbar
- **Testing unitario** con Karma y Jasmine


## SEO y Social Sharing

- Meta tags para SEO
- Open Graph y Twitter Card con imagen representativa del proyecto
- Deploy en Netlify: [https://sistema-gestion-angular.netlify.app](https://sistema-gestion-angular.netlify.app)


## Tecnologías utilizadas

- Angular 20
- TypeScript (con tipado estricto)
- RxJS para programación reactiva
- NgRx para la gestión de estado global
- Angular Material (tablas, formularios, inputs, selects)
- SASS para estilos estructurados
- Mock API para simulación de backend
- Karma y Jasmine para testing
- Git y GitHub para control de versiones


## Cómo ejecutar el proyecto?

- git clone https://github.com/juaneuler/proyecto-angular.git
- cd proyecto-angular
- npm install
- ng serve


## Autor

Desarrollado por **Juan Euler**

- 📁 Repositorio: [proyecto-angular](https://github.com/juaneuler/proyecto-angular)
- 🌐 Portfolio: [portfolio-juan-euler.netlify.app](https://portfolio-juan-euler.netlify.app)
- 💼 LinkedIn: [linkedin.com/in/juan-euler](https://www.linkedin.com/in/juan-euler/)
- 💻 GitHub: [github.com/juaneuler](https://github.com/juaneuler)
- 📧 Contacto: [juaneuler@hotmail.com](mailto:juaneuler@hotmail.com)