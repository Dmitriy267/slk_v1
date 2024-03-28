import './Pagination.sass';

export const Pagination = ({ totalData, currentPage, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalData) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (newPage) => {
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Максимальное количество видимых страниц

    if (totalData <= maxVisiblePages) {
      // Если общее количество страниц меньше или равно максимальному количеству видимых страниц, отобразите все страницы
      for (let i = 1; i <= totalData; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Если общее количество страниц больше максимального количества видимых страниц
      const middlePage = Math.ceil(maxVisiblePages / 2); // Середина видимых страниц
      const startPage = Math.max(currentPage - middlePage + 1, 1); // Начальная страница
      const endPage = Math.min(startPage + maxVisiblePages - 1, totalData); // Конечная страница

      if (startPage > 1) {
        // Если начальная страница больше 1, добавьте многоточие в начало
        pageNumbers.push(1, '...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalData) {
        // Если конечная страница меньше общего количества страниц, добавьте многоточие в конец
        pageNumbers.push('...', totalData);
      }
    }

    return pageNumbers.map((pageNumber, index) => (
      <button
        key={index}
        onClick={() => handlePageClick(pageNumber)}
        disabled={typeof pageNumber === 'string'}
        className={`pagination__page ${currentPage === pageNumber ? 'pagination__page_active' : ''}`}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} className="pagination__page-prev" />

      {renderPageNumbers()}

      <button onClick={handleNextPage} className="pagination__page-next" />
    </div>
  );
};
