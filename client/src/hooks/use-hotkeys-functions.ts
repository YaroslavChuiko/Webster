import { useDispatch } from 'react-redux';
import { useAppSelector } from './use-app-selector';
import { stateObjectActions } from '~/store/slices/stage-object-slice';
import useObjectSelect from './use-object-select';
import { RefObject } from 'react';
import Konva from 'konva';

type Props = {
  imageTransformer?: RefObject<Konva.Transformer>;
  textTransformer?: RefObject<Konva.Transformer>;
  multiTransformer?: RefObject<Konva.Transformer>;
};

const useHotkeysFunctions = ({ ...transformers }: Props) => {
  const { selected } = useAppSelector((state) => state.selected);
  const { resetObjectSelect } = useObjectSelect(transformers);
  const dispatch = useDispatch();

  const onDeleteKey = () => {
    if (!selected.length) {
      return;
    }

    dispatch(stateObjectActions.remove(selected));
    resetObjectSelect();
  };

  return { onDeleteKey };
};

export default useHotkeysFunctions;
