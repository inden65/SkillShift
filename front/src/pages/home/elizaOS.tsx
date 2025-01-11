import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, HStack } from "@chakra-ui/react";
import OpenAI from "openai";

// Aquí puedes directamente poner tu clave o bien usar process.env.REACT_APP_OPENAI_API_KEY
// para un entorno local de pruebas:
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

function ElizaOS() {
  // Historial de mensajes (sin tipado estricto)
  const [messages, setMessages] = useState([
    { sender: "ElizaOS", text: "¡Hola! Soy ElizaOS..." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Maneja el envío de un mensaje
  const handleSend = async () => {
    if (!input.trim()) return;

    // Agrega el mensaje del usuario al historial
    const newUserMessage = { sender: "User", text: input };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Prepara mensajes en el formato que requiere OpenAI (role & content)
      const openAIMessages = newMessages.map((m) => ({
        role: m.sender === "User" ? "user" : "assistant",
        content: m.text,
      }));

      // Llama a la API de OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages as any,
      });      

      // Extrae la respuesta
      const responseContent =
        completion.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta.";

      // Agrega la respuesta del bot al historial
      const newBotMessage = { sender: "ElizaOS", text: responseContent };
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error al obtener respuesta:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ElizaOS", text: "Lo siento, ocurrió un error al procesar tu solicitud." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={5}
      p={4}
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      h="500px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Área de mensajes con scroll */}
      <Box flex="1" overflowY="auto" maxH="400px" p={2} borderRadius="md" bg="gray.700">
        <VStack spacing={3} align="stretch">
          {messages.map((msg, index) => (
            <Box
              key={index}
              bg={msg.sender === "User" ? "blue.500" : "green.500"}
              color="white"
              p={3}
              borderRadius="md"
              alignSelf={msg.sender === "User" ? "flex-end" : "flex-start"}
              w="fit-content"
            >
              <Text>{msg.text}</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Input para escribir nuevo mensaje */}
      <HStack mt={4} spacing={4}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe algo..."
          bg="white"
          borderRadius="md"
          size="md"
          color="black"
          isDisabled={loading}
        />
        <Button
          colorScheme="teal"
          onClick={handleSend}
          size="md"
          isLoading={loading}
          loadingText="Pensando..."
        >
          Enviar
        </Button>
      </HStack>
    </Box>
  );
}

export { ElizaOS };