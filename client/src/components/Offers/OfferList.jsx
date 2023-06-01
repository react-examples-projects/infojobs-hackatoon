import useOffers from "@hooks/useOffers";
import OfferListItem from "@components/Offers/OfferListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import NProgress from "nprogress";
import {
  Box,
  Title,
  Input,
  Button,
  NativeSelect,
  Skeleton,
  Alert,
} from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { provinces } from "@config/constants";

const placeholder = Array(20).fill(null);

export default function OfferList() {
  const inputSearchRef = useRef(null);
  const [bySearch, setBySearch] = useState(false)
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("javascript");
  const [province, setProvince] = useState("seleccionar");
  const prevProvince = useRef(province);
  const { offers, totalPages, isLoading, isPending } = useOffers({
    q,
    province,
    page,
  });
  const [offersRender, setOffersRender] = useState([]);

  const search = () => {
    setPage(1);
    setBySearch(true);
    setQ(inputSearchRef.current.value);
  };

  const fetchNext = () => {
    if (page !== totalPages) setPage(page + 1);
  };

  const provincesNames = useMemo(() => provinces.map((p) => p.value), []);

  const provinceValue = useMemo(() => {
    const key = provinces.find((p) => p.key === province).value;
    return key;
  }, [province]);

  const searchProvince = useCallback((event) => {
    setPage(1);
    const value = event.currentTarget.value;
    const key = provinces.find((p) => p.value === value).key;
    setProvince(key);
  }, []);

  useEffect(() => {
    if (province !== prevProvince.current) {
      setOffersRender(offers);
      prevProvince.current = province;
    } else if (bySearch) {
      setOffersRender(offers);
      setBySearch(false);
    } else if (offers.length > 0) {
      setOffersRender((prev) => [...prev, ...offers]);
    }
  }, [offers, province]);

  useEffect(() => {
    isLoading || isPending ? NProgress.start() : NProgress.done();
  }, [isLoading, isPending]);

  if ((isLoading || isPending) && (offersRender.length < 1 || !offers)) {
    return (
      <>
        <Skeleton width="100%" height={74} mb="1rem" />
        <Skeleton width="100%" height={74} mt="0.8rem" />

        <Skeleton width={145} height={36} mb="3rem" mt="0.8rem" />

        {placeholder.map((_, i) => (
          <Skeleton width="100%" height={154} key={i} visible mb="1rem" />
        ))}
      </>
    );
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
        {offersRender.length} trabajos rastreados del mundo
      </Title>

      <InfiniteScroll
        dataLength={offersRender.length}
        next={fetchNext}
        hasMore={page < totalPages}
        loader={isLoading || isPending ? "Cargando..." : null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No hay más resultados que mostrar</b>
          </p>
        }
      >
        {offersRender.length < 1 ? (
          <Alert title="No hay resultados">
            Parece que tu busqueda a dado 0 resultados, intenta usando el filtro
            o mejorando las palabras claves de la busqueda.
          </Alert>
        ) : (
          offersRender.map((offer) => (
            <OfferListItem {...offer} key={offer.id} />
          ))
        )}
      </InfiniteScroll>
    </Box>
  );
}
