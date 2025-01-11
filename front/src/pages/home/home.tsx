import { useState } from 'react';
import { Box, Button, IconButton, VStack, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAccount, useAlert } from '@gear-js/react-hooks';
import { useSailsCalls } from '@/app/hooks';
import { web3FromSource } from '@polkadot/extension-dapp';
import { ElizaOS } from './elizaOS';
import "./examples.css";

function Home () {
    const { account } = useAccount();
    const sails = useSailsCalls();
    const alert = useAlert();

    const [stateEnum, setStateEnum] = useState("");
    const [stateActorId, setStateActorId] = useState("");
    const [showLeftMenu, setShowLeftMenu] = useState(false);
    const [showRightMenu, setShowRightMenu] = useState(false);

    return (
    <Box
        bg="gray.900"
        color="white"
        minHeight="90vh"
        display="flex"
        position="relative"
    >
        {/* Menú Izquierdo */}
        {showLeftMenu && (
        <Box
            position="absolute"
            left="0"
            top="0"
            width="20%"
            height="100vh"
            bg="gray.700"
            p={4}
            zIndex="10"
        >
            {/* Botón para cerrar el menú */}
            <Button
            position="absolute"
            top="10px"
            right="10px"
            size="sm"
            colorScheme="red"
            onClick={() => setShowLeftMenu(false)}
            >
            ✕
            </Button>
        
            {/* Contenido del Menú */}
            <Text fontSize="xl" textAlign="center" color="white" mt="40px">
            
            </Text>
        </Box>      
        )}

        {/* Menú Derecho */}
        {showRightMenu && (
        <Box
            position="absolute"
            right="0"
            top="0"
            width="20%"
            height="100vh"
            bg="gray.700"
            p={4}
            zIndex="10"
        >
            <Button
            position="absolute"
            top="10px"
            right="10px"
            size="sm"
            colorScheme="red"
            onClick={() => setShowRightMenu(false)}
            >
            ✕
            </Button>
        
            {/* Contenido del Menú */}
            <Text fontSize="xl" textAlign="center" color="white" mt="40px">
                Profesionistas recomendados
            </Text>
            {/* Contenido adicional del menú derecho */}
        </Box>
        )}

        {/* Botón de Menú Izquierdo */}
        <IconButton
            icon={<HamburgerIcon />}
            aria-label="Abrir Menú Izquierdo"
            position="absolute"
            top="50%" /* Centra verticalmente */
            left="10px" /* Ubicación horizontal */
            transform="translateY(-50%)" /* Ajusta el centro vertical */
            onClick={() => setShowLeftMenu(!showLeftMenu)}
            bg="gray.700"
            color="white"
            _hover={{ bg: "teal.500" }}
            zIndex="100"
        />

        {/* Contenedor del Chatbox */}
        <Box
        flex="1"
        p={4}
        ml={showLeftMenu ? "20%" : "0"}
        mr={showRightMenu ? "20%" : "0"}
        transition="margin 0.3s ease"
        display="flex"
        justifyContent="center"
        alignItems="center"
        >
        <VStack spacing={4} w="100%" h="80vh">
            <Text fontSize="3xl" textAlign="center">
            ElizaOS - Chatbot Interactivo
            </Text>
            <ElizaOS 
                showRightMenu = {showRightMenu}
                setShowRightMenu={setShowRightMenu}
            />
        </VStack>
        </Box>
    </Box>
    );
}

export { Home };
