import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";
export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  console.log("Request URL:", url.toString());
  console.log("Auth Token:", authToken);
  console.log("Method:", method);
  console.log("Payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: method !== "GET" ? JSON.stringify(payload) : undefined,
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.log("Fetch error:", error);
    throw error;
  }
}
