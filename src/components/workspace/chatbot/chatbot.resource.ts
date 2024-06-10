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

export function postToChatbot(message) {
  const url = "https://chatbot.mets.or.ug/chat";
  const body = JSON.stringify({ message });

  const abortController = new AbortController();

  return openmrsFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
    signal: abortController.signal,
  });
}
