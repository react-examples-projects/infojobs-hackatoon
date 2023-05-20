import Balancer from "react-wrap-balancer";
import useToggle from "@hooks/useToggle";
import OfferDetailsModal from "@components/Offers/OfferDetailsModal";
import {
  getContractType,
  getTeleworkingType,
  getFormattedDistanceToNow,
  isNotDef,
} from "@helpers/utils";
import { Box, Flex, Title, Text, Image, Badge, Button } from "@mantine/core";

export default function OfferListItem(props) {
  const {
    id,
    author,
    title,
    published,
    contractType,
    teleworking,
    city,
    category,
  } = props;
  const _published = getFormattedDistanceToNow(published);
  const _contractType = getContractType(contractType.id);
  const _teleworking = getTeleworkingType(teleworking?.id);
  const isDefinedCity = !isNotDef(city);
  const [isOpenModalDetails, toggleOpenModalDetails] = useToggle();

  return (
    <>
      {isOpenModalDetails && (
        <OfferDetailsModal
          job={{ ...props, _published, _contractType, _teleworking }}
          opened={isOpenModalDetails}
          onClose={toggleOpenModalDetails}
        />
      )}
      
      <Box
        key={id}
        data-offer-id={id}
        mb="1rem"
        p="1rem"
        sx={(theme) => ({
          borderRadius: "4px",
          backgroundColor: theme.colors.dark[4],
          border: "2px solid transparent",
          "&:hover": {
            borderColor: theme.colors.dark[7],
          },
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
              <Badge mr="4px">{_contractType}</Badge>
              {!isNotDef(_teleworking) ? (
                <Text c="dimmed" size="sm" ml="0.4rem">
                  | {_teleworking} {isDefinedCity && ` en ${city}`}
                </Text>
              ) : isDefinedCity ? (
                <Text c="dimmed" ml="4px" size="sm">
                  | {city}
                </Text>
              ) : (
                <Text c="dimmed" ml="4px" size="sm">
                  | Ubicación desconocida
                </Text>
              )}
              <Text c="dimmed" ml="4px" size="sm">
                | {category.value}
              </Text>
            </Flex>

            <Flex align="center" justify="space-between" mt="0.5rem">
              <Text c="dimmed" size="sm">
                Hace {_published}
              </Text>

              <Box>
                <Button
                  size="xs"
                  mr="0.4rem"
                  variant="default"
                  onClick={toggleOpenModalDetails}
                >
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
    </>
  );
}
