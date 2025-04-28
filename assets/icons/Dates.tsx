import { Image } from 'expo-image'
import React from 'react'
import dates from '../images/dates.svg'

const Dates = () => {
    return (
        <Image source={dates} style={{
            width: 24,
            height: 32
        }} />
    )
}

export default Dates