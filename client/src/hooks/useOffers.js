import { getOffers } from "@helpers/api";
import { useQuery } from "@tanstack/react-query";

export default function useOffers(params) {
  const { data = {}, ...args } = useQuery({
    queryKey: ["offers", params],
    queryFn: () => getOffers(params),
  });

  const offers = data.offers || [];

  return {
    offers,
    data,
    ...args,
  };
}
