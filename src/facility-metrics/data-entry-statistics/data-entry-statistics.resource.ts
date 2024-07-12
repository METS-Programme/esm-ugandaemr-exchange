import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import useSWR, { useSWRConfig } from "swr";

type encounterRequest = {
  fromDate: string;
  toDate: string;
  encUserColumn: string;
  groupBy: string;
};

export type dataProvider = {
  group: string;
  key: string;
  value: number;
  personUuid: string;
  contractCategory?: string;
};

export function useGetDataEntryStatistics(params: encounterRequest) {
  const apiUrl = `${restBaseUrl}/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`;
  const abortController = new AbortController();

  const { mutate } = useSWRConfig();
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  const fetcher = () =>
    openmrsFetch(apiUrl.toString(), {
      signal: abortController.signal,
    });

  const { data, error, isLoading, isValidating } = useSWR<
    { data: { any } },
    Error
  >(apiUrl, fetcher);

  const dataResults: Array<dataProvider> = formatReults(data?.data);

  return {
    encounterData: data?.data ? dataResults : [],
    isLoadingStats: isLoading,
    isError: error,
    isValidating,
    mutate,
    clearCache,
  };
}

export async function getDataEntryStatistics(params: encounterRequest) {
  const apiUrl = `${restBaseUrl}/dataentrystatistics?fromDate=${params.fromDate}&toDate=${params.toDate}&encUserColumn=${params.encUserColumn}&groupBy=${params.groupBy}`;
  const abortController = new AbortController();

  return openmrsFetch(apiUrl, {
    signal: abortController.signal,
  });
}

export function formatReults(dataResults) {
  const dataEntryData: Array<dataProvider> = [];

  dataResults?.forEach((entry) => {
    dataEntryData.push({
      group: entry.entryType,
      key: entry.fullName,
      value: entry.numberOfEntries,
      personUuid: entry.personUuid,
    });
  });

  return dataEntryData;
}

export async function fetchProviderDetails(provider: string) {
  const abortController = new AbortController();
  const apiURL = `${restBaseUrl}/provider?q=${provider}&v=custom:(uuid,attributes:(uuid,attributeType:(uuid,display),value:(uuid,name)))`;

  const response = await openmrsFetch(apiURL, {
    signal: abortController.signal,
  });

  return response.json();
}

export function getUniqueProviders(providerArray: Array<dataProvider>) {
  const uniqueProvider = new Set(
    providerArray.map((provider) => provider.personUuid)
  );

  const newProviderArray: dataProvider[] = Array.from(uniqueProvider)
    .map((personUuid) => {
      return providerArray.find((item) => item.personUuid === personUuid);
    })
    .filter((item): item is dataProvider => !!item);

  return newProviderArray;
}

export function getUniqueContractCategory(
  contractCategoryArray: Array<{ name: string }>
) {
  const uniqueContractCategory = new Set(
    contractCategoryArray.map((contractCategory) => contractCategory.name)
  );

  const newContractCategoryArray: Array<{ name: string }> = Array.from(
    uniqueContractCategory
  )
    .map((name) => {
      return contractCategoryArray.find((item) => item.name === name);
    })
    .filter((item): item is { name: string } => !!item);

  return newContractCategoryArray;
}

export async function formatStatsData(statsData: Array<dataProvider>) {
  return new Promise<{
    contractCategory: Array<{ group: string; value: number }>;
    providers: Array<{ group: string; value: number }>;
  }>((resolve, reject) => {
    const updatedProviders: dataProvider[] = [];
    const availableContractCategory: Array<{ name: string }> = [];
    const contractCategoryData = [];
    const providers = [];
    const uniqueProviders = getUniqueProviders(statsData);

    Promise.all(
      uniqueProviders.map(async (provider) => {
        const providerAttributes = await fetchProviderDetails(provider.key);
        const contractCategory =
          providerAttributes?.results[0]?.attributes?.find(
            (provider) =>
              provider.attributeType?.uuid ===
              "d4c0df19-530b-4988-b9e9-f54930ceb64a"
          )?.value;
        updatedProviders.push({
          ...provider,
          contractCategory: contractCategory?.trim(),
        });
        contractCategory?.trim()
          ? availableContractCategory.push({
              name: contractCategory?.trim(),
            })
          : null;
      })
    )
      .then(() => {
        const uniqueContractCategories = getUniqueContractCategory(
          availableContractCategory
        );

        uniqueContractCategories.forEach((category) => {
          const categoryProviders = updatedProviders.filter(
            (provider) => provider?.contractCategory?.trim() === category.name
          );

          contractCategoryData.push({
            group: category.name,
            value: categoryProviders?.length,
          });
        });

        statsData.map((item) => {
          providers.push({
            group: item.group,
            key: item.key,
            value: item.value,
          });
        });

        const result = {
          contractCategory: contractCategoryData,
          providers: providers,
        };

        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
