import { Image } from 'expo-image'
import React from 'react'
import bigcheck from '../images/bigcheck.svg'

const BigCheck = () => {
    return (
        <Image source={bigcheck} style={{
            width: 54,
            height: 40
        }} />
    )
}

export default BigCheck