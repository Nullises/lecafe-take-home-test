import { Image } from 'expo-image'
import React from 'react'
import settings from '../images/settings.svg'

const Settings = () => {
    return (
        <Image source={settings} style={{
            width: 15,
            height: 18
        }} />
    )
}

export default Settings