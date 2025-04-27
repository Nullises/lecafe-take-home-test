import { Image } from 'expo-image'
import React from 'react'
import filter from '../images/filter.svg'

const Filter = () => {
    return (
        <Image source={filter} style={{
            width: 17,
            height: 21
        }} />
    )
}

export default Filter