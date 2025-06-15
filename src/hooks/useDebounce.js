import { useEffect, useState } from "react"

const useDebounce = (query, delay=300)=>{
    const [debounce , setDebounce] = useState()
    useEffect(()=>{
        let timer = setTimeout(()=>{
            setDebounce(query.toLowerCase())
        },delay)

        return ()=>clearTimeout(timer)
    },[query,delay])
    return debounce
}

export default useDebounce