import React, { useState, useEffect } from "react";
import { Box, Input, Button, Text, VStack, HStack } from "@chakra-ui/react";
import OpenAI from "openai";
import { useSailsCalls } from "@/app/hooks";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import SailsCalls from "@/app/SailsCalls";

type ElizaOSProps = {
  showRightMenu: boolean;
  setShowRightMenu: (value: boolean) => void;
};

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

type Professionist = {
  id: string;
  nombre: string;
  especialidad: string;
};

function ElizaOS({showRightMenu,setShowRightMenu}:ElizaOSProps) {
  const sails = useSailsCalls();
  const alert = useAlert();

  const [messages, setMessages] = useState([
    { sender: "ElizaOS", text: "¡Hola! Soy ElizaOS..." },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [professionists, setProfessionists] = useState<string[]>([]);
  const [fullState, setFullState] = useState<any | undefined>(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!sails) {
        alert.error('sails is not ready');
        return;
      }
  
      const response = await sails.query('Service/QueryProfesionistas');
  
      setFullState(response);
    }, 500);

    return () => clearInterval(intervalId);
  }, [sails])

  // Contador de respuestas del bot
  const [botResponseCount, setBotResponseCount] = useState(0);

  // Función para analizar el tema y sugerir profesionistas
  const analyzeTopic = (text: string) => {
    if (text.includes("salud")) {
      return ["Medico", "Psicologo", "Nutriologo"];
    } else if (text.includes("legal")) {
      return ["Abogado", "Notario"];
    } else if (text.includes("educación")) {
      return ["Profesores", "Tutor", "Maestros Idiomas"];
    }
    return ["Psicologo"];
  };

  // Maneja el envío de mensajes
  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: "User", text: input };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const openAIMessages = newMessages.map((m) => ({
        role: m.sender === "User" ? "user" : "assistant",
        content: m.text,
      }));

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: openAIMessages as any,
      });

      const responseContent =
        completion.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta.";

      const newBotMessage = { sender: "ElizaOS", text: responseContent };
      setMessages((prev) => [...prev, newBotMessage]);

      // Incrementa el contador de respuestas del bot
      const updatedResponseCount = botResponseCount + 1;
      setBotResponseCount(updatedResponseCount);

      // Analiza el tema después de la tercera respuesta del bot
      if (updatedResponseCount >= 2) {
        const suggestedProfessionists = analyzeTopic(responseContent);
        setProfessionists(suggestedProfessionists);
      
        // Crear el diccionario
        const professionistDictionary: Record<string, string[]> = {};
      
        suggestedProfessionists.forEach((specialty) => {
          fullState.forEach((item: Professionist) => {
            // Comparar la especialidad del fullState con el sugerido
            if (item.especialidad.toLowerCase() === specialty.toLowerCase()) {
              if (!professionistDictionary[specialty]) {
                professionistDictionary[specialty] = [];
              }
              professionistDictionary[specialty].push(item.id);
            }
          });
        });
      
        console.log("Sugerencias de profesionistas:", suggestedProfessionists);
        console.log("Diccionario generado:", professionistDictionary);
        setShowRightMenu(true);
      }
      
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
      width="80%"
      height="60vh"
      bg="gray.800"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={2}
    >
      {/* Área de mensajes con scroll */}
      <Box
        flex="1"
        width="100%"
        bg="gray.700"
        p={4}
        borderRadius="md"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <VStack spacing={3} align="stretch">
          {messages.map((msg, index) => (
            <Box
              key={index}
              bg={msg.sender === "User" ? "blue.500" : "green.500"}
              color="white"
              p={3}
              borderRadius="md"
              alignSelf={msg.sender === "User" ? "flex-end" : "flex-start"}
              maxWidth="80%"
            >
              <Text>{msg.text}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
  
      {/* Input para enviar mensajes */}
      <HStack width="100%" mt={4} spacing={4}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe algo..."
          bg="white"
          borderRadius="md"
          size="md"
          color="black"
          isDisabled={loading}
          flex="1"
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