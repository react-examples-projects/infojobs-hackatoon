import Balancer from "react-wrap-balancer";
import useToggle from "@hooks/useToggle";
import OfferDetailsModal from "@components/Offers/OfferDetailsModal";
import {
  getContractType,
  getTeleworkingType,
  getFormattedDistanceToNow,
  isNotDef,
} from "@helpers/utils";
import {
  Box,
  Flex,
  Title,
  Text,
  Image,
  Badge,
  Button,
  Alert,
} from "@mantine/core";
import { FiAlertCircle } from "react-icons/fi";
import { getError } from "@helpers/utils";
import { notifications } from "@mantine/notifications";
import useTest from "@hooks/useTest";
import TestWarningModal from "@components/TestWarningModal";
import BasicTestModal from "@components/BasicTestModal";
import { useCallback } from "react";

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
  const [isOpenModalWarning, toggleOpenModalWarning] = useToggle();
  const [isOpenBasicTestModal, toggleOpenBasicTestModal] = useToggle();
  const { data, isPending, isError, error, mutateAsync } = useTest();

  const createBasicTest = async () => {
    try {
      const result = await mutateAsync(id);
      if (result.data?.data?.questions?.length < 1) {
        notifications.show({
          title: "Algo ha ido mal",
          message:
            "Internamente ha ocurrido un error al crear el test,intenta nuevamente",
          color: "red",
        });
      }
      toggleOpenModalWarning();
      toggleOpenBasicTestModal();
    } catch (err) {
      console.error(err.message);
    }
  };

  const d = () => {
    toggleOpenModalDetails();
    toggleOpenModalWarning();
  };

  return (
    <>
      {isOpenModalDetails && (
        <OfferDetailsModal
          createBasicTest={d}
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

                <Button
                  size="xs"
                  variant="light"
                  mr="0.4rem"
                  loading={isPending}
                  onClick={toggleOpenModalWarning}
                >
                  Recrear test
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>

      {!isPending &&
        data !== undefined &&
        data?.data?.questions?.length > 0 && (
          <BasicTestModal
            opened={isOpenBasicTestModal}
            onClose={toggleOpenBasicTestModal}
            tests={data?.data?.questions}
            test={data?.data}
          />
        )}

      <TestWarningModal
        closeOnClickOutside={!isPending}
        closeOnEscape={!isPending}
        opened={isOpenModalWarning}
        onClose={toggleOpenModalWarning}
        btnFooter={
          <>
            {isError && (
              <Alert
                icon={<FiAlertCircle />}
                title="Something went wrong"
                color="red"
                mt="1rem"
              >
                {getError(error)}
              </Alert>
            )}

            {data?.data?.questions?.length < 1 && (
              <Alert
                icon={<FiAlertCircle />}
                title="Something went wrong"
                color="red"
                mt="1rem"
              >
                Intenta de nuevo crear un nuevo test para la oferta.
                <Button mt="0.8ren" onClick={createBasicTest} fullWidth>
                  Reintentar
                </Button>
              </Alert>
            )}

            <Flex gap="5px" mt="1rem" justify="end" sx={{ width: "100%" }}>
              <Button onClick={createBasicTest} loading={isPending}>
                {isPending ? "Generando test" : "Aceptar"}
              </Button>
              <Button
                onClick={toggleOpenModalWarning}
                color="red.8"
                variant="light"
                disabled={isPending}
              >
                Cancelar
              </Button>
            </Flex>
          </>
        }
      />
    </>
  );
}
