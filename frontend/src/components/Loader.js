import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation='border' role='status' variant='info' style={{
            marging:'auto'
            
        }} >
            <span className='sr-only'>Loading...</span>
        </Spinner>  
          )
}
export default Loader