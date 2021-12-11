import React from 'react'

const Pagination = (props) => {
    
    let pageNumbers = []

    for(let i=1; i<=Math.ceil(props.totalItems/props.itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination pagination-sm justify-content-end border-0">
                {pageNumbers.map(number => {
                    let classes = 'page-item '
                    if(number === props.currentPage){
                        classes += 'active'
                    }
                    return(
                        <li className={classes}>
                            <a onClick={()=> props.currentPageNumber(number)} href="#" className="page-link">{number}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination
