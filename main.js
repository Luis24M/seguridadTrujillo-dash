function loadUsuarios() {
  const usuariosTableBody = document.getElementById('usuariosTableBody');
  fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      usuariosTableBody.innerHTML = data.map(usuario => `
          <tr>
              <td class="border px-4 py-2">${usuario.nombre}</td>
              <td class="border px-4 py-2">${usuario.email}</td>
              <td class="border px-4 py-2">${usuario.telefono}</td>
              <td class="border px-4 py-2">
                  <button class="bg-blue-500 text-white px-2 py-1" onclick="editarUsuario('${usuario.uid}')">Editar</button>
                  <button class="bg-red-500 text-white px-2 py-1" onclick="eliminarUsuario('${usuario.uid}')">Eliminar</button>
              </td>
          </tr>
      `).join('');
  })
  .catch(error => console.error('Error al cargar los usuarios:', error));
}

function loadIncidentes() {
  const incidentesTableBody = document.getElementById('incidentesTableBody');
  fetch('http://localhost:3000/incidentes', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      // Generar la tabla
      incidentesTableBody.innerHTML = data.map(incidente => `
          <tr>
              <td class="border px-4 py-2">${incidente.tipo_incidente}</td>
              <td class="border px-4 py-2">${incidente.descripcion}</td>
              <td class="border px-4 py-2">${incidente.fecha}</td>
              <td class="border px-4 py-2">${incidente.hora}</td>
              <td class="border px-4 py-2">${incidente.nombre_usuario}</td>
              <td class="border px-4 py-2">${incidente.telefono_usuario}</td>
              <td class="border px-4 py-2">
                  <button class="bg-blue-500 text-white px-2 py-1" onclick="editarIncidente('${incidente.id}')">Editar</button>
                  <button class="bg-red-500 text-white px-2 py-1" onclick="eliminarIncidente('${incidente.id}')">Eliminar</button>
              </td>
          </tr>
      `).join('');

      // Preparar los datos para el gráfico
      const incidentesPorTipo = data.reduce((acc, incidente) => {
          acc[incidente.tipo_incidente] = (acc[incidente.tipo_incidente] || 0) + 1;
          return acc;
      }, {});

      // Crear el gráfico
      const ctx = document.getElementById('incidentesChart').getContext('2d');
      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: Object.keys(incidentesPorTipo),
              datasets: [{
                  label: 'Número de Incidentes',
                  data: Object.values(incidentesPorTipo),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  })
  .catch(error => console.error('Error al cargar los incidentes:', error));
}



function loadPuntosSeguros() {
  const puntosSegurosTableBody = document.getElementById('puntosSegurosTableBody');
  fetch('http://localhost:3000/puntos-seguros', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      puntosSegurosTableBody.innerHTML = data.map(punto => `
          <tr>
              <td class="border px-4 py-2">${punto.nombre}</td>
              <td class="border px-4 py-2">${punto.tipo_punto_seguro}</td>
              <td class="border px-4 py-2">${punto.latitud}</td>
              <td class="border px-4 py-2">${punto.longitud}</td>
              <td class="border px-4 py-2">
                  <button class="bg-blue-500 text-white px-2 py-1" onclick="editarPuntoSeguro('${punto.id}')">Editar</button>
                  <button class="bg-red-500 text-white px-2 py-1" onclick="eliminarPuntoSeguro('${punto.id}')">Eliminar</button>
              </td>
          </tr>
      `).join('');
  })
  .catch(error => console.error('Error al cargar los puntos seguros:', error));
}

function loadTiposPuntosSeguros() {
  const tiposPuntosSegurosTableBody = document.getElementById('tiposPuntosSegurosTableBody');
  fetch('http://localhost:3000/tipos-puntos-seguros', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      tiposPuntosSegurosTableBody.innerHTML = data.map(tipo => `
          <tr>
              <td class="border px-4 py-2">${tipo.nombre}</td>
              <td class="border px-4 py-2">
                  <button class="bg-blue-500 text-white px-2 py-1" onclick="editarTipoPuntoSeguro('${tipo.id}')">Editar</button>
                  <button class="bg-red-500 text-white px-2 py-1" onclick="eliminarTipoPuntoSeguro('${tipo.id}')">Eliminar</button>
              </td>
          </tr>
      `).join('');
  })
  .catch(error => console.error('Error al cargar los tipos de puntos seguros:', error));
}

// Ejemplo de funciones de edición y eliminación
function editarUsuario(uid) {
  // Aquí puedes implementar la lógica para editar un usuario
  console.log("Editar usuario con UID:", uid);
  // Podrías mostrar un formulario modal para la edición
}

function eliminarUsuario(uid) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      fetch(`http://localhost:3000/usuarios/${uid}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              loadUsuarios(); // Recargar la tabla después de eliminar
          } else {
              console.error('Error al eliminar el usuario');
          }
      })
      .catch(error => console.error('Error:', error));
  }
}

function editarIncidente(id) {
  // Implementa la lógica para editar un incidente
  console.log("Editar incidente con ID:", id);
}

function eliminarIncidente(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este incidente?")) {
      fetch(`http://localhost:3000/incidentes/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              loadIncidentes(); // Recargar la tabla después de eliminar
          } else {
              console.error('Error al eliminar el incidente');
          }
      })
      .catch(error => console.error('Error:', error));
  }
}

function editarPuntoSeguro(id) {
  // Implementa la lógica para editar un punto seguro
  console.log("Editar punto seguro con ID:", id);
}

function eliminarPuntoSeguro(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este punto seguro?")) {
      fetch(`http://localhost:3000/puntos-seguros/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (response.ok) {
              loadPuntosSeguros(); // Recargar la tabla después de eliminar
          } else {
              console.error('Error al eliminar el punto seguro');
          }
      })
      .catch(error => console.error('Error:', error));
  }
}

function mostrarSeccion(seccion) {
  // Ocultar todas las secciones
  const secciones = ['usuarios', 'incidentes', 'puntos-seguros'];
  secciones.forEach(sec => document.getElementById(sec).classList.add('hidden'));

  // Mostrar la sección seleccionada
  document.getElementById(seccion).classList.remove('hidden');

  // Cargar datos según la sección seleccionada
  switch (seccion) {
      case 'usuarios':
          loadUsuarios();
          break;
      case 'incidentes':
          loadIncidentes();
          break;
      case 'tipos-incidentes':
          loadTiposIncidentes();
          break;
      case 'puntos-seguros':
          loadPuntosSeguros();
          break;
      case 'tipos-puntos-seguros':
          loadTiposPuntosSeguros();
          break;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Cargar la primera sección (usuarios por defecto)
  mostrarSeccion('usuarios');
});
