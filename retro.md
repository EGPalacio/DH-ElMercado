RETRO SPRINT 6: Revisión del trabajo realizado en el Sprint 5
==============

Reunión 30 de Junio de 2020

Nos reunimos para repasar los asuntos positivos y las oportunidades de mejora observadas en el sprint 4.

1 - Que hicimos bien:
    - El equipo está muy contento con las mejoras estéticas del sitio que aportó Martín para mejorar la visual del Home y el agregado del blog del recorrido del curso.
    - Nos gustó como quedaron los archivos para el seed de datos en sequelize y la incorporación de la secuencia de instalación del proyecto que documentamos en Readme.md.

2 - Que hicimos mal:
    - Las promesas anidadas que usamos en algunos controllers se pueden mejorar con el uso de PromiseAll, nos gustó mucho más esa lógica.

3 - Que tenemos que hacer.
    - Tenemos que seguir trabajando organizados como hasta ahora para llegar bien al fin del sprint y la entrega en término.

    Para este Sprint nos repartimos los trabajos de validación de la siguiente manera:
    ==================================================================================
    - Login (LH)
    - Register (MP)
    - Crear Product (MP)
    - Edit Product (EGP)
    - Edit User (LH)


4 - Que es lo que no tenemos que hacer.
    - Sin comentarios para esta retro.
    - Tuvimos mejor feedback del sprint 5!!

Martín.
Leandro.
Eduardo.


---------------------------------------------------------------------------------------------------------------

RETRO SPRINT 5: Revisión del trabajo realizado en el Sprint 4
==============

Reunión 16 de Junio de 2020

Nos reunimos para repasar los asuntos positivos y las oportunidades de mejora observadas en el sprint 4.

1 - Que hicimos bien:
    - Como equipo estamos más consolidados. Disfrutamos de las reuniones y la pasamos bien trabajando juntos.
    - Nos concentramos en los puntos que específicamente requieren los sprints.
    - Se realizó una modificación estética del sitio con un cambio significativo. Console.log(Grande Tincho!!);
            - Separar el partial del Header en diferentes componentes:
                    - Header con el logo, barra de búsqueda y botones de acceso a carrito y notificaciones.
                    - Barra de navegación.
            - Footer para el sitio.
    - También se movieron las rutas del index a archivos individuales para cada sección (productos, carrito, etc.)

2 - Que hicimos mal:
    - Revisamos la devolución del sprint 4 y explicamos a los profesores que el punto de validación de usuario para ciertas páginas ya estaba completo.

3 - Que tenemos que hacer.
    Entendemos que la clave para encarar bien este sprint es separarnos bien las tareas y organizar el timing para coordinar bien el trabajo de cada uno y no trabarnos para llegar al resultado:

    Primera Parte:
    ==============
    (Draw, Modelo Sequelize, Asociaciones, Script Población)
    - Tabla Usuarios
    - Tabla Productos
    - Tablas Secundarias:
        - userType (Usuarios)
        - discount (Product)
        - category (Product)

    Segunda Parte:
    ==============
    CRUD Product                CRUD USER
    - Crear (MP)                - Crear (MP)
    - Editar (EGP)              - Editar (MP)
    - Eliminar (EGP)            - ver Detalle (EGP)
    - Listar (LH)
    - Ver Detalle (LH)
    - Buscar (LH)


4 - Que es lo que no tenemos que hacer.
    - Sin comentarios para esta retro.

Martín.
Leandro.
Eduardo.


---------------------------------------------------------------------------------------------------------------

RETRO SPRINT 4: Revisión del trabajo realizado en el Sprint 3
==============

Reunión 03 de Junio de 2020

Nos reunimos para repasar los asuntos positivos y las oportunidades de mejora observadas en el sprint 3.

1 - Que hicimos bien:
    - Como equipo estamos mejor organizados.
    - Mejoró la comunicación y el timign de las reuniones semanales ayuda a llevar el proyecto de mandera más organizada y coordinada.
    - Se realizó un trabajo interesante en el armado del controlador de productos con previsualización de las imágenes a subir al crear productos nuevos.

2 - Que hicimos mal:
    - La modularización de las rutas del sitio no es la adecuada, vamos a arreglar eso durante el Sprint 4.
    - Necesitamos dividir mejor los partials para que el armado del sitio sea más eficiente y escalable.
    - Nos faltó hacer público el trello con la información del seguimiento del proyecto.

3 - Que tenemos que hacer.
    - Necesitamos separar el partial del Header en diferentes componentes:
            - Por un lado el Header con el logo, barra de búsqueda y botones de acceso a carrito y notificaciones.
            - Por otro lado la barra de navegación.
            - Incluir en el partial del Header el título de la vista enviado de manera dinámica desde el controlador.
    - Incorporar un footer para el sitio.
    - Mover las rutas del index a archivos individuales para cada sección (productos, carrito, etc.)
    - Modificar los títulos de las retro para que se entienda que corresponden al sprint anterior.

4 - Que es lo que no tenemos que hacer.
    - Sin comentarios para esta retro.

Martín.
Leandro.
Eduardo.

---------------------------------------------------------------------------------------------------------------

RETRO SPRINT 3: Revisión del trabajo realizado en el Sprint 2
==============

Reunión 26 de Mayo de 2020

Nos reunimos para repasar los asuntos positivos y las oportunidades de mejora observadas en el sprint 2.

1 - Que hicimos bien:
    - Comenzamos a tener las reuniones semanales programadas todos los martes.
    - Organizamos la distribución del trabajo desde el inicio del sprint.

2 - Que hicimos mal:
    - Comenzamos a programar los distintos controladores sin habernos puesto de acuerdo en la estructura de carpetas para guardar los archivos. 
      Esto nos llevó a tener que modificar la estructura de carpetas a mitad de camino y tener que cambiar algunas líneas de código de rutas y controladores
      para atender a los cambios en el tree de archivos de imágenes.

3 - Que tenemos que hacer.
    - Necesitamos hacer la retro en la primer reunión del sprint, para tener más frescos los puntos detectados en el sprint anterior.

4 - Que es lo que no tenemos que hacer.
    - Al determinar estructuras de carpetas y ruteos no comenzar a programar sin tener la oportunidad de discutir esas estructuras dentro del equipo.

Martín.
Leandro.
Eduardo.

---------------------------------------------------------------------------------------------------------------

RETRO SPRINT 2: Revisión del trabajo realizado en el Sprint 1
=============================================================

Reunión 13 de Mayo de 2020

Nos reunimos para repasar los asuntos positivos y las oportunidades de mejora observadas en el sprint 1.

1 - Que hicimos bien:
    - Arrancar el trabajo con distribuyendo las tareas en trello desde el arranque.
    - Incorporar Figma para el armado de los wireframes.
    - Realizar reunión temprana para distribuir actividades del sprint 1 entre el equipo.

2 - Que hicimos mal:
    - Al cambiar de repositorio un miembro del equipo subió todo el trabajo del otro respositorio y se perdió visibilidad del trabajo individual de cada uno.

3 - Que tenemos que hacer.
    - Dejar seteadas reuniones semanales de revisión de status (Martes 19 hs.)

4 - Que es lo que no tenemos que hacer.
    - Dejar pasar mucho tiempo entre las reuniones de equipo.
    - Organizar y cumplir el cronograma de reuniones recurrentes.

Martín.
Leandro.
Eduardo.