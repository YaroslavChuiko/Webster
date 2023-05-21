import { useCallback, useState } from 'react';
import { StageObject } from '~/types/stage-object';
import useStageObject from './use-stage-object';

const useHistory = () => {
  const { replaceAll } = useStageObject();

  const [past, setPast] = useState<StageObject[][]>([]);
  const [future, setFuture] = useState<StageObject[][]>([]);
  const [position, setPosition] = useState<StageObject[] | null>(null);

  const goBack = useCallback(() => {
    if (past.length <= 0 || !position) {
      return;
    }

    const newFuture = [...position];
    const newPosition = [...past[past.length - 1]];

    setPast((prev) => [...prev.slice(0, past.length - 1)]);
    setFuture((prev) => [...prev, newFuture]);

    setPosition(newPosition);
    replaceAll(newPosition);
  }, [past, position]);

  const goForward = useCallback(() => {
    if (future.length <= 0 || !position) {
      return;
    }

    const newPast = [...position];
    const newPosition = [...future[future.length - 1]];

    setFuture((prev) => [...prev.slice(0, future.length - 1)]);
    setPast((prev) => [...prev, newPast]);

    setPosition(newPosition);
    replaceAll(newPosition);
  }, [future, position]);

  const savePast = useCallback(
    (newPosition: StageObject[]) => {
      if (!newPosition || JSON.stringify(newPosition) === JSON.stringify(position)) {
        return;
      }

      setPosition(newPosition);
      if (position !== null) {
        setPast((prev) => [...prev, position]);
        setFuture([]);
      }
    },
    [position],
  );

  return { savePast, goBack, goForward };
};

export default useHistory;
