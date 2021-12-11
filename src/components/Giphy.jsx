import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Loader from './Loader'
import Pagination from './Pagination'

const Giphy = () => {

    const [giphys, setGiphys] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")

    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = giphys.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        setError(false)
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const results = await axios('https://api.giphy.com/v1/gifs/trending',{
                params: {
                    api_key: '77c0ZsyMXuM9QaeYUc6ro6a1Cwvo9j7Y',
                    limit:1000
                }
            })

            setGiphys(results.data.data)

            } catch(error) {
                setError(true)
                setTimeout(() => setError(false), 4000)
            }
            
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const currentPageNumber = (number) => {
        setCurrentPage(number)
    }

    const renderGiphs = () => {
        if(isLoading) {
            return <Loader />
        }
        return currentItems.map(gif => {
            return (
                <div key={gif.id} className="gif">
                    <img alt="" src={gif.images.fixed_height.url} />
                </div>
            )
        })
    }

    const renderError = () => {
        if(error){
        return (
            <div className="alert alert-warning alert-dismissable fade show" role='alert'>
                Unable to fetch Gifs Try again after sometime.
            </div>
        )
        }
    }

    const handleChange = event => {
        setSearch(event.target.value)
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        setError(false)
        setIsLoading(true)
        try{
            const results = await axios("https://api.giphy.com/v1/gifs/search",{
            params: {
                api_key: '77c0ZsyMXuM9QaeYUc6ro6a1Cwvo9j7Y',
                q: search
            }
        })

        setGiphys(results.data.data)
        setSearch("")

        } catch (e){
            setError(true)
            setTimeout(() => setError(false), 4000)
        }
        
        setIsLoading(false)
    }

    return (
        <div className='m-2'>
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input type="text" className="form-control" placeholder="search" value={search} onChange={handleChange} />
                <button onClick={handleSearch} type="submit" className="btn btn-primary mx-2">Search</button>
            </form>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={giphys.length} currentPageNumber={currentPageNumber} />
        <div className='container gifs'>
            {renderGiphs()}
        </div>
        </div>
    )
}

export default Giphy
