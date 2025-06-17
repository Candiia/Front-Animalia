<h1 align="center">
    <img src="https://github.com/user-attachments/assets/61a2b517-d3e3-4168-af93-143d02472ed1" alt="logo_animalia">
</h1>

# 🐾 La red social para amantes de los animales 🐾

Animalia es una plataforma innovadora diseñada para conectar a amantes de los animales. En ella, puedes **crear perfiles para tus mascotas**, compartir momentos especiales y participar en una comunidad activa y respetuosa.

---

## 📌 **Prototipo en Figma**
🔗 [Ver prototipo en Figma](https://www.figma.com/design/5LrZnVHjrG45894AAPyL65/Untitled?node-id=0-1&m=dev)

---

## 💡 **Características principales**
### 🎨 **Para usuarios**
- **Acceso usuario**
  - 🆔 **Usuario:** `user1`
  - 🔑 **Contraseña:** `1234`
- **Creación de perfiles de mascotas** con nombre, especie, raza, edad y fotografías.
- **Publicaciones interactivas** con imágenes y textos.
- **Interacción social**, permitiendo comentar y reaccionar con "Me gusta".
- **Edición de datos** personales y de mascotas.

### 🔧 **Para administradores**
- **Acceso administrador**
  - 🆔 **Usuario:** `admin`
  - 🔑 **Contraseña:** `admin`
- **Gestión de usuarios**: creación, edición y eliminación de cuentas.
- **Moderación de contenido**, asegurando calidad y cumplimiento de normas.
- **Administración de especies y razas** para una mejor clasificación.
- **Supervisión de interacciones**, incluyendo gestión de "Me gusta".

---

## 🖥️ **Tecnologías principales**
| Tecnología | Versión |
|------------|--------|
| Angular | 18.20 |
| TypeScript | Última |
| Nginx | 1.25.5 |
| Docker | Contenerización |

---

## 🛠️ **Estructura del Dockerfile**
### 📦 **Etapa de construcción**
1. Usa `node:20.18` para instalar dependencias.
2. Genera archivos estáticos listos para producción.

### 🚀 **Etapa de ejecución**
1. Usa `nginx:1.25.5` para servir la aplicación.
2. Expone el puerto `80` para el acceso a la app.

---

## 🐳 **Uso de Docker Compose**
Para poder levantar correctamente tanto el backend como el frontend usando el archivo docker-compose.yml que integra ambos servicios, es importante que los repositorios estén organizados en una estructura de carpetas a nivel local que permita al compose encontrar los contextos de construcción correctamente.
- Se recomienda clonar ambos repositorios dentro de una misma carpeta padre, de forma que queden como carpetas hermanas, por ejemplo:
```sh
/mi-carpeta-proyectos
  ├── Back-Animalia
  │    └── docker-compose.yml
  └── Front-Animalia
       └── Dockerfile
