import * as React from 'react';

interface PaginationProps {
    rowsByPage: number;
    lenght: number;
    paginate: (num: number) => void;
}

export const Pagination = ({ rowsByPage, lenght, paginate }: PaginationProps) => {
    const [actualPage, setActualPage] = React.useState<number>(1);
    const numPages = [];

    for (let i = 1; i <= Math.ceil(lenght / rowsByPage); i++) {
        numPages.push(i);
    }

    const changePage = (numPage: number) => {
        setActualPage(numPage);
        paginate(numPage);
    }

    return (
        <nav>
            <ul>
                <button onClick={() => changePage(actualPage - 1)} disabled={actualPage === 1}>Previous</button>
                {
                    numPages.map(number => (
                        <button onClick={() => changePage(number)}>
                            {number}
                        </button>
                    ))
                }
                <button onClick={() => changePage(actualPage + 1)} disabled={actualPage >= numPages.length}>Next</button>
            </ul>
        </nav>
    )
}