const getUrlWithParams = (url: string, params?: Record<string, string | number | []>) => {
  if (!params) return url;

  let urlWithParams = `${url}?`;

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'boolean') urlWithParams += `${key}=${value}&`;
    else if (Array.isArray(value)) urlWithParams += `${key}=${value.join(',')}&`;
    else urlWithParams += `${key}=${value}&`;
  });

  return urlWithParams;
};

export default getUrlWithParams;
