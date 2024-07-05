import React from 'react'
import Navbar from './Navbar'

const Wrapper = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default Wrapper
