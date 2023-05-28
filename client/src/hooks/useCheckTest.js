import { useMutation } from "@tanstack/react-query";
import { checkBasicTest } from "@helpers/api";

export default function useCheckTest() {
  const mutation = useMutation({
    mutationKey: "checkTest",
    async mutationFn(data) {
      return checkBasicTest(data);
    },
  });
  return mutation;
}
