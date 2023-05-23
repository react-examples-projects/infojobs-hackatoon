import { Modal, Title, Text, Box, Button, Flex } from "@mantine/core";
import { useState } from "react";

export default function BasicTestModal({ tests = [], ...props }) {
  const [index, setIndex] = useState(0);
  const { question, options } = tests[index];

  const nextQuestion = () => {
    if (index === tests.length - 1) {
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <Modal
      {...props}
      title={<Title order={3}>Prueba básica</Title>}
      size="600px"
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      centered
    >
      <Box>
        <Title order={4}>{question}</Title>

        {options.map((option) => (
          <Box
            mt="1rem"
            mb="0.5rem"
            sx={(theme) => ({
              maxWidth: "100%",
              display: "block",
              width: "100%",
              textAlign: "left",
              backgroundColor: theme.colors.dark[6],
              border: "1px solid" + theme.colors.dark[4],
              borderRadius:"5px"
            })}
            p="1rem"
          >
            <Text>{option}</Text>
          </Box>
        ))}

        <Flex justify="end">
          <Button onClick={nextQuestion}>Siguiente</Button>
        </Flex>
      </Box>
    </Modal>
  );
}
