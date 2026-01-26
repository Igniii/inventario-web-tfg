# StockFlow - Sistema de Gestión de Inventario IT

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)](https://www.java.com/)

> Herramienta web para la gestión de inventario del departamento de IT de una PYME desarrollada como Trabajo de Fin de Grado del CFGS de Desarrollo de Aplicaciones Web en Ilerna Online.

**Autor:** Josep Ignasi Ferrer Garriga  
**Tutor:** Ruben Merin Fuentes  
**Convocatoria:** 1S2526

---

## 📋 Descripción General

**StockFlow** es una aplicación web SPA (Single Page Application) diseñada específicamente para resolver las necesidades reales de gestión de inventario tecnológico en departamentos de IT de pequeñas y medianas empresas. 

El proyecto surge de la observación directa de problemas comunes en entornos laborales donde la gestión del inventario se realiza mediante hojas de cálculo heredadas, documentos duplicados o apuntes dispersos, lo que genera:

- 📊 **Datos desactualizados** y registros que no coinciden
- 🔍 **Falta de trazabilidad** sobre quién movió qué y cuándo
- ⚠️ **Pérdida de material** por control deficiente
- 🐌 **Retrasos innecesarios** al resolver incidencias
- 📉 **Dificultad para planificar** reposiciones y compras

StockFlow ofrece una solución centralizada, segura y escalable que mejora significativamente la trazabilidad y facilita la toma de decisiones dentro del departamento de IT.

---

## 🎯 Objetivos del Proyecto

### Objetivo General

Desarrollar una aplicación web que permita gestionar de manera **centralizada, eficiente y segura** el inventario del departamento de IT de una PYME, proporcionando herramientas que mejoren la trazabilidad, el control del stock y la capacidad de análisis de datos.

### Objetivos Específicos

1. ✅ **Autenticación Segura** - Sistema de autenticación mediante JWT que regule el acceso a la plataforma
2. ✅ **Gestión de Productos** - Módulo CRUD completo para productos y componentes
3. ✅ **Clasificación Estructurada** - Sistema de categorías y gestión de proveedores asociados
4. ⚙️ **Trazabilidad de Movimientos** - Registro de entradas/salidas con fecha, cantidad y responsable
5. 🔔 **Alertas Automáticas** - Sistema de notificaciones para productos con stock mínimo
6. 📊 **Panel de Control** - Dashboard con estadísticas e informes del inventario
7. ✅ **Interfaz Responsive** - UI moderna e intuitiva con Angular, HTML y CSS
8. ✅ **Arquitectura REST** - Comunicación completa entre frontend y backend mediante APIs REST
9. ✅ **Escalabilidad** - Solución preparada para futuras mejoras y ampliaciones

---

## ✨ Características Principales

### Funcionalidades Implementadas

- 🔐 **Sistema de Autenticación JWT**
  - Login y registro de usuarios
  - Roles diferenciados: ADMIN y USER
  - Guards de protección de rutas
  - Tokens con expiración de 24 horas

- 📦 **Gestión Completa de Inventario**
  - CRUD de productos con validaciones
  - Control de stock actual y stock mínimo
  - Asociación con categorías y proveedores
  - Búsqueda y filtrado de productos

- 🏷️ **Organización por Categorías**
  - Clasificación estructurada del inventario
  - CRUD completo de categorías
  - Validación de integridad referencial

- 🏢 **Gestión de Proveedores**
  - Registro de proveedores con información de contacto
  - Asignación opcional a productos
  - Gestión de relaciones 0..* ↔ 0..1

- 📊 **Dashboard Informativo**
  - Visualización de métricas clave
  - Productos críticos (bajo stock mínimo)
  - Estadísticas del inventario

- 👥 **Panel de Administración**
  - Gestión de usuarios (solo ADMIN)
  - Asignación y modificación de roles
  - Control de accesos y permisos

- 🔄 **Trazabilidad de Movimientos**
  - Registro de entradas y salidas de stock
  - Identificación del usuario responsable
  - Histórico completo con fechas

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Angular 17+** - Framework SPA para la interfaz de usuario
- **TypeScript** - Lenguaje de programación tipado
- **Angular Material** - Biblioteca de componentes basada en Material Design
- **HTML5 & CSS3** - Estructura y estilos
- **Lazy Loading** - Carga diferida de componentes para optimización

### Backend

- **Spring Boot** - Framework Java para desarrollo de API REST
- **Spring Security** - Gestión de autenticación y autorización
- **Spring MVC** - Patrón de diseño del backend
- **JPA/Hibernate** - ORM para persistencia de datos
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **BCrypt** - Cifrado de contraseñas

### Base de Datos

- **MySQL 8.0** - Sistema de gestión de bases de datos relacional
- **MySQL Workbench** - Herramienta de diseño y administración

### Herramientas de Desarrollo

- **IntelliJ IDEA** - IDE principal para desarrollo
- **Postman** - Testing de endpoints REST
- **Git & GitHub** - Control de versiones
- **Maven** - Gestión de dependencias (backend)
- **npm** - Gestión de paquetes (frontend)

### Despliegue

- **Railway** - Plataforma cloud para despliegue en producción
- **URL de Producción:** [https://sflow.up.railway.app](https://sflow.up.railway.app)

---

## 📁 Estructura del Proyecto

```
inventario-web-tfg/
│
├── frontend/                    # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/           # Autenticación y guards
│   │   │   ├── productos/      # Gestión de productos
│   │   │   ├── categorias/     # Gestión de categorías
│   │   │   ├── proveedores/    # Gestión de proveedores
│   │   │   ├── movimientos/    # Movimientos de stock
│   │   │   ├── dashboard/      # Panel de control
│   │   │   ├── admin-panel/    # Panel de administración
│   │   │   ├── navbar/         # Navegación principal
│   │   │   └── services/       # Servicios de comunicación
│   │   ├── environments/       # Configuración de entornos
│   │   └── assets/             # Recursos estáticos
│   ├── angular.json
│   └── package.json
│
├── backend/                     # API Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/stockflow/
│   │   │   │       ├── controller/    # Controladores REST
│   │   │   │       ├── service/       # Lógica de negocio
│   │   │   │       ├── repository/    # Repositorios JPA
│   │   │   │       ├── model/         # Entidades del dominio
│   │   │   │       ├── dto/           # Data Transfer Objects
│   │   │   │       ├── config/        # Configuración
│   │   │   │       └── security/      # Seguridad JWT
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── pom.xml
│   └── mvnw
│
├── database/                    # Scripts SQL
│   └── schema.sql
│
└── README.md
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos

#### Frontend
- Node.js v18 o superior
- Angular CLI 17+
- Navegador moderno (Chrome, Firefox, Edge)

#### Backend
- Java JDK 17
- Maven 3.8+
- MySQL 8.0

### Instalación en Entorno Local

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Igniii/inventario-web-tfg.git
cd inventario-web-tfg
```

#### 2. Configurar la Base de Datos

```bash
# Crear la base de datos en MySQL
mysql -u root -p

CREATE DATABASE stockflow_db;
USE stockflow_db;

# Importar el esquema (si existe un archivo SQL)
SOURCE database/schema.sql;
```

#### 3. Configurar el Backend

```bash
cd backend

# Editar application.properties
# Configurar credenciales de MySQL:
spring.datasource.url=jdbc:mysql://localhost:3306/stockflow_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

#### 4. Configurar el Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

---

## 👤 Credenciales de Acceso

### Entorno de Producción

**Usuario Administrador:**
- Usuario: `admin`
- Contraseña: `admin123`

**Nota:** En un entorno de producción real, estas credenciales deben cambiarse inmediatamente.

---

## 📖 Guía de Uso

### Inicio de Sesión

1. Acceder a la URL de la aplicación
2. Introducir credenciales válidas
3. El sistema validará y generará un token JWT
4. Redirección automática al panel principal

### Registro de Nuevos Usuarios

1. Hacer clic en "Registro" desde la pantalla de login
2. Completar el formulario con usuario y contraseña
3. Los nuevos usuarios se crean con rol USER (solo lectura)
4. Un administrador puede elevar privilegios desde el Panel de Administración

### Gestión de Productos

- **Crear:** Botón "Nuevo Producto" → Completar formulario → Guardar
- **Editar:** Click en el icono de edición → Modificar datos → Actualizar
- **Eliminar:** Click en el icono de eliminar (solo si no tiene movimientos)
- **Consultar:** Visualización en tabla con búsqueda y filtros

### Gestión de Categorías y Proveedores

Funcionamiento similar a productos con CRUD completo. Las categorías y proveedores se pueden asignar opcionalmente a productos durante su creación o edición.

### Movimientos de Stock

1. Acceder al módulo "Movimientos"
2. Seleccionar producto y tipo de movimiento (entrada/salida)
3. Indicar cantidad
4. El sistema registra automáticamente usuario y fecha
5. El stock se actualiza en tiempo real

### Panel de Administración (Solo ADMIN)

- Crear nuevos usuarios con roles específicos
- Editar información de usuarios existentes
- Eliminar usuarios (excepto el propio)
- No se puede modificar el rol una vez asignado

---

## 🏗️ Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────┐
│   Angular SPA   │  ← Frontend (Puerto 4200)
│   (Cliente)     │
└────────┬────────┘
         │ HTTP/REST + JWT
         │
┌────────▼────────┐
│  Spring Boot    │  ← Backend (Puerto 8080)
│   API REST      │
└────────┬────────┘
         │ JPA/Hibernate
         │
┌────────▼────────┐
│   MySQL 8.0     │  ← Base de Datos
│  (stockflow_db) │
└─────────────────┘
```

### Patrones de Diseño

- **MVC (Model-View-Controller)** - Separación de capas en el backend
- **DTO (Data Transfer Objects)** - Optimización de comunicación
- **Repository Pattern** - Abstracción de acceso a datos
- **Guard Pattern** - Protección de rutas en Angular
- **Service Layer** - Encapsulación de lógica de negocio
- **Lazy Loading** - Carga diferida de componentes

### Seguridad

- **JWT (JSON Web Tokens)** para autenticación stateless
- **BCrypt** para cifrado de contraseñas
- **Spring Security** para autorización basada en roles
- **CORS configurado** para comunicación frontend-backend
- **Guards de Angular** para protección de rutas del lado del cliente

---

## 📊 Modelo de Datos

### Diagrama Entidad-Relación

El sistema consta de 5 entidades principales con las siguientes relaciones:

- **Usuario** (1) ──→ (N) **Movimiento Stock**
- **Producto** (1) ──→ (N) **Movimiento Stock**
- **Categoría** (1) ──→ (0..N) **Producto**
- **Proveedor** (1) ──→ (0..N) **Producto**

### Entidades Principales

#### Usuario
- `id` (PK)
- `username`
- `password` (cifrada con BCrypt)
- `role` (ADMIN / USER)

#### Producto
- `id` (PK)
- `nombre`
- `descripcion`
- `stock`
- `stock_minimo`
- `categoria_id` (FK - opcional)
- `proveedor_id` (FK - opcional)

#### Categoría
- `id` (PK)
- `nombre`

#### Proveedor
- `id` (PK)
- `nombre`
- `contacto`

#### Movimiento Stock
- `id` (PK)
- `cantidad`
- `fecha`
- `tipo` (ENTRADA / SALIDA)
- `nota`
- `producto_id` (FK)
- `usuario_responsable`

---

## 🧪 Pruebas y Validación

### Tipos de Pruebas Realizadas

- ✅ **Pruebas Funcionales** - Validación de casos de uso
- ✅ **Pruebas de Integración** - Comunicación frontend-backend
- ✅ **Pruebas de Seguridad** - Validación JWT y roles
- ✅ **Pruebas de Interfaz** - Responsividad y usabilidad
- ✅ **Pruebas en Producción** - Validación en Railway

### Resultados

La mayoría de funcionalidades core han superado las pruebas satisfactoriamente. Se han identificado mejoras pendientes en validaciones de formularios y el módulo de movimientos requiere ajustes adicionales.

---

## 📈 Estado del Proyecto

### ✅ Funcionalidades Completadas

- Sistema de autenticación JWT completo
- CRUD de productos, categorías y proveedores
- Panel de administración de usuarios
- Dashboard con métricas básicas
- Despliegue en producción (Railway)
- Comunicación REST segura
- Interfaz responsive (escritorio)

### ⚙️ En Desarrollo / Mejoras Futuras

- Sistema completo de movimientos de stock
- Alertas automáticas de stock mínimo desde frontend
- Dashboard con gráficos avanzados
- Mejora de responsividad en móvil y tablet
- Exportación de reportes a CSV/PDF
- Integración con lectores de código de barras/QR
- Sistema de múltiples almacenes
- Auditoría completa de acciones

---

## 🔮 Vías Futuras

### Mejoras Planificadas

1. **Análisis Avanzado**
   - Gráficos interactivos con Chart.js o D3.js
   - Predicción de reposición basada en histórico
   - Reportes automatizados

2. **Gestión Ampliada**
   - Soporte para múltiples ubicaciones/almacenes
   - Asignación de equipos a empleados
   - Gestión de ciclo de vida del material

3. **Automatización**
   - Tareas programadas (limpieza, backups)
   - Notificaciones por email
   - Integración con sistemas externos (ERP, compras)

4. **Seguridad y Auditoría**
   - Logs detallados de todas las operaciones
   - Historial de cambios por usuario
   - Autenticación de dos factores (2FA)

5. **Movilidad**
   - App móvil nativa (React Native / Flutter)
   - PWA (Progressive Web App)
   - Escaneo de códigos QR desde dispositivos móviles

---

## 📚 Metodología de Desarrollo

El proyecto se ha desarrollado siguiendo principios de **metodologías ágiles**, inspirado en Scrum y Kanban:

- ✅ **Desarrollo Incremental** - Entregas funcionales por iteración
- ✅ **Sprints Cortos** - Ciclos de desarrollo de 1-2 semanas
- ✅ **Backlog Priorizado** - Gestión de tareas en Trello
- ✅ **Revisión Continua** - Validación al final de cada sprint
- ✅ **Flexibilidad** - Adaptación a cambios y nuevos requisitos

---

## 🎓 Contexto Académico

Este proyecto constituye el **Trabajo de Fin de Grado** del Ciclo Formativo de Grado Superior de **Desarrollo de Aplicaciones Web** en **Ilerna Online**.

### Competencias Desarrolladas

- Desarrollo Full Stack (frontend + backend)
- Arquitectura de aplicaciones web modernas
- Gestión de bases de datos relacionales
- Implementación de seguridad y autenticación
- Despliegue en entornos cloud
- Metodologías ágiles de desarrollo
- Documentación técnica profesional

---

## 🤝 Contribuciones

Aunque este es un proyecto académico personal, cualquier feedback, sugerencia o reporte de issues es bienvenido a través de GitHub Issues.

---

## 📄 Licencia

Este proyecto ha sido desarrollado con fines educativos como parte del TFG del CFGS de Desarrollo de Aplicaciones Web.

---

## 👨‍💻 Autor

**Josep Ignasi Ferrer Garriga**

- 🎓 Estudiante de Desarrollo de Aplicaciones Web
- 🏫 Ilerna Online
- 📧 Contacto: [A través de GitHub]

---

## 🙏 Agradecimientos

- **Ruben Merin Fuentes** - Tutor del proyecto
- **Ilerna Online** - Centro formativo
- **Comunidad de desarrolladores** - Documentación y recursos compartidos
- **Spring Framework & Angular Teams** - Por las excelentes herramientas y documentación

---

## 📖 Documentación Adicional

Para información detallada sobre:
- Manual de instalación completo
- Manual de usuario detallado
- Análisis DAFO del proyecto
- Diagramas de casos de uso
- Diagrama de clases
- Planificación temporal (Gantt)

Consultar la **Memoria del Proyecto** completa incluida en el repositorio.

---

<div align="center">

**StockFlow** - Gestión Inteligente de Inventario IT

*Desarrollado con* ❤️ *en Angular y Spring Boot*

[🌐 Demo en Producción](https://sflow.up.railway.app) | [📝 Documentación](https://github.com/Igniii/inventario-web-tfg) | [🐛 Reportar Issue](https://github.com/Igniii/inventario-web-tfg/issues)

</div>
