
  Platform.Load("Core", "1.1.1");
  try {
    var submitted = Request.Method == "POST";
    if (submitted) {
      // Campos del formulario actual
      var nombreEspacio = Request.GetFormField("nombre_espacio");
      var direccion = Request.GetFormField("direccion");
      var estado = Request.GetFormField("estado");
      var tipoInscripcion = Request.GetFormField("tipo_inscripcion");
      var categoria = Request.GetFormField("categoria");
      var redesSociales = Request.GetFormField("redes_sociales");
      var tuNombre = Request.GetFormField("tu_nombre");
      var tuCorreo = Request.GetFormField("tu_correo");
      var empresaColaboras = Request.GetFormField("empresa_colaboras");

      var insertDE = DataExtension.Init("Refiere_Gym_Usuarios_Form");
      insertDE.Rows.Add({
        "nombreEspacio": nombreEspacio,
        "direccion": direccion,
        "estado": estado,
        "tipoInscripcion": tipoInscripcion,
        "categoria": categoria,
        "redesSociales": redesSociales,
        "tuNombre": tuNombre,
        "tuCorreo": tuCorreo,
        "empresaColaboras": empresaColaboras
      });

      Write("<p style='color:green; font-weight:bold;'>✅ ¡Gracias! Tu información ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.</p>");
    }
  } catch(e) {
    Write("<p style='color:red; font-weight:bold;'>❌ Error al guardar en Data Extension: " + Stringify(e) + "</p>");
  }
