import { Box, VStack, Text, Image, Center, Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Wallet } from '@gear-js/wallet-connect';
import { useAccount } from "@gear-js/react-hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

document.body.style.backgroundColor = "#01031C"

function Landing() {
  const { wallets } = useAccount();
  const navigate    = useNavigate();

  console.log(wallets)
  useEffect(() => {
    if (wallets) {
      // Si hay billeteras conectadas, redirigir a /home
      navigate("/home");
    }
  }, [wallets, navigate]);

  return (
    <Box
      w="100%"
      h="80vh"
      bg="#01031C"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Nombre de la aplicación */}
      <Center py={2}>
        <Text fontSize="4xl" fontWeight="bold" letterSpacing="1.5px">
          SkillShift
        </Text>
      </Center>

      {/* Explicación sobre la aplicación */}
      <Center flex="1">
        <VStack spacing={6} maxW="600px" px={6} textAlign="center" justifyContent={"center"}>
          <Image src="logo.png" maxW={"50%"}/>
          <Text fontSize="xl">
            Bienvenido a <strong>SkillShift</strong>.<br/>
            Nuestra aplicación te permite gestionar tus proyectos, organizar tus tareas y colaborar con tu equipo de manera eficiente.
          </Text>
          <Text fontSize="lg" color="gray.400">
            ¡Descubre cómo mejorar tu productividad y lleva tus ideas al siguiente nivel!
          </Text>
        </VStack>
      </Center>

      {/* Footer con imágenes de "Powered By" */}
      <Flex
        justify="space-around"
        align="center"
        py={4}
        borderTop="1px solid rgba(255, 255, 255, 0.1)"
      >
      </Flex>
    </Box>
  );
}

export { Landing };