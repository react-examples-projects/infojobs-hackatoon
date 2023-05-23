import { Modal, Title, Text } from "@mantine/core";

export default function TestWarningModal({ btnFooter, ...props }) {
  return (
    <Modal
      {...props}
      title={<Title order={3}>Informacion Importante</Title>}
      size="600px"
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
      centered
    >
      <Text>
        Antes de realizar el test de preparación básica, es importante tener en
        cuenta que se utiliza un procedimiento basado en algoritmos de
        inteligencia artificial para generar el test. Sin embargo, no podemos
        garantizar que las preguntas y respuestas sean las más adecuadas para
        evaluar su capacidad en el ámbito laboral.
      </Text>

      <Text mt="1rem">
        Si experimenta algún problema o considera que los resultados o el test
        no son los más adecuados, le invitamos a ponerse en contacto con
        nosotros. Estaremos siempre disponibles para ayudarle.
      </Text>

      {btnFooter}
    </Modal>
  );
}
