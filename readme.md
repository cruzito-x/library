# Sistema de Facturación para Librería

Este es un sistema de facturación desarrollado para una librería utilizando las tecnologías siguientes:

- **Frontend:** React JS
- **Backend:** Express JS
- **Base de Datos:** MySQL

## Funcionalidades
- Dashboard: permite visualizar de manera centralizada la información más importante referente a ventas, libros y ganancias obtenidas.
- Gestión de libros: permite agregar, editar y eliminar libros.
- Facturación: permite generar facturas para los clientes, seleccionando los libros que desean adquirir.

## Requisitos de Instalación
Para ejecutar este sistema localmente, asegúrese de tener instalado lo siguiente:

- **Node.js** - Node.js es un entorno de ejecución para JavaScript.
- **MySQL** - MySQL es un sistema de gestión de bases de datos relacional.

## Instalación
Clona este repositorio:
```
git clone https://github.com/cruzito-rar/library.git
```

Navega hasta el directorio del proyecto:
```
cd library
```

Instala las dependencias del frontend y del backend:
### Front-end
```javascript
cd frontend
```
```javascript
npm install
```
```javascript
npm run start
```
### Back-end
```javascript
cd backend
```
```javascript
npm install
```
```javascript
node app.js
```

Configura la base de datos MySQL:
- Crea una nueva base de datos MySQL.
- Importa el archivo database.sql proporcionado en la carpeta data para crear la estructura de la base de datos.

Al momento de importar la base de datos a tu gestor de MySQl, deberás ejecutar las siguientes instrucciones:

```sql
set global sql_mode = '';
```
```sql
set global lc_time_names = 'es_ES';
```