import { Modal, Title, Text, Box, Button, Flex } from "@mantine/core";
import { useState } from "react";

export default function BasicTestModal({ tests = [], ...props }) {
  const [index, setIndex] = useState(0);
  const { question, options } = tests[index];
  const [selectedOption, setSelectedOption] = useState(null);
  const nextQuestion = () => {
    if (index === tests.length - 1) {
    } else {
      setSelectedOption(null);
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <Modal
      {...props}
      title={<Title order={3}>Prueba básica</Title>}
      size="600px"
      closeOnClickOutside={false}
      closeOnEscape={false}
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      centered
    >
      <Box>
        <Title order={4}>{question}</Title>

        {options.map((option, index) => (
          <Box
            onClick={() => setSelectedOption(index)}
            mt="1rem"
            mb="0.5rem"
            sx={(theme) => ({
              maxWidth: "100%",
              display: "block",
              width: "100%",
              textAlign: "left",
              backgroundColor: theme.colors.dark[6],
              border:
                "1px solid " +
                (selectedOption === index
                  ? theme.colors.cyan[5]
                  : theme.colors.dark[4]),
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                borderColor:
                  selectedOption === index
                    ? theme.colors.cyan[5]
                    : theme.colors.dark[3],
              },
            })}
            p="1rem"
          >
            <Text>{option}</Text>
          </Box>
        ))}
        <Text className="mt-3 mb-2" sx={{ textAlign: "right" }}>
          Pregunta {index + 1}/{tests?.length}
        </Text>
        <Flex justify="end" mt="1rem">
          {index === tests.length - 1 ? (
            <Button>Comprobar respuestas</Button>
          ) : (
            <Button
              onClick={selectedOption === null ? null : nextQuestion}
              disabled={selectedOption === null}
            >
              Siguiente
            </Button>
          )}
        </Flex>
      </Box>
    </Modal>
  );
}
