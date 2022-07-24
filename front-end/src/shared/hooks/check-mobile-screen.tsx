import  { useEffect, useState } from "react"

const useCheckMobileScreen = ():Boolean => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const handleWindowSizeChange = (): void => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange)
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange)
        }
    }, [])

    return width <= 768 as Boolean
}

export default useCheckMobileScreen
