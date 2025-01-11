import { useState } from 'react';
import { Button } from '@gear-js/vara-ui';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import { useSailsCalls } from '@/app/hooks';
import { web3FromSource } from '@polkadot/extension-dapp';
import { ElizaOS } from './elizaOS';
import { Box, Text } from "@chakra-ui/react";
import "./examples.css";

function Home () {
    const { account } = useAccount();
    const sails = useSailsCalls();
    const alert = useAlert();

    const [stateEnum, setStateEnum] = useState("");
    const [stateActorId, setStateActorId] = useState("");

    return (
        <Box
            bg="gray.900"
            color="white"
            minHeight="100vh"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            {/* Lado Izquierdo - 20% */}
            <Box w="20%" bg="gray.700" p={4}>
                <Text fontSize="xl" textAlign="center" color="white">
                    Lado Izquierdo
                </Text>
                {/* Aquí puedes poner más contenido para el lado izquierdo */}
            </Box>

            {/* Lado Central - 60% */}
            <Box w="60%" p={4}>
                <Text fontSize="3xl" mb={4} textAlign="center">
                    ElizaOS - Chatbot Interactivo
                </Text>
                <ElizaOS />
            </Box>

            {/* Lado Derecho - 20% */}
            <Box w="20%" bg="gray.700" p={4}>
                <Text fontSize="xl" textAlign="center" color="white">
                    Lado Derecho
                </Text>
                {/* Aquí puedes poner más contenido para el lado derecho */}
            </Box>
        </Box>
    );
}

export { Home };
