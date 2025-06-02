export const useApi = () => {
  const runtimeConfig = useRuntimeConfig();
  const apiBase = runtimeConfig.public.apiBase || 'http://localhost:3001';

  const getPosts = async (params = {}) => {
    const query = new URLSearchParams();
    
    if (params.sort) query.append('_sort', params.sort);
    if (params.order) query.append('_order', params.order);
    if (params.limit) query.append('_limit', params.limit.toString());

    return $fetch(`/posts?${query.toString()}`, {
      baseURL: apiBase
    });
  };

  return { getPosts };
};