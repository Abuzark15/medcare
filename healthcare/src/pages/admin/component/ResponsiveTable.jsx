import React from 'react';
import { useTable, usePagination } from 'react-table';
import ReactPaginate from 'react-paginate';
import './ResponsiveTable.css';

const ResponsiveTable = ({ columns, data, searchQuery, onSearchChange }) => {
  // Set up React Table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageIndex
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Handle page change (pagination)
  const handlePageChange = (selected) => {
    setPageIndex(selected.selected);
  };

  return (
    <div className="table-container">
      {/* Heading and Search Bar in the same row */}
      <div className="table-header">
        <h2>Responsive Data Table</h2>
        {/* Search Bar */}
        <lable>Search 
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search..."
          className="search-bar"
        /></lable>
      </div>

      {/* Table */}
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(data.length / pageSize)}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default ResponsiveTable;
