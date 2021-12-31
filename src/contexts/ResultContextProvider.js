import React, { createContext, useContext, useState } from 'react'

const ResultContext = createContext()
const baseURL = 'https://google-search3.p.rapidapi.com/api/v1'

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('Vicky Kaushal')

    const getResults = async (type) => {
        setIsLoading(true)

        const response = await fetch(`${baseURL}${type}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': 'd8f418132bmshee6876e94b64100p1c5882jsn635523eea3da'
            }
        })

        const data = await response.json()

        if(type.includes('/news')) {
            setResults(data.entries)
        } else if(type.includes('/images')) {
            setResults(data.image_results)
        } else {
            setResults(data.results)
        }

        setIsLoading(false)
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)