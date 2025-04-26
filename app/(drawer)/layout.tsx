import React from 'react'
import { Drawer } from "expo-router/drawer"
import CustomDrawer from '@/components/CustomDrawer'
import { Colors } from '@/constants/Colors'
import Lecafe from '@/assets/icons/Lecafe'
import Messages from '@/assets/icons/Messages'
import Matches from '@/assets/icons/Matches'
import Profile from '@/assets/icons/Profile'
import Tutorial from '@/assets/icons/Tutorial'
import Settings from '@/assets/icons/Settings'

const DrawerLayout = () => {
    return (
        <Drawer
            drawerContent={CustomDrawer}
            screenOptions={{
                headerShown: false,
                overlayColor: "rgba(0, 0, 0, 0)",
                drawerActiveTintColor: "indigo",
                drawerActiveBackgroundColor: Colors.pink,
                drawerStyle: {
                    backgroundColor: Colors.pink,
                    width: "42%",
                    height: "100%"
                },
                drawerContentStyle: {
                    backgroundColor: Colors.pink
                },
                drawerContentContainerStyle: {
                    backgroundColor: Colors.pink
                },
                // sceneStyle: {
                //     backgroundColor: Colors.pink
                // }
            }}
        >

            <Drawer.Screen
                name="(drawer)/dashboard/index"
                options={{
                    drawerLabel: "Lecafé",
                    title: "Lecafé",
                    drawerLabelStyle: {
                        color: Colors.white,
                        fontFamily: "MavenPro-Bold",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: 19,
                        left: 5
                    },
                    drawerIcon: () => (
                        <Lecafe />
                    ),
                }}
            />
            <Drawer.Screen
                name="(drawer)/messages/index"
                options={{
                    drawerLabel: "Mensajes",
                    title: "Mensajes",
                    drawerLabelStyle: {
                        color: Colors.white,
                        fontFamily: "MavenPro-Bold",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: 19,
                        left: 5
                    },
                    drawerIcon: () => (
                        <Messages />
                    )
                }}
            />
            <Drawer.Screen
                name="(drawer)/matches/index"
                options={{
                    drawerLabel: "Matches",
                    title: "Matches",
                    drawerLabelStyle: {
                        color: Colors.white,
                        fontFamily: "MavenPro-Bold",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: 19,
                        left: 5
                    },
                    drawerIcon: () => (
                        <Matches />
                    )
                }}
            />
            <Drawer.Screen
                name="(drawer)/profile/index"
                options={{
                    drawerLabel: "Mi Perfil",
                    title: "Mi Perfil",
                    drawerLabelStyle: {
                        color: Colors.white,
                        fontFamily: "MavenPro-Bold",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: 19,
                        left: 5
                    },
                    drawerIcon: () => (
                        <Profile />
                    )
                }}
            />
            <Drawer.Screen
                name="(drawer)/tutorial/index"
                options={{
                    drawerLabel: "Tutorial",
                    title: "Tutorial",
                    drawerLabelStyle: {
                        color: Colors.white,
                        fontFamily: "MavenPro-Bold",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: 19,
                        left: 5
                    },
                    drawerIcon: () => (
                        <Tutorial />
                    )
                }}
            />
            <Drawer.Screen
                name="(drawer)/settings/index"
                options={{
                    drawerLabel: "Ajustes",
                    title: "Settings",
                    drawerLabelStyle: {
                        color: Colors.white,
                        fontFamily: "MavenPro-Bold",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: 19,
                        left: 5
                    },
                    drawerIcon: () => (
                        <Settings />
                    )
                }}
            />
            <Drawer.Screen
                name="(drawer)/layout"
                options={{
                    drawerLabel: "",
                    title: "",

                }}
            />
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "",
                    title: "",
                }}
            />
        </Drawer>
    )
}

export default DrawerLayout