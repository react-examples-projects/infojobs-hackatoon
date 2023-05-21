import TextOverflow from "@components/TextOverflow";
import useOffer from "@hooks/useOffer";
import {
  Modal,
  Skeleton,
  ScrollArea,
  Tooltip,
  Text,
  Grid,
  Title,
  Image,
  Flex,
  Box,
  Divider,
  Badge,
  Button,
} from "@mantine/core";
import { isNotDef } from "@helpers/utils";

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

  const { offer, isLoading, isError, error } = useOffer(id, {
    enabled: props.opened,
  });

  const {
    country,
    description,
    experienceMin,
    journey,
    profile,
    skillsList,
    province,
    link,
  } = offer;

  const {
    country: countryProfile,
    description: descriptionProfile,
    logoUrl,
    web,
  } = profile || {};

  const tooltipLabel = (
    <Box>
      <Flex align="center" mb="0.5rem">
        <Image
          width={40}
          height={40}
          src={logoUrl}
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
        <Text ml="1rem">{author.name}</Text>
      </Flex>

      {countryProfile && (
        <Text my="0.2rem" c="dimmed" size="xs">
          País:{" "}
          <Text
            c="dimmed"
            size="xs"
            fw="bolder"
            ml="3px"
            sx={{ display: "inline-block" }}
          >
            {countryProfile.value}
          </Text>
        </Text>
      )}

      {province && (
        <Text my="0.2rem" c="dimmed" size="xs">
          Provincia:
          <Text
            c="dimmed"
            size="xs"
            fw="bolder"
            ml="3px"
            sx={{ display: "inline-block" }}
          >
            {province.value}
          </Text>
        </Text>
      )}
      <TextOverflow
        maxLength={300}
        text={descriptionProfile}
        mt="0.8rem"
        c="gray.5"
        size="sm"
        sx={{ maxWidth: "300px" }}
        style={{
          display: "block",
          width: "100%",
          whiteSpace: "pre-wrap",
          wordBreak: " break-word",
          lineHeight: "1.4",
          fontFamily: "inherit",
        }}
      />
    </Box>
  );

  return (
    <Modal size="1220px" className="mantine-Modal-Offer" {...props} centered>
      <Grid px="1rem">
        <Grid.Col span={4} pr={0}>
          <Box className="mantine-Modal-Offer-ScrollArea">
            <Tooltip
              label={profile ? tooltipLabel : null}
              color="gray"
              position="bottom-start"
              withArrow
              arrowPosition="center"
            >
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
                    title="Click para ver más sobre la empresa"
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
            </Tooltip>

            <Title order={3} pr="1rem">
              {title}
            </Title>

            <Box mt="1.2rem">
              <Text c="dimmed">Ubicación</Text>
              <Text sx={{ display: "flex", alignItems: "center" }}>
                {city}
                {isLoading ? (
                  <Skeleton height={20} width={70} ml="0.5rem" />
                ) : (
                  " - " + country?.value || "Desconocido"
                )}
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
                <Box className="mantine-Modal-Offer-ScrollArea">
                  <Flex align="start">
                    <Box mb="2rem">
                      <Title order={3}>Descripción del puesto</Title>
                      {isLoading ? (
                        <Skeleton width={380} height={21} />
                      ) : (
                        <Flex>
                          <Text size="sm" c="dimmed">
                            Experiencia: {experienceMin?.value}
                          </Text>

                          <Text size="sm" c="dimmed" ml="0.5rem">
                            - Tipo de jornada: {journey?.value}
                          </Text>
                        </Flex>
                      )}

                      {isLoading ? (
                        <Skeleton width="100%" height={350} mt="1rem" />
                      ) : (
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
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        </Text>
                      )}
                    </Box>

                    <Button size="xs">Recrear test ténico</Button>
                  </Flex>

                  <Box mb="2rem">
                    <Title order={3}>Habilidades requeridas</Title>
                    {isLoading ? (
                      <Skeleton mt="1rem" width="100%" height={40} />
                    ) : skillsList?.length < 1 ? (
                      <Text mt="1rem">No definidas</Text>
                    ) : (
                      <Flex
                        align="center"
                        columnGap="4px"
                        rowGap="7px"
                        wrap="wrap"
                        mt="1rem"
                      >
                        {skillsList?.map((sk) => (
                          <Badge
                            key={sk.skill}
                            size="lg"
                            color="gray"
                            variant="filled"
                          >
                            {sk.skill}
                          </Badge>
                        ))}
                      </Flex>
                    )}
                  </Box>

                  <Box>
                    <Title order={3}>Información extra</Title>
                    {isLoading ? (
                      <Skeleton mt="1rem" width={267} height={24.8} />
                    ) : (
                      !isNotDef(link) && (
                        <a
                          title="Click para ver más sobre la ofera"
                          href={link}
                          style={{ display: "block" }}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Text mt="1rem">
                            Ver más sobre la oferta en infojobs.
                          </Text>
                        </a>
                      )
                    )}

                    {isLoading ? (
                      <Skeleton mt="1rem" width={287} height={24.8} />
                    ) : (
                      !isNotDef(author.uri) && (
                        <a
                          title="Click para ver más sobre la empresa"
                          href={author.uri}
                          style={{ display: "block" }}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Text mt="1rem">
                            Ver más sobre la empresa en infojobs.
                          </Text>
                        </a>
                      )
                    )}

                    {isLoading ? (
                      <Skeleton mt="1rem" width={230} height={24.8} />
                    ) : (
                      !isNotDef(web) && (
                        <a
                          title="Click para visitar el sitio web de la empresa"
                          href={web}
                          style={{ display: "block" }}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Text mt="1rem">Ver el sitio web de la empresa.</Text>
                        </a>
                      )
                    )}
                  </Box>
                </Box>
              </ScrollArea>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
