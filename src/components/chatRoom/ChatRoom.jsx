
import { Box, Flex, useBoolean, Center } from '@chakra-ui/react'
import { useContext } from 'react'
import HelMet from 'react-helmet'
import { ThemeContext } from '../../context'
import Chat from './Chat'
import SideBar from './Sidebar'
import { useEffect } from 'react'
import ReactLoading from 'react-loading';

export default function ChatRoom() {
    const { UserReducer: { user } } = useContext(ThemeContext)
    const [loading, setLoading] = useBoolean(true)

    useEffect(() => {
        const r = setTimeout(() => {
            if (user.success) {
                setLoading.toggle()
            }
        }, 3000);

        return () => {
            clearTimeout(r)
        }
    }, [user])

    return (
        <>
            <HelMet>
                <title>chat room</title>
            </HelMet>
            {
                loading
                    ? (
                        <Center height="100vh">
                            <ReactLoading type="cubes" color="rgba(66, 153, 225, 0.6)" height={100} width={100} />
                        </Center>
                    )
                    : (
                        <Flex w='100%' h="100vh">
                            <Box w='250px' px="5" borderRightStyle="solid" borderRight="1px solid" borderRightColor="gray.300" >
                                <SideBar />
                            </Box>

                            <Box flex='1' >
                                <Chat />
                            </Box>
                        </Flex>
                    )
            }


        </>
    )
}
