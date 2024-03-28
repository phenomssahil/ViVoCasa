import { useState } from 'react';

export function useIsCartUpdated() {
  const [isCartUpdated, setIsCartUpdated] = useState<boolean>(false);

  return {
    isCartUpdated,
    setIsCartUpdated,
  };
}