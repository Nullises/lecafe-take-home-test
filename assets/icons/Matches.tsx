import React from 'react'
import matches from '../images/matches.svg'
import { Image } from 'expo-image'

const Matches = () => {
    return (
        <Image source={matches} style={{
            width: 16,
            height: 19
        }} />
    )
}

export default Matches