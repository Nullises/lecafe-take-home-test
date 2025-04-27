import { Image } from 'expo-image'
import React from 'react'
import menu from '../images/menu.svg'

const Menu = () => {
    return (
        <Image source={menu} style={{
            width: 20,
            height: 14
        }} />
    )
}

export default Menu