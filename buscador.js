function buscarNoticias() {
  // Obtener los valores de los campos de entrada
  const titulo = document.getElementById('titulo').value.toLowerCase();
  const autor = document.getElementById('autor').value.toLowerCase();
  const genero = document.getElementById('genero').value.toLowerCase();
  const dia = document.getElementById('dia').value;
  const mes = document.getElementById('mes').value;
  const anio = document.getElementById('anio').value;

  // Recorrer los archivos HTML en la carpeta "noticias"
  const noticias = document.querySelectorAll('a[href^="noticias/"]');
  const coincidencias = [];

  noticias.forEach((noticia) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
        const metatags = htmlDoc.getElementsByTagName('meta');

        // Verificar si los metatags coinciden con los criterios especificados
        let coincide = true;
        metatags.forEach((tag) => {
          const nombre = tag.getAttribute('name');
          const contenido = tag.getAttribute('content').toLowerCase();

          switch (nombre) {
            case 'title':
              if (titulo && !contenido.includes(titulo)) {
                coincide = false;
              }
              break;
            case 'author':
              if (autor && !contenido.includes(autor)) {
                coincide = false;
              }
              break;
            case 'genre':
              if (genero && !contenido.includes(genero)) {
                coincide = false;
              }
              break;
            case 'lola':
    if (contenido.includes('día') && dia && !contenido.includes(dia)) {
        coincide = false;
    }
    if (contenido.includes('mes') && mes && !contenido.includes(mes)) {
        coincide = false;
    }
    if (contenido.includes('año') && anio && !contenido.includes(anio)) {
        coincide = false;
    }
              break;
            default:
              break;
          }
        });

        // Agregar la noticia a la lista de coincidencias
        if (coincide) {
          coincidencias.push(noticia.href);
        }
      }
    };

    xhr.open('GET', noticia.href);
    xhr.send();
  });

  // Mostrar la lista de accesos directos a las noticias que coinciden
  const lista = document.createElement('ul');
  coincidencias.forEach((noticia) => {
    const item = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = noticia;
    enlace.textContent = noticia;
    item.appendChild(enlace);
    lista.appendChild(item);
  });

  const resultados = document.getElementById('resultados');
  resultados.innerHTML = '';
  if (coincidencias.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No se encontraron noticias que coincidan con los criterios especificados.';
    resultados.appendChild(mensaje);
  } else {
    resultados.appendChild(lista);
  }
}

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  buscarNoticias();
});
