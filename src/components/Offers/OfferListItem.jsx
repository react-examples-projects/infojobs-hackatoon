import Balancer from "react-wrap-balancer";
import {
  getContractType,
  getTeleworkingType,
  getFormattedDistanceToNow,
  isNotDef,
} from "@helpers/utils";
import { Box, Flex, Title, Text, Image, Badge, Button } from "@mantine/core";

export default function OfferListItem({
  id,
  author,
  title,
  published,
  contractType,
  teleworking,
  city,
  category,
}) {
  const _published = getFormattedDistanceToNow(published);
  const _contractType = getContractType(contractType.id);
  const _teleworking = getTeleworkingType(teleworking?.id);
  const isDefinedCity = !isNotDef(city);
  return (
    <Box
      key={id}
      data-offer-id={id}
      mb="1rem"
      p="1rem"
      sx={(theme) => ({
        borderRadius: "4px",
        backgroundColor: theme.colors.dark[4],
      })}
    >
      <Flex>
        <Box component="figure" m={0} mr="0.8rem" p={0}>
          <Image
            width={70}
            height={70}
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
        </Box>

        <Box sx={{ width: "100%" }}>
          <Balancer>
            <Title order={4}>{title}</Title>
          </Balancer>
          <Text>{author.name}</Text>

          <Flex mt="0.5rem" align="center">
            <Badge mr="4px">{_contractType}</Badge>|
            {!isNotDef(_teleworking) ? (
              <Text c="dimmed" size="sm" ml="0.4rem">
                {_teleworking} {isDefinedCity && ` en ${city}`}
              </Text>
            ) : isDefinedCity ? (
              <Text c="dimmed" ml="4px" size="sm">
                {city}
              </Text>
            ) : (
              <Text c="dimmed" ml="4px" size="sm">
                Ubicación desconocida
              </Text>
            )}{" "}
            <Text c="dimmed" ml="4px" size="sm">
              {" "}
              | {category.value}
            </Text>
          </Flex>

          <Flex align="center" justify="space-between" mt="0.5rem">
            <Text c="dimmed" size="sm">
              Hace {_published}
            </Text>
            <Box>
              <Button size="xs" mr="0.4rem" variant="default">
                Ver más
              </Button>
              <Button size="xs" variant="light">
                Recrear test técnico
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
