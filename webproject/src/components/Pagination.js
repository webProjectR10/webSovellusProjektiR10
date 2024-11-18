import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, setPage }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setPage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;