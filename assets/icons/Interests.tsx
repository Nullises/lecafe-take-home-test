import { Image } from 'expo-image'
import React from 'react'
import interests from '../images/interests.svg'

const Interests = () => {
    return (
        <Image source={interests} style={{
            width: 24,
            height: 24
        }} />
    )
}

export default Interests