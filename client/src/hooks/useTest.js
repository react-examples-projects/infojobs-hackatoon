import { useMutation } from "@tanstack/react-query";
import { getBasicTest, getOfferById } from "@helpers/api";

export default function useTest() {
  const mutation = useMutation({
    mutationFn: async (id) => {
      let offerData = await getOfferById(id);
      const { title, description, skillsList, minRequirements } = offerData;
      return getBasicTest({
        title,
        description,
        skillsList,
        minRequirements,
        id,
      });
    },
  });

  return mutation;
}
