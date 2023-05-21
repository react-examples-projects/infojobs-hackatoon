import useOffers from "@hooks/useOffers";
import OfferListItem from "@components/Offers/OfferListItem";
import { Box, Title } from "@mantine/core";

export default function OfferList() {
  const { offers, isLoading } = useOffers();

  if (isLoading) {
    return <h2>Cargando ofertas...</h2>;
  }

  return (
    <Box>
      <Title order={3} mb="2rem">
        {offers.length} trabajos rastreados del mundo
      </Title>
      
      {offers.map((offer) => (
        <OfferListItem {...offer} key={offer.id} />
      ))}
    </Box>
  );
}
