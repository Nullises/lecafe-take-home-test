import React from 'react'
import matchIcon from '../images/match-icon.svg'
import { Image } from 'expo-image'

const MatchIcon = () => {
    return (
        <Image source={matchIcon} style={{
            width: 58,
            height: 58
        }} />
    )
}

export default MatchIcon