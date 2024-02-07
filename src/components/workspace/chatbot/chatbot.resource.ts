import { openmrsFetch } from "@openmrs/esm-framework";

export function getCareProvider(provider: string) {
  const abortController = new AbortController();

  return openmrsFetch(`/ws/rest/v1/provider?q=${provider}&v=full`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    signal: abortController.signal,
  });
}
