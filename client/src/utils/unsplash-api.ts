import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_API_KEY,
});
