export const attachQueries = (queries: Record<string, unknown>, url: string) => {
  if (queries) {
    Object.keys(queries).forEach((key, index) => {
      url += `${index === 0 ? "?" : "&"}${key}=${queries[key]}`;
    });
  }
  return url;
}