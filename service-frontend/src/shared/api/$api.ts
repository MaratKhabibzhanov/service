import { rootStore } from 'app/store';
import ky from 'ky';

export const $api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT }).extend({
  hooks: {
    beforeRequest: [
      (request) => {
        if (rootStore.auth.accessToken) {
          request.headers.set('Authorization', rootStore.auth.accessToken);
        }
      },
    ],
  },
});
