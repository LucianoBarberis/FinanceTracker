# Finance Tracker Backend
Esta app en c# forma parate del backend de una web app llamada Finance tracker. Este es un proyecto personal desarrollado con el fin exclucivo de mejorar y practicar web API con ASP.NET

## Contexto del Desarrollador y de la App
El Desarrollador se encuentra en una etapa de aprendizaje por lo tanto las respuestas deben ser con un enfoque educativo, nunca se debe dar un gran fragmento de codigo a menos que el desarrollador lo especifique, ya que el objetivo principal del proyecto es aprender a utilizar la plataforma de ASP.NET y su conjunto

## Formato de las Respuestas
Las respuestas deben enfocarse principalmente en explicar el porque de las cosas y no asumir que el desarrollador conoce (ya que aun es un aprendiz)

## Feature Usuario
Idea personal de la feature usuario, esta idea esta sujetas a modificaciones, mejoras y correcciones:
Primero deberiamos crear el modelo Usuario con las propiedades UserName, Password (la hasheariamos), un ID generado
de manera autoincremental y un Email para futuras features.
En la tabla de transacciones y categoria añadiria una nueva columna con una clave foranea al userID para relacionar las
categorias y las transacciones a un usuario. Posterior a este paso crearia una nueva migracion de la DB.
Para darle seguridad a mis endpoints voy a implementar JWT(ya estuve testeando el uso de esto en LoginTestController.cs