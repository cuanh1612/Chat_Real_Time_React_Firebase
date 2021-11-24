import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, VStack
} from "@chakra-ui/react";
import React, { useContext as UseContext } from "react";
import { AppContext } from "../../context/AppProvider";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import SearchRorm from "./SearchRorm";



export default function sideBar() {
    const {rooms: data, selectRoom: {setSelectRoom}} = UseContext(AppContext)

    const selectRoom = (id) => {
        setSelectRoom(id)
    }

    return (
        <>
            <Accordion allowToggle mt={5}>
                <AccordionItem isFocusable borderWidth="0">
                    <AccordionButton as={Button} colorScheme="blue" _hover={{
                        bg: "blue.600"
                    }}>
                        <Box textAlign="left" flex='1'>
                            All rooms
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel p='0'>
                        <VStack mt='5'>
                            {
                                data?.map(room => (
                                    <Room key={room.id} nameRoom={room.name} selectRoom={selectRoom} id={room.id} discription={room.discription}/>
                                ))
                            }
                        </VStack>

                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            <CreateRoom />
        </>
    );
}
