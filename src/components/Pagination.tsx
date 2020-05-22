import * as React from 'react';

interface PaginationProps {
    rowsByPage: number;
    lenght: number;
    paginate: (num: number) => void;
}

export const Pagination = ({ rowsByPage, lenght, paginate}: PaginationProps) => {
    const numPages = [];

    for(let i=1; i<= Math.ceil(lenght / rowsByPage); i++){
        numPages.push(i);
    }

    return(
        <nav>
            <ul className="pagination">
                {
                    numPages.map(number => (
                        <li key={number} className="page-item">
                            <button onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}