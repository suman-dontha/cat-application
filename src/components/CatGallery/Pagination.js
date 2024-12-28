export const Pagination = ({ page, pageCount, onPageChange }) => {
    return (
        <div className="flex items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded ${page === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'}`}
            >
                Previous
            </button>

            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`px-4 py-2 text-sm font-medium rounded ${pageNumber === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === pageCount}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded ${page === pageCount
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-600'}`}
            >
                Next
            </button>
        </div>
    );
};