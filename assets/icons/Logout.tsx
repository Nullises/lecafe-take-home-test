import { Image } from 'expo-image'
import React from 'react'
import logout from '../images/logout.svg'

const Logout = () => {
    return (
        <Image source={logout} style={{
            width: 17,
            height: 18
        }} />
    )
}

export default Logout