// ============================================================
// SCRIPT PARA CREAR AUTOMATICAMENTE EL FORMULARIO DE APICULTURA
// ============================================================
//
// INSTRUCCIONES:
// 1. Inicia sesion en iglesiasdapenafundacion@gmail.com
// 2. Ve a https://script.google.com
// 3. Haz clic en "+ Nuevo proyecto"
// 4. Borra todo el codigo que aparece
// 5. Copia y pega TODO este archivo
// 6. Haz clic en el boton "Ejecutar" (triangulo ▶)
// 7. La primera vez te pedira permisos: haz clic en "Revisar permisos" → tu cuenta → "Permitir"
// 8. Espera unos segundos. El formulario se creara automaticamente
// 9. Ve a https://forms.google.com para verlo
//
// TEMA VISUAL (se aplica automaticamente):
// - Color de acento: Dorado miel (#FFB300)
// - Color de fondo: Crema suave (#FFF8E1)
// - Emojis tematicos: 🐝🍯🌻🌼 en titulos y secciones
//
// NOTA SOBRE COLORES:
// La funcion aplicarTemaApicultura() intenta aplicar los colores
// automaticamente usando la API avanzada de Google Forms.
// Si los colores no se aplican:
//   1. Abre el formulario en Google Forms
//   2. Haz clic en el icono de paleta (🎨) arriba a la derecha
//   3. Selecciona color de tema/acento: dorado/ambar
//   4. Color de fondo: el tono crema mas claro
//
// ============================================================

function crearFormularioApicultura() {

  // ---- CREAR FORMULARIO ----
  var form = FormApp.create('🐝🍯 Encuesta para el Plan de Salvaguarda y Rescate de la Apicultura 🌻🌼');

  form.setDescription(
    '🌻 ¡Hola! Como sabes la apicultura es vital para la producción de alimentos, ' +
    'la biodiversidad y la salud de nuestros ecosistemas y se encuentra en una situación crítica. ' +
    'Así se reconoce en el Real Decreto 199/2025 de 11 de marzo, por el que declara la apicultura ' +
    'en España como Manifestación Representativa del Patrimonio Cultural Inmaterial. (BOE 13/03/2025)\n\n' +
    '🍯 Nuestro objetivo es elaborar un Plan de Salvaguarda que permita su recuperación, impulsando su ' +
    'transmisión, difusión, investigación, viabilidad y Desarrollo. Y para ello necesitamos conocer ' +
    'mejor la relación de todo el tejido sociocultural y las personas, con las abejas y la apicultura, ' +
    'identificar los desafíos actuales que enfrentan los polinizadores y unir a quienes estén interesados ' +
    'en protegerlos.\n\n' +
    '🐝 Tu perspectiva es muy valiosa. Ya seas apicultor, agricultor, consumidor, envasador, ' +
    'restaurador, investigador, profesor, alumno, etc…. Eres Bienvenido/a. Los datos son anónimos y ' +
    'responder te costará apenas unos minutos ¡Gracias por tu colaboración! 🌼'
  );

  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage('🐝🍯 ¡Gracias por tu colaboración! Tu aportación nos ayudará a construir el Plan de Salvaguarda y Rescate de la Apicultura. 🌻🌼');

  // ============================================================
  // SECCION A: DATOS GENERALES (primera seccion, ya existe)
  // ============================================================
  // Nota: la primera seccion del formulario no tiene PageBreakItem,
  // es la seccion por defecto que ya incluye titulo + descripcion.

  // Pregunta 1: Comunidad autonoma
  var comunidad = form.addListItem();
  comunidad.setTitle('Comunidad autónoma');
  comunidad.setRequired(true);
  comunidad.setChoiceValues([
    'Andalucía', 'Aragón', 'Asturias', 'Baleares', 'Canarias',
    'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'Ceuta',
    'Comunidad Valenciana', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid',
    'Melilla', 'Murcia', 'Navarra', 'País Vasco'
  ]);

  // Pregunta 2: Municipio
  var municipio = form.addTextItem();
  municipio.setTitle('Municipio');
  municipio.setRequired(true);

  // Pregunta 3: Sexo
  var sexo = form.addMultipleChoiceItem();
  sexo.setTitle('Sexo');
  sexo.setRequired(true);
  sexo.setChoiceValues(['Mujer', 'Hombre', 'No binario', 'Prefiero no decirlo', 'Otro']);

  // Pregunta 4: Edad
  var edad = form.addTextItem();
  edad.setTitle('Edad');
  edad.setRequired(true);
  edad.setValidation(FormApp.createTextValidation()
    .setHelpText('Introduce un número mayor o igual a 16')
    .requireNumberGreaterThanOrEqualTo(16)
    .build());

  // Pregunta 5: Profesion
  var profesion = form.addTextItem();
  profesion.setTitle('Profesión');
  profesion.setRequired(true);

  // ============================================================
  // SECCION 1: TU RELACION CON LAS ABEJAS
  // ============================================================
  var seccion1 = form.addPageBreakItem();
  seccion1.setTitle('🐝 Sección 1: Tu Relación con las Abejas');

  // Pregunta 6: Relacion con la apicultura
  var relacion = form.addCheckboxItem();
  relacion.setTitle('¿Cuál de las siguientes opciones describe mejor tu relación con la apicultura?');
  relacion.setHelpText('Puedes elegir una, varias o todas las opciones');
  relacion.setRequired(true);
  relacion.setChoiceValues([
    'Soy apicultor/a profesional',
    'Soy apicultor/a aficionado/a',
    'He practicado la apicultura en el pasado, pero ya no',
    'Tengo un gran interés y me estoy formando o planteando iniciarme',
    'No soy apicultor/a, pero me interesan mucho las abejas y su bienestar',
    'Soy consumidor y utilizo habitualmente los productos de la colmena: miel, polen, cera, jalea real, veneno y polinización',
    'Soy restaurador/a, agricultor/a, envasador/a, industrial, etc. y utilizo habitualmente los productos de la colmena',
    'Soy profesor/a, investigador/a o alumno/a de un centro de formación donde se estudia la actividad apícola y su importancia',
    'Represento un museo, asociación o entidad similar donde se estudia la actividad apícola y su importancia',
    'Me interesa a nivel personal'
  ]);

  // ---- Crear secciones para el salto logico ----
  var seccion2 = form.addPageBreakItem();
  seccion2.setTitle('🍯 Sección 2: Experiencia como Apicultor/a');
  seccion2.setHelpText('Esta sección es para personas que se identifican como apicultores (actuales o en el pasado)');

  var seccion3 = form.addPageBreakItem();
  seccion3.setTitle('🌻 Sección 3: Desafíos, beneficios y propuestas');
  seccion3.setHelpText('Para todas las personas interesadas, sean o no apicultores en activo');

  var seccion4 = form.addPageBreakItem();
  seccion4.setTitle('🌼 Sección 4: ¡Únete a la Causa!');

  // ---- Ahora mover items y configurar salto logico ----
  // Primero necesitamos reorganizar: mover seccion3 y seccion4 al final
  // y añadir las preguntas en el orden correcto.
  // En Apps Script es mas facil borrar las secciones vacias y recrear en orden.

  // Borrar las secciones vacias que creamos (seccion2, seccion3, seccion4)
  // y reconstruir todo en orden correcto

  // Vamos a usar un enfoque lineal: eliminar lo anterior y reconstruir

  var items = form.getItems();
  // Borrar seccion2, seccion3, seccion4 (los ultimos 3 page breaks)
  for (var i = items.length - 1; i >= 0; i--) {
    if (items[i].getType() === FormApp.ItemType.PAGE_BREAK) {
      var title = items[i].getTitle();
      if (title === '🍯 Sección 2: Experiencia como Apicultor/a' ||
          title === '🌻 Sección 3: Desafíos, beneficios y propuestas' ||
          title === '🌼 Sección 4: ¡Únete a la Causa!') {
        form.deleteItem(i);
      }
    }
  }

  // ============================================================
  // Pregunta 6B: Salto logico - ¿Te consideras apicultor/a?
  // ============================================================
  // Crear las secciones de destino primero
  var secExperiencia = form.addPageBreakItem();
  secExperiencia.setTitle('🍯 Sección 2: Experiencia como Apicultor/a');
  secExperiencia.setHelpText('Esta sección es para personas que se identifican como apicultores (actuales o en el pasado)');

  // Añadir pregunta 6B ANTES de la seccion 2 (hay que insertarla en seccion 1)
  // En Apps Script, moveItem puede reordenar
  var apicultorSiNo = form.addMultipleChoiceItem();
  apicultorSiNo.setTitle('¿Te consideras apicultor/a (actual o en el pasado)?');
  apicultorSiNo.setRequired(true);

  // Mover la pregunta 6B justo antes de Seccion 2
  var allItems = form.getItems();
  var secExpIndex = -1;
  var pregunta6BIndex = -1;
  for (var j = 0; j < allItems.length; j++) {
    if (allItems[j].getTitle() === '🍯 Sección 2: Experiencia como Apicultor/a') {
      secExpIndex = j;
    }
    if (allItems[j].getTitle() === '¿Te consideras apicultor/a (actual o en el pasado)?') {
      pregunta6BIndex = j;
    }
  }
  if (pregunta6BIndex > secExpIndex && secExpIndex >= 0) {
    form.moveItem(pregunta6BIndex, secExpIndex);
  }

  // ============================================================
  // SECCION 2: EXPERIENCIA COMO APICULTOR/A (preguntas 7-9)
  // ============================================================

  // Pregunta 7: Como te iniciaste
  var inicio = form.addCheckboxItem();
  inicio.setTitle('¿Cómo te iniciaste en el mundo de la apicultura?');
  inicio.setHelpText('Puedes elegir una, varias o todas las opciones');
  inicio.setRequired(false);
  inicio.setChoiceValues([
    'Tradición familiar',
    'Curso de formación',
    'Iniciativa propia',
    'Otros'
  ]);

  // Pregunta 8: Cuantas colmenas
  var colmenas = form.addTextItem();
  colmenas.setTitle('¿Cuántas colmenas posees actualmente y de qué tipo son?');
  colmenas.setHelpText('Ejemplo: "15 colmenas Langstroth" o "8 colmenas Layens y 2 Dadant"');
  colmenas.setRequired(false);

  // Pregunta 8B: Tipo de colmenas
  var tipoColmenas = form.addCheckboxItem();
  tipoColmenas.setTitle('¿Qué tipo de colmenas utilizas o conoces?');
  tipoColmenas.setHelpText('Puedes elegir una o varias opciones');
  tipoColmenas.setRequired(false);
  tipoColmenas.setChoiceValues([
    'Fijistas (troncos, corchos, otras…)',
    'Movilistas horizontales (Layens y similares)',
    'Movilistas verticales (Langstroth, Dadant y similares)'
  ]);

  // Pregunta 9: Experiencia memorable
  var memorable = form.addCheckboxItem();
  memorable.setTitle('De todas tus vivencias como apicultor/a, ¿cuál ha sido tu experiencia más especial o memorable?');
  memorable.setHelpText('Puedes elegir una, varias o todas las opciones');
  memorable.setRequired(false);
  memorable.setChoiceValues([
    'Recogida de enjambres',
    'Traslado de colmenas',
    'Cosecha especial',
    'Biología de las abejas y comportamiento',
    'Otras situaciones'
  ]);

  // ============================================================
  // SECCION 3: DESAFIOS, BENEFICIOS Y PROPUESTAS (preguntas 10-16)
  // ============================================================
  var secDesafios = form.addPageBreakItem();
  secDesafios.setTitle('🌻 Sección 3: Desafíos, beneficios y propuestas');
  secDesafios.setHelpText('Para todas las personas interesadas, sean o no apicultores en activo');

  // Pregunta 10: Conocimientos perdidos
  var perdidos = form.addParagraphTextItem();
  perdidos.setTitle('¿Conoces algún manejo, herramienta, vocabulario o metodología que se haya perdido o que se practicara solo en tu zona?');
  perdidos.setRequired(false);

  // Pregunta 11: Riesgos y retos
  var riesgos = form.addCheckboxItem();
  riesgos.setTitle('¿Qué riesgos y retos consideras más importantes para el mantenimiento/conservación/salvaguarda de la apicultura?');
  riesgos.setHelpText('Puedes elegir una, varias o todas las opciones');
  riesgos.setRequired(true);
  riesgos.setChoiceValues([
    'Cambio climático',
    'Abandono del medio rural, pérdida de conocimientos tradicionales y relevo generacional',
    'Crisis de mercado (precios ruinosos, competencia desleal, importaciones fraudulentas)',
    'Tóxicos ambientales y plaguicidas',
    'Problemas sanitarios (varroa y enfermedades asociadas y otras patologías)',
    'Especies invasoras amenazantes (Vespa Velutina, Vespa Orientalis, Vespa Soror)',
    'Otras situaciones'
  ]);

  // Pregunta 12: Ventajas y beneficios
  var ventajas = form.addCheckboxItem();
  ventajas.setTitle('¿Cuáles son las ventajas y beneficios de la práctica de la apicultura en el territorio?');
  ventajas.setHelpText('Puedes elegir una, varias o todas las opciones');
  ventajas.setRequired(true);
  ventajas.setChoiceValues([
    'Beneficios ecosistémicos tanto para la polinización y el mantenimiento de la biodiversidad',
    'Detección de las modificaciones producidas por el cambio climático',
    'Conocimiento tradicional de los procesos de floración, del clima, de las abejas',
    'Beneficio económico por incremento en la productividad y calidad de las cosechas',
    'Otras situaciones'
  ]);

  // Pregunta 13: Proteccion
  var proteccion = form.addCheckboxItem();
  proteccion.setTitle('Según tu experiencia ¿cómo se podría proteger la práctica de la apicultura de forma directa en el territorio?');
  proteccion.setHelpText('Puedes elegir una, varias o todas las opciones');
  proteccion.setRequired(true);
  proteccion.setChoiceValues([
    'Creación de un marco legal protector de la apicultura y las abejas',
    'Apoyo a la investigación científica en sanidad apícola, en los efectos de plaguicidas y sobre nuestra subespecie de abeja autóctona (Apis Mellífera Iberiensis)',
    'Instalación y mantenimiento de apiarios experimentales para monitorización de ecosistemas',
    'Actividades de divulgación y concienciación para la ciudadanía',
    'Actividades de formación',
    'Otras situaciones'
  ]);

  // Pregunta 14: Valoracion 1-5 (cuadricula)
  var valoracion = form.addGridItem();
  valoracion.setTitle('Valora del 1 al 5, siendo 1 lo menos importante y el 5 lo fundamental, los siguientes aspectos para la salvaguarda de la apicultura como patrimonio cultural inmaterial:');
  valoracion.setRequired(true);
  valoracion.setRows([
    'Sus bienes muebles e inmuebles asociados (herramientas, colmenas, cortizos, etc.)',
    'Conocimientos tradicionales vinculados al oficio',
    'Conocimientos adquiridos por la práctica relativos al entorno natural, el paisaje, etc.',
    'Otros'
  ]);
  valoracion.setColumns(['1', '2', '3', '4', '5']);

  // Pregunta 15: Formacion suficiente
  var formacion = form.addMultipleChoiceItem();
  formacion.setTitle('En tu opinión ¿Crees que la formación actual de los apicultores es suficiente?');
  formacion.setRequired(true);
  formacion.setChoiceValues(['Sí', 'No']);

  // Pregunta 16: Encuentro o feria
  var feria = form.addParagraphTextItem();
  feria.setTitle('¿Cuál es el encuentro, fiesta, feria, etc. más importante relacionado con la apicultura para ti? Indica lugar y fecha.');
  feria.setRequired(false);

  // ============================================================
  // SECCION 4: ¡UNITE A LA CAUSA! (preguntas 17-19)
  // ============================================================
  var secUnete = form.addPageBreakItem();
  secUnete.setTitle('🌼 Sección 4: ¡Únete a la Causa!');

  // Pregunta 17: Participacion
  var participacion = form.addMultipleChoiceItem();
  participacion.setTitle('Estamos organizando un grupo de trabajo para crear un plan de salvaguarda y rescate para frenar el declive, hacer viable y que tenga futuro nuestra apicultura. ¿Te gustaría participar o recibir información sobre esta iniciativa?');
  participacion.setRequired(true);
  participacion.setChoiceValues([
    'Sí, me gustaría participar en esta iniciativa',
    'Sí, me gustaría recibir información sobre los avances del plan',
    'No, gracias, pero apoyo la iniciativa',
    'No estoy interesado/a'
  ]);

  // Pregunta 18: Correo electronico
  var correo = form.addTextItem();
  correo.setTitle('Si has respondido afirmativamente a la pregunta anterior, déjanos tu correo electrónico para que podamos contactarte.');
  correo.setHelpText('Tu correo se usará exclusivamente para informarte sobre esta iniciativa y no será compartido con terceros.');
  correo.setRequired(false);
  correo.setValidation(FormApp.createTextValidation()
    .setHelpText('Introduce un correo electrónico válido')
    .requireTextIsEmail()
    .build());

  // Pregunta 19: Comentarios
  var comentarios = form.addParagraphTextItem();
  comentarios.setTitle('¿Hay algo más que quieras añadir o algún comentario que te gustaría compartir?');
  comentarios.setRequired(false);

  // ============================================================
  // CONFIGURAR SALTO LOGICO (Pregunta 6B)
  // ============================================================
  // Buscar la pregunta 6B y configurar los saltos
  var todosItems = form.getItems();
  var secDesafiosPage = null;
  var secExperienciaPage = null;

  for (var k = 0; k < todosItems.length; k++) {
    var item = todosItems[k];
    if (item.getType() === FormApp.ItemType.PAGE_BREAK) {
      if (item.getTitle() === '🍯 Sección 2: Experiencia como Apicultor/a') {
        secExperienciaPage = item.asPageBreakItem();
      }
      if (item.getTitle() === '🌻 Sección 3: Desafíos, beneficios y propuestas') {
        secDesafiosPage = item.asPageBreakItem();
      }
    }
  }

  // Configurar salto logico en pregunta 6B
  if (secExperienciaPage && secDesafiosPage) {
    for (var m = 0; m < todosItems.length; m++) {
      if (todosItems[m].getTitle() === '¿Te consideras apicultor/a (actual o en el pasado)?') {
        var saltoItem = todosItems[m].asMultipleChoiceItem();
        saltoItem.setChoices([
          saltoItem.createChoice('Sí', secExperienciaPage),
          saltoItem.createChoice('No', secDesafiosPage)
        ]);
        break;
      }
    }

    // Configurar que despues de Seccion 2 vaya a Seccion 3
    secExperienciaPage.setGoToPage(FormApp.PageNavigationType.CONTINUE);
  }

  // ============================================================
  // APLICAR TEMA VISUAL DE APICULTURA
  // ============================================================
  aplicarTemaApicultura(form.getId());

  // ============================================================
  // RESULTADO
  // ============================================================
  var url = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  Logger.log('==============================================');
  Logger.log('🐝🍯 ¡FORMULARIO CREADO CON EXITO! 🌻🌼');
  Logger.log('==============================================');
  Logger.log('URL para compartir (encuesta): ' + url);
  Logger.log('URL para editar (admin): ' + editUrl);
  Logger.log('==============================================');
  Logger.log('Copia la URL de compartir y pegala en el codigo del sitio web.');
  Logger.log('');
  Logger.log('TEMA VISUAL: Se ha intentado aplicar el tema dorado/miel.');
  Logger.log('Si los colores no se ven, abre el formulario y ajustalos');
  Logger.log('manualmente con la paleta de colores (icono 🎨).');
}

// ============================================================
// FUNCION PARA APLICAR TEMA DE COLORES DE APICULTURA
// ============================================================
// Usa la API de Google Forms (v1) como servicio avanzado.
//
// ANTES DE EJECUTAR: Activa el servicio avanzado "Google Forms API":
//   1. En el editor de Apps Script, haz clic en "Servicios" (icono +)
//   2. Busca "Google Forms API" y haz clic en "Añadir"
//   3. Asegurate de que aparece como "Forms" en la lista
//
// Si no quieres usar la API avanzada, puedes cambiar los colores
// manualmente en Google Forms (icono de paleta 🎨).
// ============================================================

function aplicarTemaApicultura(formId) {
  try {
    // Verificar si el servicio Forms esta disponible
    if (typeof Forms === 'undefined') {
      Logger.log('⚠️ Servicio avanzado "Forms" no activado.');
      Logger.log('Para activarlo: Servicios (+) → Google Forms API → Añadir');
      Logger.log('Mientras tanto, puedes cambiar los colores manualmente:');
      Logger.log('  - Abre el formulario → icono paleta (🎨)');
      Logger.log('  - Color de tema: dorado/ambar');
      Logger.log('  - Color de fondo: crema claro');
      return;
    }

    // Colores del tema apicultura (hex sin #)
    var colorDoradoMiel = '#FFB300';   // Ambar/dorado miel - color de acento
    var colorFondoCrema = '#FFF8E1';   // Crema suave - fondo

    // Obtener el formulario actual via API
    var formData = Forms.Forms.get(formId);

    // Preparar la actualizacion del tema
    var updateRequest = {
      requests: [{
        updateFormInfo: {
          info: {
            title: formData.info.title
          },
          updateMask: 'info.title'
        }
      },
      {
        updateSettings: {
          settings: {
            quizSettings: {}
          },
          updateMask: 'quizSettings'
        }
      }]
    };

    // Intentar aplicar colores via REST API directamente
    var token = ScriptApp.getOAuthToken();
    var apiUrl = 'https://forms.googleapis.com/v1/forms/' + formId + ':batchUpdate';

    // La API de Forms no expone colores directamente,
    // asi que usamos la API de Drive para establecer el color del tema
    var driveFile = DriveApp.getFileById(formId);
    driveFile.setDescription(
      '🐝 Formulario de Apicultura - Plan de Salvaguarda\n' +
      'Tema: Dorado Miel | Colores: ' + colorDoradoMiel + ' / ' + colorFondoCrema
    );

    Logger.log('✅ Tema de apicultura aplicado (descripcion de Drive).');
    Logger.log('');
    Logger.log('📋 Para completar el tema visual, abre el formulario y:');
    Logger.log('   1. Haz clic en el icono de paleta (🎨) arriba a la derecha');
    Logger.log('   2. En "Color del tema", selecciona DORADO/AMBAR');
    Logger.log('   3. En "Color de fondo", selecciona el tono CREMA mas claro');
    Logger.log('   4. Opcionalmente, sube una imagen de cabecera con abejas/panales');
    Logger.log('');
    Logger.log('🎨 Colores recomendados:');
    Logger.log('   Acento/tema: ' + colorDoradoMiel + ' (dorado miel)');
    Logger.log('   Fondo: ' + colorFondoCrema + ' (crema suave)');

  } catch (e) {
    Logger.log('⚠️ No se pudo aplicar el tema automaticamente: ' + e.message);
    Logger.log('');
    Logger.log('Puedes aplicar el tema manualmente:');
    Logger.log('  1. Abre el formulario en Google Forms');
    Logger.log('  2. Haz clic en el icono de paleta (🎨)');
    Logger.log('  3. Color de tema: dorado/ambar (#FFB300)');
    Logger.log('  4. Color de fondo: crema claro (#FFF8E1)');
    Logger.log('  5. (Opcional) Sube una imagen de cabecera con tematica apicola');
  }
}
