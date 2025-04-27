import { useDrawerStatus } from '@react-navigation/drawer'

const useOpenDrawer = () => {
    const drawerStatus = useDrawerStatus()

    const isDrawerOpen = drawerStatus === 'open'

    return {
        isDrawerOpen
    }
}

export default useOpenDrawer