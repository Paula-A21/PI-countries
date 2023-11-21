import style from "./Paginated.module.css";

const Paginated = ({ countriesPerPage, countries, paginated, currentPage }) => {
  const totalPages = Math.ceil(countries / countriesPerPage);

  // Función para ir a una página específica
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginated(pageNumber);
    }
  };

  // Calculamos las páginas cercanas a la página actual
  const nearbyPages = [];
  const maxNearbyPages = 2; // Cantidad de páginas cercanas a mostrar (2 a la izquierda y 2 a la derecha)

  for (
    let i = currentPage - maxNearbyPages; i <= currentPage + maxNearbyPages; i++
  ) {
    if (i > 0 && i <= totalPages) {
      nearbyPages.push(i);
    }
  }

  // Verificar si hay países para mostrar
  if (countries === 0) {
    return null; // Si no hay países, no renderizar el componente
  }

  return (
    <nav className={style.paginate}>
      {/* Botón para ir a la primera página */}
      <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        First Page
      </button>

      {/* Botón para retroceder una página */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; 
      </button>

      {/* Renderizado de los números de las páginas */}
      {nearbyPages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          className={pageNumber === currentPage ? style.active : ""}
        >
          {pageNumber}
        </button>
      ))}

      {/* Botón para avanzar una página */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt; 
      </button>

      {/* Botón para ir a la última página */}
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last Page
      </button>
    </nav>
  );
};

export default Paginated;
