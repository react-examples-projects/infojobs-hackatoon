import { isNotDef } from "@helpers/utils";
import useOffer from "@hooks/useOffer";
import {
  Modal,
  Button,
  ScrollArea,
  Text,
  Grid,
  Title,
  Image,
  Flex,
  Box,
  Divider,
} from "@mantine/core";

export default function OfferDetailsModal({ job = {}, ...props }) {
  const {
    id,
    title,
    author,
    city,
    study,
    requirementMin,
    salaryDescription,
    subcategory,
    _published,
    _contractType,
    _teleworking,
  } = job;
  const { offer, isLoading } = useOffer(id, { enabled: props.opened });
  const {
    country,
    description,
    department,
    experienceMin,
    journey,
    profile,
    skillsList,
  } = offer;

  return (
    <Modal size="1220px" className="mantine-Modal-Offer" {...props} centered>
      <Grid px="1rem">
        <Grid.Col span={4} pr={0}>
          <Box className="mantine-Modal-Offer-ScrollArea">
            <Flex align="center" mb="1.4rem" mt="5px">
              <Image
                width={40}
                height={40}
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
              <Box ml="0.7rem">
                <a
                  href={author.uri}
                  style={{ display: "block" }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Text td="underline" color="gray.4">
                    {author.name}
                  </Text>
                </a>

                <Text size="sm" c="dimmed">
                  Hace {_published}
                </Text>
              </Box>
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
              <Text>
                {isNotDef(requirementMin) || !requirementMin
                  ? "No definidios"
                  : requirementMin}
              </Text>
              <Divider mt="0.8rem" />
            </Box>

            <Box mt="1.2rem">
              <Grid>
                <Grid.Col span={7}>
                  <Text c="dimmed">Tipo de contrato</Text>
                  <Text>{_contractType}</Text>
                </Grid.Col>

                <Grid.Col span={5}>
                  <Text c="dimmed">Tipo de trabajo</Text>
                  <Text>{_teleworking}</Text>
                </Grid.Col>
              </Grid>
              <Divider mt="0.8rem" />
            </Box>

            <Box mt="1.2rem">
              <Text c="dimmed">Estudios necesarios</Text>
              <Text>
                {isNotDef(study) || !study ? "No definidios" : study.value}
              </Text>
            </Box>
          </Box>
        </Grid.Col>

        <Grid.Col span={8}>
          <Grid>
            <Grid.Col span={1} p={0} m={0}>
              <Divider orientation="vertical" sx={{ height: "100%" }} />
            </Grid.Col>

            <Grid.Col span={11} pl={0}>
              <ScrollArea h={840} offsetScrollbars>
                {isLoading ? (
                  <Text>Cargando datos..</Text>
                ) : (
                  <Box className="mantine-Modal-Offer-ScrollArea">
                    <Title order={4}>Descripción del puesto</Title>
                    <Text>
                      <pre
                        style={{
                          display: "block",
                          width: "100%",
                          whiteSpace: "pre-wrap",
                          wordBreak: " break-word",
                          lineHeight: "1.4",
                          fontFamily: "inherit",
                        }}
                      >
                        {description}
                      </pre>
                    </Text>
                  </Box>
                )}
              </ScrollArea>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
