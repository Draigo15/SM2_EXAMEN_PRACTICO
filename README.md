# SM2_EXAMEN_PRACTICO

Curso: Soluciones Moviles II

Alumno: Rodrigo Lira Alvaerz
# Historial de inicios de sesión

Curso: Soluciones Moviles II

Alumno: Rodrigo Lira Alvaerz

Fecha: 21-10-2025

Repositorio: https://github.com/Draigo15/SM2_EXAMEN_PRACTICO

Descripción del proyecto
-------------------------
Este documento se centra exclusivamente en la implementación de la funcionalidad "Historial de inicios de sesión" dentro de la aplicación. La característica permite al usuario autenticado consultar cuándo y desde qué dispositivo o IP se iniciaron sesiones en su cuenta.

Historia de usuario
-------------------
Como usuario autenticado,
quiero ver un historial de mis inicios de sesión,
para saber cuándo y desde qué dispositivo accedí a mi cuenta.

Criterios de Aceptación
-----------------------
- Al iniciar sesión exitosamente, se registra el usuario, la fecha y hora del inicio, así como la dirección IP desde donde inició sesión.
- En la sección "Historial de inicios de sesión", el usuario puede ver una lista con:
	- Usuario
	- Fecha y hora de inicio de sesión
	- Dirección IP (cuando esté disponible)
- Los registros se deben mostrar ordenados del más reciente al más antiguo.

Descripción breve de la funcionalidad implementada
--------------------------------------------------
- Backend: se registra cada inicio de sesión en una tabla/colección con los campos mínimos: usuario (ID), timestamp (UTC) y dirección IP (si está disponible). El registro puede complementarse con información de dispositivo si la app la envía.
- API: endpoint protegido que devuelve el historial paginado y ordenado por timestamp descendente.
- Frontend (app): pantalla "Historial de inicios de sesión" que consume el endpoint, muestra la lista ordenada y ofrece estados de carga / vacío / error.

Evidencias — capturas de pantalla
---------------------------------
Añade las imágenes en `Frontend/assets/screenshots/` con los nombres indicados abajo y reemplaza las rutas si es necesario. Si quieres, puedo crear placeholders por ti.

1) Lista de historial (ordenada: más reciente → más antiguo)

![Historial - lista](Frontend/assets/screenshots/screenshot_session_history_list.png)

2) Detalle de un registro (usuario, fecha/hora, IP/dispositivo)

![Historial - detalle](Frontend/assets/screenshots/screenshot_session_history_detail.png)

3) Evidencia de registro creado al iniciar sesión (log o respuesta del endpoint)

![Registro creado](Frontend/assets/screenshots/screenshot_session_history_created.png)

Instrucciones rápidas para añadir las imágenes
----------------------------------------------
1. Crea la carpeta `Frontend/assets/screenshots/` si no existe.
2. Copia aquí tus capturas con los nombres indicados arriba.
3. Si quieres que Flutter incluya las imágenes como assets, añade la ruta en `Frontend/pubspec.yaml` bajo `flutter: assets:`.

Cómo ejecutar (comandos útiles)
-----------------------------
Desde la carpeta `Frontend` en PowerShell:

```powershell
flutter pub get
flutter run -d windows
```

Contacto
--------
Repositorio: https://github.com/Draigo15/SM2_EXAMEN_PRACTICO

Si quieres que cree la carpeta `Frontend/assets/screenshots/` y añada imágenes placeholder (transparentes) para que el README muestre algo ya, dime y lo hago.
![Modelo 3D](Frontend/assets/screenshots/screenshot_model.png)
