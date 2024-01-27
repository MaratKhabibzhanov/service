import { useCallback, useMemo } from 'react';

import { App } from 'antd';

const useCatch = () => {
  const { notification } = App.useApp();

  const catchCallback = useCallback(
    (e: Error) => {
      notification.error({
        message: e.message,
      });
    },
    [notification]
  );

  return useMemo(() => ({ catchCallback }), [catchCallback]);
};

export default useCatch;
