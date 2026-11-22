import { useQuery } from "@tanstack/react-query";
import { getTrainDataSource } from "../train/dataSource";

export function useTrainNetwork() {
  return useQuery({
    queryKey: ["trainNetwork"],
    queryFn: () => getTrainDataSource().getNetwork(),
    staleTime: 24 * 60 * 60 * 1000,
  });
}
