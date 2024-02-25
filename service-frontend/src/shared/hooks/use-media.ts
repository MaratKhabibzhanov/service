import { useMediaQuery } from 'react-responsive';

const useMedia = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isBigScreen = useMediaQuery({ minWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });

  return { isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isPortrait };
};

export default useMedia;
