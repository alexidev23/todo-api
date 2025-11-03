# 📝 To-Do API (Node + Express + MySQL)

Una API RESTful simple y eficiente para gestionar tareas (To-Dos).  
Desarrollada con **Node.js**, **Express** y **MySQL**, esta API permite **crear, leer, actualizar y eliminar tareas**.  
Ideal para practicar integración con un frontend o como base para un proyecto fullstack.

---

## 🚀 Tecnologías utilizadas

- **Node.js** – entorno de ejecución JavaScript.
- **Express.js** – framework minimalista para manejar rutas y middlewares.
- **MySQL** – base de datos relacional.
- **Dotenv** – manejo seguro de variables de entorno.
- **Nodemon** *(opcional)* – recarga automática durante el desarrollo.

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/todo-api.git
cd todo-api
```

### 2. Instalar dependencias
```bash
pnpm install
# o npm install
```

### 3. Crear el archivo `.env`
Configura tus variables de entorno en la raíz del proyecto:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=todo_app
PORT=4000
```

### 4. Crear la base de datos en MySQL
Ejecuta esto en tu Workbench o terminal SQL:
```sql
CREATE DATABASE todo_app;
USE todo_app;

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false
);
```

### 5. Iniciar el servidor
```bash
pnpm dev
# o npm run dev
```

---

## 🧩 Endpoints disponibles

| Método | Ruta             | Descripción                     |
|--------|------------------|---------------------------------|
| GET    | `/`         | Obtiene todas las tareas        |
| POST   | `/newtodo`         | Crea una nueva tarea            |
| PUT    | `/todo/:id`     | Edita una tarea existente       |
| DELETE | `/todo/:id`     | Elimina una tarea               |

### 📦 Ejemplo de cuerpo para POST/PUT
```json
{
  "text": "Estudiar Node.js",
  "completed": false
}
```
---

## 🧑‍💻 Autor

**Alexis Escobar**  
Desarrollador FrontEnd Junior apasionado por el aprendizaje y la mejora continua.  
📬 LinkedIn: [https://www.linkedin.com/in/alexis-escobar-95b491184/](https://www.linkedin.com/in/alexis-escobar-95b491184/)  
🔗 Portafolio: [https://github.com/alexidev23](https://github.com/alexidev23)

---

⭐ Si te gustó este proyecto, dejale una estrella en GitHub para apoyar su desarrollo.
