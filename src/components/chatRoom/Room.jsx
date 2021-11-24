import PropTypes from 'prop-types'
import { Text, Tooltip } from '@chakra-ui/react'

export default function Room({ nameRoom, discription, selectRoom, id }) {
    return (
        <Tooltip label={discription?discription:""} hasArrow placement="bottom-end">
            <Text w="100%" _hover={{
                bg: "teal.300",
                transition: "0.3s",
                cursor: "pointer",
                color: "white",
                boxShadow: "0px 0px 15px 0px #78ffe760"
            }} borderRadius="5px" pl='15px' lineHeight="48px" h='48px'
            onClick={() => selectRoom(id)}
            >{nameRoom}</Text>
        </Tooltip>
    )
}

Room.propTypes = {
    nameRoom: PropTypes.string.isRequired,
    description: PropTypes.string,
    selectRoom: PropTypes.func,
    id: PropTypes.string
}






