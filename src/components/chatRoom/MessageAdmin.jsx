import {HStack, VStack, Text, useColorModeValue, Tag, Avatar} from '@chakra-ui/react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import {formatDistance} from 'date-fns'

export default function MessageAdmin({mess}) {
    const {dataUsers} = useContext(AppContext)
    const user = dataUsers.find(e => (e.uid === mess.idUser))

    const timeSecond = mess.createAt ? mess.createAt.seconds * 1000 : 0

    const bgMessageAdmin = useColorModeValue('teal.100', null)
    const BoxShadowAdmin = useColorModeValue('0px 0px 10px 0px #b2f5eaab', null)

    return (
        <VStack mb={10} spacing={4} alignItems="start">
            <HStack spacing={4}>
                <Avatar size='md' src={user && user.photoURL} name={user && user.displayName} />
                <VStack alignItems="start">
                    <Text>{user && user.displayName}</Text>
                    <Tag color="gray">{formatDistance(Date.now(), timeSecond, {addSuffix: true})}</Tag>
                </VStack>

            </HStack>
            <Text boxShadow={BoxShadowAdmin} position="relative" bg={bgMessageAdmin} _before={{
                content: "''",
                w: "20px",
                h: '20px',
                position: 'absolute',
                top: -1,
                left: 3,
                bg: `${ bgMessageAdmin }`,
                transform: "rotate(45deg)"
            }} p={5} borderRadius="5px" maxWidth="600px">
                {
                    mess.message
                }
            </Text>
        </VStack>

    )
}
