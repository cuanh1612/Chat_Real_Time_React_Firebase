import {useColorModeValue, VStack, HStack, Text, Avatar, Tag} from '@chakra-ui/react'
import { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import moment from 'moment'

export default function MessageMember({mess}) {
    const {dataUsers} = useContext(AppContext)
    const user = dataUsers.find(e => (e.uid === mess.idUser))
    const timeSeconds = mess.createAt?mess.createAt.seconds:0

    const bgMessage = useColorModeValue('blue.100', null)
    const BoxShadow = useColorModeValue('0px 0px 10px 0px #bee3f8b5', null)

    return (
        <VStack mb={10} spacing={4} alignItems="end">
            <HStack spacing={4}>
                <VStack alignItems="end">
                    <Text>{user && user.displayName}</Text>
                    <Tag color="gray">{ moment.utc(timeSeconds * 1000).format('dd:HH:mm')}</Tag>
                </VStack>
                <Avatar size='md' src={user && user.photoURL} name={user && user.displayName} />


            </HStack>
            <Text boxShadow={BoxShadow} position="relative" bg={bgMessage} _before={{
                content: "''",
                w: "20px",
                h: '20px',
                position: 'absolute',
                top: -1,
                right: 3,
                bg: { bgMessage },
                transform: "rotate(45deg)"
            }} p={5} borderRadius="5px" maxWidth="600px">
                {mess.message}
            </Text>
        </VStack>
    )
}
