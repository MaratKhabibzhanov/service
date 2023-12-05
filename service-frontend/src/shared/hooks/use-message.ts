import { useCallback, useMemo } from 'react';

import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';

type OpenMessageArgs = { type: NoticeType; content: string };

const useMessage = () => {
  const [messageApi] = message.useMessage();

  const openMessage = useCallback(
    ({ type, content }: OpenMessageArgs) => {
      messageApi.open({
        type: type || 'success',
        content: content || 'Success',
      });
    },
    [messageApi]
  );

  return useMemo(() => ({ openMessage }), [openMessage]);
};

export default useMessage;
