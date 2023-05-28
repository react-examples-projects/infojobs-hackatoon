import useCheckTest from "@hooks/useCheckTest";
import { Modal, Title, Text, Box, Button, Flex, Alert } from "@mantine/core";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { getError } from "@helpers/utils";
import useToggle from "@hooks/useToggle";

export default function BasicTestModal({ test, tests = [], ...props }) {
  const { mutateAsync, isPending, error, isError } = useCheckTest();
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const { jobId } = test;
  const { question, options, _id } = tests[index] || {};
  const [answers, setAnswers] = useState({ jobId, answers: [] });
  const [results, setResults] = useState(null);
  const [isOpenResultModal, toggleOpenResultModal] = useToggle(true);

  const nextQuestion = async () => {
    if (index === tests.length - 1) {
      try {
        const updatedAnswers = {
          ...answers,
          answers: [
            ...answers.answers,
            { index, selectedOption, _id, question },
          ],
        };
        const results = await mutateAsync(updatedAnswers);
        setResults(results);
        console.log({ results });
      } catch (err) {
        console.error(err);
      }
    } else {
      setAnswers((prev) => ({
        ...prev,
        answers: [...prev.answers, { index, selectedOption, _id, question }],
      }));
      setSelectedOption(null);
      setIndex((prev) => prev + 1);
    }
  };

  if (results) {
    return (
      <Modal
        size="600px"
        closeOnEscape={false}
        closeOnClickOutside={false}
        opened={isOpenResultModal}
        onClose={toggleOpenResultModal}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Box>
          <Title order={4} ml="1rem">
            Resultados de la prueba básica
          </Title>

          {results.map((result, index) => (
            <Box
              mb="0.5rem"
              sx={(theme) => ({
                maxWidth: "100%",
                display: "block",
                width: "100%",
                textAlign: "left",
                // backgroundColor: result.validOptionIndex.includes(
                //   result.selectedOption
                // )
                //   ? theme.colors.green[7]
                //   : theme.colors.dark[6],
                borderRadius: "5px",
                cursor: "pointer",
              })}
              p="1rem"
            >
              <Text>{result.question}</Text>
              <Box>
                {result.options.map((op, index) => {
                  const { isSuccess, selectedOption } = result;
                  const isCorrect =
                    isSuccess && result.validOptionIndex.includes(index);
                  const isFailed = !isSuccess && index === selectedOption;
                  const userAnswerBorder =
                    isCorrect && index === selectedOption;

                  const getBackgroundColor = (theme) => {
                    if (isCorrect) return theme.colors.green[8];
                    if (isFailed) return theme.colors.red[8];
                    return theme.colors.dark[6];
                  };

                  return (
                    <Box
                      mt="1rem"
                      mb="0.5rem"
                      sx={(theme) => ({
                        maxWidth: "100%",
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        backgroundColor: userAnswerBorder
                          ? theme.colors.lime[5]
                          : getBackgroundColor(theme),
                        border: `2px solid ${
                          !isSuccess && result.validOptionIndex.includes(index)
                            ? "green"
                            : "transparent"
                        }`,
                        borderRadius: "5px",
                        cursor: "pointer",
                      })}
                      p="0.6rem"
                    >
                      <Text
                        size="sm"
                        color={isCorrect || isFailed ? "dark.9" : "white"}
                      >
                        {op}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>
    );
  }

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

        {isError && (
          <Alert
            mt="1rem"
            icon={<FiAlertCircle />}
            title="Something went wrong"
            color="red"
          >
            {getError(error)}
          </Alert>
        )}

        <Text className="mt-3 mb-2" sx={{ textAlign: "right" }}>
          Pregunta {index + 1}/{tests?.length}
        </Text>

        <Flex justify="end" mt="1rem">
          {index === tests.length - 1 ? (
            <Button
              loading={isPending}
              disabled={isPending}
              onClick={isPending ? null : nextQuestion}
            >
              {isPending ? "Revisando respuestas..." : "Comprobar respuestas"}
            </Button>
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
