const cursos = {
  "Ciclo 1": [
    { nombre: "ACTIVIDADES I" },
    { nombre: "ANTROPOLOGIA RELIGIOSA" },
    { nombre: "CIENCIAS NATURALES Y EDUCACION AMBIENTAL" },
    { nombre: "HISTORIA DE LA CIVILIZACIÓN" },
    { nombre: "INGLÉS I" },
    { nombre: "LENGUA: COMUNICACIÓN ESCRITA ACADÉMICA" },
    { nombre: "MATEMÁTICA BASICA I" }
  ],
  "Ciclo 2": [
    { nombre: "CULTURA PERUANA Y SOCIEDAD", requiere: ["HISTORIA DE LA CIVILIZACIÓN"] },
    { nombre: "EDUCACION MUSICAL" },
    { nombre: "INGLES II", requiere: ["INGLÉS I"] },
    { nombre: "PSICOLOGIA GENERAL", requiere: ["CIENCIAS NATURALES Y EDUCACION AMBIENTAL"] },
    { nombre: "REDACCION ACADEMICA", requiere: ["LENGUA: COMUNICACIÓN ESCRITA ACADÉMICA"] },
    { nombre: "TEOLOGIA I" },
    { nombre: "TEORIA DE LA EDUCACION", requiere: ["ANTROPOLOGIA RELIGIOSA"] }
  ],
  "Ciclo 3": [
    { nombre: "DESARROLLO INFANTIL DE 0 - 6 AÑOS", requiere: ["PSICOLOGIA GENERAL"] },
    { nombre: "DIDACTICA DE LA EXPRESION Y APRECIACION MUSICAL", requiere: ["EDUCACION MUSICAL"] },
    { nombre: "DIDACTICA GENERAL", requiere: ["TEORIA DE LA EDUCACION"] },
    { nombre: "INCLUSION Y ATENCION A LA DIVERSIDAD", requiere: ["PSICOLOGIA GENERAL"] },
    { nombre: "INGLES III", requiere: ["INGLES II"] },
    { nombre: "SEMINARIO DE LITERATURA", requiere: ["REDACCION ACADEMICA"] },
    { nombre: "TEOLOGIA II", requiere: ["TEOLOGIA I"] }
  ],
  // Agrega los ciclos 4 al 10 de forma similar...
};

const aprobados = new Set();

function crearMalla() {
  const container = document.getElementById("malla-container");

  for (const ciclo in cursos) {
    const bloque = document.createElement("div");
    bloque.className = "ciclo";

    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    bloque.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid";

    cursos[ciclo].forEach(curso => {
      const div = document.createElement("div");
      div.className = "curso";
      div.textContent = curso.nombre;

      if (curso.requiere) {
        div.classList.add("locked");
      }

      div.addEventListener("click", () => manejarClickCurso(curso, div));
      curso.elemento = div; // Para actualizar luego
      grid.appendChild(div);
    });

    bloque.appendChild(grid);
    container.appendChild(bloque);
  }

  actualizarCursos();
}

function manejarClickCurso(curso, div) {
  if (div.classList.contains("locked")) return;

  if (!div.classList.contains("approved")) {
    div.classList.add("approved");
    aprobados.add(curso.nombre);
  } else {
    div.classList.remove("approved");
    aprobados.delete(curso.nombre);
  }

  actualizarCursos();
}

function actualizarCursos() {
  for (const ciclo in cursos) {
    cursos[ciclo].forEach(curso => {
      const { requiere, elemento } = curso;
      if (!requiere) {
        elemento.classList.remove("locked");
        return;
      }

      const todosRequisitosCumplidos = requiere.every(req => aprobados.has(req));
      if (todosRequisitosCumplidos) {
        elemento.classList.remove("locked");
      } else {
        if (!elemento.classList.contains("approved")) {
          elemento.classList.add("locked");
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", crearMalla);
