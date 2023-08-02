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
    let i = currentPage - maxNearbyPages;
    i <= currentPage + maxNearbyPages;
    i++
  ) {
    if (i > 0 && i <= totalPages) {
      // le resto 2 para que lo primero que muestr es 2 páginas antes
      nearbyPages.push(i); //le sumo 2 si i es menor o igual a la página actual + 2, o sea, para mostrar las dos de la derecha
    }
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

      {nearbyPages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          // Agregar la clase "active" si la página es la actual
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
        &gt; {/*esto representa al símbolo >, para ir a la siguiente página*/}
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
