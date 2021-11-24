import { Box, Heading, HStack, IconButton, useColorMode } from '@chakra-ui/react'
import { BsMoon, BsSun } from 'react-icons/bs'
import UserInfor from './UserInfor'

export default function Header() {
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <HStack px="20px" h="70px" borderBottom="1px solid" borderBottomColor="gray.300">
            <Box>
                {
                    colorMode === "light" ? <IconButton onClick={toggleColorMode} color="gray" variant="outline" p={2} as={BsSun} /> : <IconButton color="gray" variant="outline" onClick={toggleColorMode} p={2} as={BsMoon} />
                }
            </Box>
            <Box textAlign="center" flex='1'>
                <Heading size="md">
                    Chat Real Time
                </Heading>
            </Box>
            <Box>
                <UserInfor/>
            </Box>
        </HStack>
    )
}
