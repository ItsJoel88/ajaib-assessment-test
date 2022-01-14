export function createParams(payload: any): string {
  let queryParams = "?";

  if (payload) {
    Object.keys(payload).forEach((key) => {
      if (typeof payload[key] !== "object") {
        queryParams += `${key}=${payload[key]}&`;
      } else {
        Object.keys(payload[key]).forEach((subKey) => {
          queryParams += `${subKey}=${payload[key][subKey]}&`;
        });
      }
    });
  }

  return queryParams;
}
