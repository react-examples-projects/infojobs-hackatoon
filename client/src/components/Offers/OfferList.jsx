import useOffers from "@hooks/useOffers";
import OfferListItem from "@components/Offers/OfferListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Title, Input, Button, NativeSelect } from "@mantine/core";
import { useCallback, useMemo, useRef, useState } from "react";
import { provinces } from "@config/constants";

const provincesNames = provinces.map((p) => p.value);

export default function OfferList() {
  const inputSearchRef = useRef(null);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("javascript");
  const [province, setProvince] = useState("madrid");
  const { offers, isLoading } = useOffers({ q, province, page });

  const search = () => setQ(inputSearchRef.current.value);

  const fetchNext = () => {
    setPage(page + 1);
  };

  const provinceValue = useMemo(() => {
    const key = provinces.find((p) => p.key === province).value;
    return key;
  }, [province]);

  const searchProvince = useCallback((event) => {
    const value = event.currentTarget.value;
    const key = provinces.find((p) => p.value === value).key;
    setProvince(key);
  }, []);

  if (isLoading) {
    return <h2>Cargando ofertas...</h2>;
  }

  return (
    <Box>
      <NativeSelect
        data={provincesNames}
        size="lg"
        label="Selecciona una provincia"
        onChange={searchProvince}
        value={provinceValue}
      />

      <Input.Wrapper
        label="Busca un trabajo alrededor del mundo"
        mt="1rem"
        size="lg"
      >
        <Input
          ref={inputSearchRef}
          placeholder="Javascript, Reactjs, Java, DevOPS"
          mb="0.8rem"
          mt="0.8rem"
          defaultValue={q}
          size="lg"
        />
        <Button px="3rem" onClick={search}>
          Buscar
        </Button>
      </Input.Wrapper>

      <Title order={3} mb="2rem" mt="3rem">
        {offers.length} trabajos rastreados del mundo
      </Title>

      {offers.map((offer) => (
        <OfferListItem {...offer} key={offer.id} />
      ))}
    </Box>
  );
}
