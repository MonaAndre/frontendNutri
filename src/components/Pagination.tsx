interface PaginationProps {
    productsPerPage: number;
    totalProducts: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    productsPerPage,
    totalProducts,
    currentPage,
    paginate,
  }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageLimit = 3; // Max number of visible pages
  
    // Determine page range
    let startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);
  
    if (endPage - startPage + 1 < pageLimit) {
      startPage = Math.max(endPage - pageLimit + 1, 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="mt-6 flex justify-center">
        <ul className="flex gap-2">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => paginate(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
          </li>
  
          {/* First Page and Ellipses */}
          {startPage > 1 && (
            <>
              <li>
                <button
                  onClick={() => paginate(1)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  1
                </button>
              </li>
              {startPage > 2 && <li className="px-3 py-1">...</li>}
            </>
          )}
  
          {/* Dynamic Page Numbers */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 border rounded-lg ${
                  currentPage === number ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {number}
              </button>
            </li>
          ))}
  
          {/* Last Page and Ellipses */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <li className="px-3 py-1">...</li>}
              <li>
                <button
                  onClick={() => paginate(totalPages)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}
  
          {/* Next Button */}
          <li>
            <button
              onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  