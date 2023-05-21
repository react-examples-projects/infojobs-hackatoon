import { getOfferById } from "@helpers/api";
import { useQuery } from "@tanstack/react-query";

export default function useOffer(id, queryOptions) {
  const { data: offer = {}, ...args } = useQuery({
    queryKey: ["offer", id],
    queryFn: () => getOfferById(id),
    staleTime: Infinity,
    ...queryOptions,
  });

  return {
    offer,
    ...args,
  };
}
