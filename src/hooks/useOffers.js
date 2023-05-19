import { getOffers } from "@helpers/api";
import { useQuery } from "@tanstack/react-query";

export default function useOffers() {
  const { data = {}, ...args } = useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
  });

  const offers = data.offers || []
  
  return {
    offers,
    data,
    ...args,
  };
}
