import ky from 'ky';

import { rootStore } from 'app/store';

export const $api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT }).extend({
  hooks: {
    beforeRequest: [
      (request) => {
        if (rootStore.auth.accessToken) {
          request.headers.set('Authorization', `Bearer ${rootStore.auth.accessToken}`);
        }
      },
    ],

    afterResponse: [
      async (request, _options, response) => {
        if (
          response.status === 401 &&
          rootStore.auth.refreshToken &&
          !response.url.includes('refresh')
        ) {
          await rootStore.auth.refreshTokens();

          request.headers.set('Authorization', `Bearer ${rootStore.auth.accessToken}`);
          return ky(request);
        }
        return undefined;
      },
    ],

    beforeError: [
      async (error) => {
        const { response } = error;
        if (response && response.body) {
          const responseWithError = await response.json();
          error.name = 'Error';
          error.message = responseWithError.detail;
        }

        return error;
      },
    ],
  },
});
