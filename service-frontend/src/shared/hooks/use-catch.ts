import { useCallback, useMemo } from 'react';
import { message } from 'antd';

const useCatch = () => {
  const [messageApi] = message.useMessage();

  const catchCallback = useCallback(
    (e: Error) => {
      console.log(e.message);
      messageApi.open({
        type: 'error',
        content: e.message,
      });
    },
    [messageApi]
  );

  return useMemo(() => ({ catchCallback }), [catchCallback]);
};

export default useCatch;
