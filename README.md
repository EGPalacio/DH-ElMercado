e-Commerce orientado a la compra-venta de productos y servicios, con un precio fijado por los usuarios que realizarán las transacciones.
A diferencia de otras plataformas de comercio electrónico, el público al que se dirigirá está enfocado principalmente a aquellos individuos, que por su lejanía a sectores más urbanizados presentan dificultades al momento de recibir envíos a su domicilio. En el caso de los comercios, la idea es apuntar a pequeñas y medianas empresas (en su mayoría son emprendimientos), que por su ubicación en localidades alejadas se verían beneficiadas por nuestro servicio.
Para una mejor experiencia en la navegabilidad por parte de los usuarios, tanto los productos como los servicios estarán divididos por rubro, y a su vez sub-divididos por aquellos parámetros que se crean pertinentes al momento de realizar el proyecto.
Por otra parte con el fin de asegurar el compromiso por parte de los usuarios, se agregará un "Sistema de Reputación" (símil MercadoLibre), en donde se puedan calificar entre las partes que realizan la transacción en cuestión. De esta forma nuestros clientes podrán tener un parámetro más a la hora de tomar sus decisiones. Esta opción puede estar acompañada por comentarios de ambas partes.
En lo que refiere a las transacciones, se realizarán a través de medios electrónicos (a definir) o tarjetas de crédito, estas transferencias inicialmente serán realizadas a una cuenta de nuestro e-Commerce, y una vez que el destinatario del servicio / producto confirme su recepción se liberará el pago, para así comprometer a que el prestador de los servicios o vendedor obren de buena fe.

Listado de 5 referentes:
- https://www.amazon.com/
- https://www.mercadolibre.com.ar/
- https://www.ebay.com/
- https://es.aliexpress.com/
- https://www.shopify.com/

Tablero de trabajo:

https://trello.com/b/CLcabTD8/proyecto-integrador

Blog:
Dentro del proyecto agregamos una seccion para llevar un registro del camino recorrido.

PROCESO PARA INSTALACIÓN DEL PROYECTO:
======================================

1) Clonar el proyecto e instalar los paquetes
> git clone https://github.com/EGPalacio/DH-ElMercado.git
> cd Nordelta-Team-4\site
> npm install

2) Prender Xampp

3) Crear el schema en SQL usando MySQL Workbrench
>npx sequelize-cli db:create
    Bases de Datos:
        DB: siteTeam4
        User: team4
        Password: team4

4) Ejecutar los scripts de JavaScript que crean las tablas y populan los datos de testing
> cd server\dbInstall
> node productCreate.js
    // crea tablas y completa datos de testing productos y tablas secundarias de producto.
> node userCreate.js
> cd..
> cd..

5) iniciar el sitio con nodemon start
> npx nodemon start
http://localhost:3030/

6) iniciar el dashboard:
>cd..
>cd dashboard
>npm start


