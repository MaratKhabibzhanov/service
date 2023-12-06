import ky from 'ky';

export const $api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT }).extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
      },
    ],
  },
});
