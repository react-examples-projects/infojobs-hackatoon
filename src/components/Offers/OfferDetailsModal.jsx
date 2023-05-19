import useOffer from "@hooks/useOffer";
import {
  Modal,
  Button,
  Text,
  Grid,
  Title,
  Image,
  Flex,
  Box,
  Divider
} from "@mantine/core";

export default function OfferDetailsModal({ job = {}, ...props }) {
  const {
    id,
    title,
    author,
    city,
    requirementMin,
    salaryDescription,
    subcategory,
  } = job;
  const { offer, isLoading } = useOffer(id, { enabled: props.opened });
  const { country } = offer;

  return (
    <Modal size="1220px" {...props}>
      <Grid px="1rem">
        <Grid.Col span={4}>
          <Flex align="center" mb="1rem" mt="5px">
            <Image
              width={35}
              height={35}
              src={author.logoUrl}
              alt={author.name}
              imageProps={{
                style: {
                  borderRadius: "9999px",
                  objectPosition: "center",
                },
              }}
              fit="cover"
              sx={{
                ".mantine-Image-placeholder": {
                  borderRadius: "9999px",
                  objectPosition: "center",
                },
              }}
              withPlaceholder
            />
            <Text ml="0.7rem" td="underline">
              {author.name}
            </Text>
          </Flex>

          <Title order={3} pr="1rem">
            {title}
          </Title>

          <Box mt="1.2rem">
            <Text c="dimmed">Ubicación</Text>
            <Text>
              {city} | {country?.value || "Desconocido"}
            </Text>
            <Divider mt="0.8rem" />
          </Box>

          <Box mt="1.2rem">
            <Grid>
              <Grid.Col span={6}>
                <Text c="dimmed">Salario Estimado</Text>
                <Text>{salaryDescription}</Text>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text c="dimmed">Categoría</Text>
                <Text>{subcategory?.value}</Text>
              </Grid.Col>
            </Grid>
            <Divider mt="0.8rem" />
          </Box>

          <Box mt="1.2rem">
            <Text c="dimmed">Requerimientos mínimos</Text>
            <Text>{requirementMin}</Text>
            <Divider mt="0.8rem" />
          </Box>
        </Grid.Col>

        <Grid.Col span={8}>
          {isLoading ? (
            <Text>Cargando datos..</Text>
          ) : (
            JSON.stringify(offer, undefined, 3)
          )}
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
