# Proyecto Angular - Gestión de Alumnos, Cursos e Inscripciones

Este proyecto es una aplicación desarrollada con **Angular 20**, orientada a la gestión de estudiantes, cursos e inscripciones. Fue realizado como parte del curso de Angular en Coderhouse.

## 🧠 Funcionalidades

- CRUD de **alumnos**.
- CRUD de **cursos**.
- Gestión de **inscripciones** (alta, baja y edición).
- Rutas individuales para cada formulario (alta, edición y baja).
- Estilos personalizados con **SASS**.
- Uso de **Reactive Forms** con validaciones.
- Componentes reutilizables y estructurados.
- Consumo de datos desde servicios en memoria (`BehaviorSubject`).
- Notificaciones con **Angular Material Snackbar**.
- Navegación con Angular Router.
- Simulación de Backend con `db.json` para alumnos y cursos
- Uso de rutas tipadas con `enum` para mayor seguridad
- Estructura de features: cada entidad (alumnos, cursos, inscripciones) organizada en su propia carpeta
- **Lazy Loading en rutas principales** para optimizar el rendimiento de la carga inicial.
- Implementación de un `Guard` para proteger las rutas principales por permisos de administrador.
- **Ruta y componente de "Acceso Denegado"** para manejar usuarios sin los permisos adecuados

## 🔧 Tecnologías usadas

- Angular 20
- TypeScript
- RxJS
- Angular Material (tablas, formularios, snackbars)
- Bootstrap 5
- JSON Server (`db.json` para simular API REST)
- SASS (con estructura anidada)
- Reactive Forms
- HTML5 + CSS3

## Cómo ejecutar el proyecto?

- git clone https://github.com/juaneuler/proyecto-angular.git
- cd proyecto-angular
- npm install
- ng serve

## Autor

Desarrollado por **Juan Euler** como entrega 2 del curso de Angular en Coderhouse.

- 📁 Repositorio: [proyecto-angular](https://github.com/juaneuler/proyecto-angular)
- 🌐 Portfolio: [portfolio-juan-euler.netlify.app](https://portfolio-juan-euler.netlify.app)
- 💼 LinkedIn: [linkedin.com/in/juan-euler](https://www.linkedin.com/in/juan-euler/)
- 💻 GitHub: [github.com/juaneuler](https://github.com/juaneuler)
- 📧 Contacto: [juaneuler@hotmail.com](mailto:juaneuler@hotmail.com)