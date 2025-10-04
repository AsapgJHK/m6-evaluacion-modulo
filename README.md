# 📂 Gestión de Contactos (CRUD en Node.js y EJS)

Una aplicación web sencilla para la gestión básica de contactos que implementa las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando **Node.js**, el framework **Express** y **EJS** como motor de plantillas. Los datos se persisten en un archivo de texto plano (`contactos.txt`).

---

## ✨ Características

* **Tecnología:** Node.js, Express, EJS, y Módulos ES.
* **Persistencia Simple:** Los contactos se guardan y cargan desde un archivo `contactos.txt`.
* **Rutas Implementadas:**
    * `GET /`: Muestra la lista de contactos.
    * `GET /agregar`: Muestra el formulario para añadir un nuevo contacto.
    * `POST /agregar`: Guarda un nuevo contacto.
    * `GET /editar/:id`: Muestra el formulario para editar un contacto existente.
    * `POST /editar/:id`: Actualiza el contacto.
    * `POST /eliminar/:id`: Elimina un contacto.
* **Estilo Temático:** Diseño con colores de Asuka Langley y una imagen de fondo (requiere el archivo `asuka_background.jpg`).

---

## 🛠️ Requisitos

Asegúrate de tener instalado:

1.  **Node.js y npm** (o yarn)

---

## 🚀 Configuración y Ejecución

Sigue estos pasos para poner en marcha la aplicación.

### 1. Estructura del Proyecto

Organiza tus archivos de la siguiente manera, creando las carpetas `views` y `public` si no existen:

```

gestion-contactos/
├── server.js
├── package.json (Creado por 'npm init')
├── views/
│   ├── lista.ejs
│   ├── agregar.ejs
│   ├── editar.ejs
│   └── error.ejs
└── public/
├── css/
│   └── style.css
└── asuka\_background.jpg  \<-- Coloca tu imagen aquí

````

### 2. Inicializar el Proyecto e Instalar Dependencias

Abre tu terminal, navega a la carpeta principal del proyecto (`gestion-contactos`) y ejecuta los siguientes comandos:

1.  **Inicializa el proyecto** (crea el archivo `package.json`):
    ```bash
    npm init -y
    ```

2.  **Instala las dependencias** (`express` y `ejs`):
    ```bash
    npm install express ejs
    ```

3.  **Configura Módulos ES:**
    Edita el archivo **`package.json`** y agrega la línea `"type": "module",` para permitir el uso de `import` en `server.js`.

    ```json
    {
      "name": "gestion-contactos",
      "version": "1.0.0",
      "description": "",
      "main": "server.js",
      "type": "module",  <-- ¡Añadir esta línea!
      "scripts": {
        "start": "node server.js"
      },
      "dependencies": {
        "ejs": "^3.1.9",
        "express": "^4.18.2"
      }
    }
    ```

### 3. Ejecutar la Aplicación

Una vez configurado, ejecuta el servidor desde la terminal:

```bash
node server.js
````

Deberías ver un mensaje en la consola:

```
Servidor de Contactos iniciado en http://localhost:3000
```

### 4\. Acceder y Probar

Abre tu navegador web y navega a la siguiente dirección:

➡️ **`http://localhost:3000`**

Desde allí, puedes probar las siguientes funcionalidades:

  * **Listar:** Ver la lista de contactos.
  * **Agregar:** Usar el botón "➕ Agregar Nuevo Contacto".
  * **Editar/Eliminar:** Utilizar los botones de acción junto a cada contacto.

El archivo **`contactos.txt`** se creará automáticamente en la raíz del proyecto la primera vez que añadas un contacto.

-----

## 🛑 Detener la Aplicación

Para detener el servidor, regresa a la terminal donde se está ejecutando y presiona:

$$\text{Ctrl} + \text{C}$$


