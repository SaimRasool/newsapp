import React from 'react'
import loadder from './loader.gif'
const Spinner =()=> {
 
    return (
      <div className='text-center'>
        <img className='my-3' src={loadder} alt="loading"/>
      </div>
    )
 
}

export default Spinner
