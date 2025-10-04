import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;


const CONTACTOS_FILE = path.join(__dirname, 'contactos.txt');
const DELIMITER = '|';


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({ extended: true })); 




async function leerContactos() {
    try {
        const data = await fs.readFile(CONTACTOS_FILE, 'utf8');
        if (!data) return [];

        const lineas = data.trim().split('\n');
        return lineas.map(linea => {
            const [id, nombre, telefono, email] = linea.split(DELIMITER);
            return {
                id: parseInt(id),
                nombre: nombre,
                telefono: telefono,
                email: email
            };
        });
    } catch (error) {
        
        if (error.code === 'ENOENT') {
            console.log("Archivo de contactos no encontrado. Creando uno nuevo.");
            return [];
        }
        console.error("Error al leer/parsear contactos:", error.message);
        throw new Error('Fallo al cargar la base de datos de contactos.');
    }
}


async function guardarContactos(contactos) {
    try {
        const contenido = contactos.map(c => 
            `${c.id}${DELIMITER}${c.nombre}${DELIMITER}${c.telefono}${DELIMITER}${c.email}`
        ).join('\n');
        await fs.writeFile(CONTACTOS_FILE, contenido, 'utf8');
    } catch (error) {
        console.error("Error al escribir contactos:", error.message);
        throw new Error('Fallo al guardar la base de datos de contactos.');
    }
}


app.get('/', async (req, res, next) => {
    try {
        const contactos = await leerContactos();
        res.render('lista', { 
            contactos: contactos, 
            titulo: 'Lista de Contactos' 
        });
    } catch (error) {
        next(error); 
    }
});


app.get('/agregar', (req, res) => {
    res.render('agregar', { 
        titulo: 'Agregar Nuevo Contacto' 
    });
});


app.post('/agregar', async (req, res, next) => {
    try {
        const { nombre, telefono, email } = req.body;
        
        if (!nombre || !telefono || !email) {
            throw { status: 400, message: 'Todos los campos son obligatorios.' };
        }

        const contactos = await leerContactos();
        
        
        const newId = Date.now() + Math.floor(Math.random() * 100); 

        const nuevoContacto = {
            id: newId,
            nombre: String(nombre),
            telefono: String(telefono),
            email: String(email)
        };

        contactos.push(nuevoContacto);
        await guardarContactos(contactos);

        res.redirect('/'); 
    } catch (error) {
        next(error); 
    }
});


app.get('/editar/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const contactos = await leerContactos();
        const contacto = contactos.find(c => c.id === id);

        if (!contacto) {
            throw { status: 404, message: `Contacto con ID ${id} no encontrado.` };
        }

        res.render('editar', { 
            titulo: `Editar Contacto: ${contacto.nombre}`,
            contacto: contacto
        });
    } catch (error) {
        next(error);
    }
});


app.post('/editar/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, telefono, email } = req.body;

        if (!nombre || !telefono || !email) {
            throw { status: 400, message: 'Todos los campos son obligatorios.' };
        }

        const contactos = await leerContactos();
        const index = contactos.findIndex(c => c.id === id);

        if (index === -1) {
            throw { status: 404, message: `No se puede editar: Contacto con ID ${id} no encontrado.` };
        }

        contactos[index] = { id, nombre, telefono, email };
        await guardarContactos(contactos);

        res.redirect('/'); 
    } catch (error) {
        next(error);
    }
});


app.post('/eliminar/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const contactos = await leerContactos();
        
        const contactosActualizados = contactos.filter(c => c.id !== id);

        if (contactosActualizados.length === contactos.length) {
             
            throw { status: 404, message: `No se puede eliminar: Contacto con ID ${id} no encontrado.` };
        }

        await guardarContactos(contactosActualizados);

        res.redirect('/'); 
    } catch (error) {
        next(error);
    }
});



app.use((req, res, next) => {
    res.status(404).render('error', { 
        titulo: 'Error 404', 
        mensaje: `La ruta solicitada: ${req.url} no se encontró en el servidor.` 
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.status || 500;
    const message = err.message || 'Error interno del servidor. Intente más tarde.';
    
    res.status(statusCode).render('error', { 
        titulo: `Error ${statusCode}`, 
        mensaje: message
    });
});


app.listen(PORT, () => {
    console.log(`Servidor de Contactos iniciado en http://localhost:${PORT}`);
});
