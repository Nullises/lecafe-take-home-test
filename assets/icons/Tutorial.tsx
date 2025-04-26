import { Image } from 'expo-image'
import React from 'react'
import tutorial from '../images/tutorial.svg'

const Tutorial = () => {
    return (
        <Image source={tutorial} style={{
            width: 20,
            height: 16
        }} />
    )
}

export default Tutorial