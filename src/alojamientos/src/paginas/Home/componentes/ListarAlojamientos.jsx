import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ListarAlojamientos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPencilAlt, faCheckCircle, faTimesCircle, faMapMarkerAlt, faMoneyBillAlt, faBed, faBath, faFilter } from '@fortawesome/free-solid-svg-icons';

const ListarAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [filteredAlojamientos, setFilteredAlojamientos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [alojamientosPerPage] = useState(5);
  const [precioMinimo, setPrecioMinimo] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(Number.MAX_SAFE_INTEGER);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [cantidadHabitaciones, setCantidadHabitaciones] = useState('');
  const [tiposAlojamiento, setTiposAlojamiento] = useState([]);
  const [tipoAlojamientoSeleccionado, setTipoAlojamientoSeleccionado] = useState('');
  const [imagenesAlojamientos, setImagenesAlojamientos] = useState({});

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await fetch('http://localhost:3001/alojamiento/getAlojamientos');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de alojamientos');
        }
        const data = await response.json();
        setAlojamientos(data);
        setFilteredAlojamientos(data);

        // Obtener todas las imágenes disponibles
        const responseImagenes = await fetch('http://localhost:3001/imagen/getAllImagenes');
        if (!responseImagenes.ok) {
          throw new Error('Error al obtener las imágenes');
        }
        const dataImagenes = await responseImagenes.json();

        // Organizar imágenes por idAlojamiento
        const imagenesPorAlojamiento = {};
        dataImagenes.forEach(imagen => {
          if (!imagenesPorAlojamiento[imagen.idAlojamiento]) {
            imagenesPorAlojamiento[imagen.idAlojamiento] = [];
          }
          imagenesPorAlojamiento[imagen.idAlojamiento].push(imagen);
        });
        setImagenesAlojamientos(imagenesPorAlojamiento);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || 'Error al obtener la lista de alojamientos e imágenes');
      } finally {
        setLoading(false);
      }
    };

    const fetchTiposAlojamiento = async () => {
      try {
        const response = await fetch('http://localhost:3001/tiposAlojamiento/getTiposAlojamiento');
        if (!response.ok) {
          throw new Error('Error al obtener los tipos de alojamiento');
        }
        const data = await response.json();
        setTiposAlojamiento(data);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || 'Error al obtener los tipos de alojamiento');
      }
    };

    fetchAlojamientos();
    fetchTiposAlojamiento();
  }, []);

  const precioMinimoOptions = [0, 50, 100, 200, 500];
  const precioMaximoOptions = [100, 200, 300, 400, 500, 1000, 2000, Number.MAX_SAFE_INTEGER];
  const cantidadHabitacionesOptions = ['', 1, 2, 3, 4, 5];

  const filteredData = alojamientos.filter(alojamiento =>
    alojamiento.PrecioPorDia >= precioMinimo &&
    alojamiento.PrecioPorDia <= precioMaximo &&
    (estadoFiltro === '' || alojamiento.Estado.toLowerCase() === estadoFiltro.toLowerCase()) &&
    (cantidadHabitaciones === '' || alojamiento.CantidadDormitorios >= cantidadHabitaciones) &&
    (tipoAlojamientoSeleccionado === '' || alojamiento.TipoAlojamiento.toString() === tipoAlojamientoSeleccionado)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowDetails = (alojamiento) => {
    console.log('Mostrar detalles de:', alojamiento);
  };

  const indexOfLastAlojamiento = currentPage * alojamientosPerPage;
  const indexOfFirstAlojamiento = indexOfLastAlojamiento - alojamientosPerPage;
  const currentAlojamientos = filteredData.slice(indexOfFirstAlojamiento, indexOfLastAlojamiento);

  if (loading) {
    return <p className="loading-message">Cargando alojamientos...</p>;
  }

  return (
    <div className="buscar-alojamiento">
      <ToastContainer />
      <div className="search-and-list-container">
        <div className="search-form">
          <h2><FontAwesomeIcon icon={faFilter} /> Filtrado de Alojamientos</h2>
          <div className="price-filter">
            <label><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio mínimo:</label>
            <select value={precioMinimo} onChange={(e) => setPrecioMinimo(parseInt(e.target.value))}>
              {precioMinimoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <label><FontAwesomeIcon icon={faMoneyBillAlt} /> Precio máximo:</label>
            <select value={precioMaximo} onChange={(e) => setPrecioMaximo(parseInt(e.target.value))}>
              {precioMaximoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="estado-filter">
            <label><FontAwesomeIcon icon={faCheckCircle} /> Estado:</label>
            <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
              <option value="">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Reservado">Reservado</option>
            </select>
          </div>
          <div className="habitaciones-filter">
            <label><FontAwesomeIcon icon={faBed} /> Cantidad de Habitaciones mínima:</label>
            <select value={cantidadHabitaciones} onChange={(e) => setCantidadHabitaciones(parseInt(e.target.value))}>
              {cantidadHabitacionesOptions.map(option => (
                <option key={option} value={option}>{option === '' ? 'Cualquiera' : option}</option>
              ))}
            </select>
          </div>
          <div className="tipo-alojamiento-filter">
            <label><FontAwesomeIcon icon={faHome} /> Tipo de Alojamiento:</label>
            <select value={tipoAlojamientoSeleccionado} onChange={(e) => setTipoAlojamientoSeleccionado(e.target.value)}>
              <option value="">Todos</option>
              {tiposAlojamiento.map(tipo => (
                <option key={tipo.idTipoAlojamiento} value={tipo.idTipoAlojamiento}>{tipo.Descripcion}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="alojamientos-list-container">
          <div className="alojamientos-grid">
            {currentAlojamientos.length > 0 ? (
              currentAlojamientos.map((alojamiento) => (
                <div className="alojamiento-card" key={alojamiento.idAlojamiento} onClick={() => handleShowDetails(alojamiento)}>
                  <h3 className='text-id' ><FontAwesomeIcon icon={faHome} /> {alojamiento.Titulo}</h3>
                  <p><FontAwesomeIcon icon={faPencilAlt} /> <span className="text-id">Descripción:</span> {alojamiento.Descripcion}</p>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="text-id">Ubicacion: </span>{alojamiento.Longitud}, {alojamiento.Latitud}</p>
                  <p><FontAwesomeIcon icon={faMoneyBillAlt} /> <span className="text-id">Precio por Día: </span> {alojamiento.PrecioPorDia}</p>
                  <p><FontAwesomeIcon icon={faBed} /> <span className="text-id">Cantidad de Dormitorios: </span> {alojamiento.CantidadDormitorios}</p>
                  <p><FontAwesomeIcon icon={faBath} /> <span className="text-id">Cantidad de Baños:</span> {alojamiento.CantidadBanios}</p>
                  <p><FontAwesomeIcon icon={alojamiento.Estado === 'Disponible' ? faCheckCircle : faTimesCircle} /> <span className="text-id"> Estado: </span> {alojamiento.Estado}</p>

                  {/* Mostrar imágenes */}
                  {imagenesAlojamientos[alojamiento.idAlojamiento] && (
                    <div className="imagenes-alojamiento">
                      {imagenesAlojamientos[alojamiento.idAlojamiento].map((imagen) => (
                        <img key={imagen.idImagen} src={imagen.RutaArchivo} alt={`Imagen ${imagen.idImagen}`} />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No se encontraron alojamientos que coincidan con los filtros seleccionados.</p>
            )}
          </div>

          {filteredData.length > alojamientosPerPage && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastAlojamiento >= filteredData.length}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListarAlojamientos;
