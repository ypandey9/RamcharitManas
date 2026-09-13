export default function Pagination({
  page,
  totalPages,
  setPage
}) {

  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {

    const pages = [];

    // Small number of pages
    if (totalPages <= 7) {

      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    // Always show first page
    pages.push(0);

    // Current page near beginning
    if (page <= 3) {

      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push(4);

      pages.push("ellipsis-right");

      pages.push(totalPages - 1);

      return pages;
    }

    // Current page near end
    if (page >= totalPages - 4) {

      pages.push("ellipsis-left");

      pages.push(totalPages - 5);
      pages.push(totalPages - 4);
      pages.push(totalPages - 3);
      pages.push(totalPages - 2);
      pages.push(totalPages - 1);

      return pages;
    }

    // Current page in the middle
    pages.push("ellipsis-left");

    pages.push(page - 1);
    pages.push(page);
    pages.push(page + 1);

    pages.push("ellipsis-right");

    pages.push(totalPages - 1);

    return pages;
  };


  const pages = getPages();


  return (
    <div className="flex justify-center items-center gap-2 mt-8">

      {/* Previous */}
      <button
        onClick={() =>
          setPage(prev => prev - 1)
        }
        disabled={page === 0}
        aria-label="Previous page"
        title="Previous page"
        className="
          w-10 h-10
          rounded-lg
          bg-orange-100
          text-orange-700
          text-xl
          font-semibold
          flex items-center justify-center
          hover:bg-orange-200
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition
        "
      >
        ‹
      </button>


      {/* Page numbers */}
      {pages.map((item, index) => {

        if (
          item === "ellipsis-left" ||
          item === "ellipsis-right"
        ) {

          return (
            <span
              key={`${item}-${index}`}
              className="
                w-10 h-10
                flex items-center justify-center
                text-gray-500
              "
            >
              …
            </span>
          );

        }


        return (
          <button
            key={item}
            onClick={() => setPage(item)}
            aria-label={`Page ${item + 1}`}
            aria-current={
              page === item
                ? "page"
                : undefined
            }
            className={`
              w-10 h-10
              rounded-lg
              font-medium
              transition

              ${
                page === item
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100"
              }
            `}
          >
            {item + 1}
          </button>
        );

      })}


      {/* Next */}
      <button
        onClick={() =>
          setPage(prev => prev + 1)
        }
        disabled={
          page >= totalPages - 1
        }
        aria-label="Next page"
        title="Next page"
        className="
          w-10 h-10
          rounded-lg
          bg-orange-100
          text-orange-700
          text-xl
          font-semibold
          flex items-center justify-center
          hover:bg-orange-200
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition
        "
      >
        ›
      </button>

    </div>
  );
}