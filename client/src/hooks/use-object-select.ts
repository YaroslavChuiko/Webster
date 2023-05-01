import Konva from 'konva';
import { RefObject } from 'react';
import { useAppSelector } from './use-app-selector';
import { useDispatch } from 'react-redux';
import { selectedObjectActions } from '~/store/slices/selected-objects-slice';

type Props = {
  transformer?: RefObject<Konva.Transformer>;
};

const useObjectSelect = ({ transformer }: Props) => {
  const { ids: selected } = useAppSelector((state) => state.selected);
  const dispatch = useDispatch();

  const isSelected = (id: string) => selected.includes(id);
  const setSelected = (id: string) => dispatch(selectedObjectActions.setAll([id]));

  const onObjectSelect = (target: Konva.Node) => {
    transformer?.current?.nodes([target]);
    transformer?.current?.getLayer()?.batchDraw();

    const id = target.attrs.id;
    dispatch(selectedObjectActions.setAll([id]));
  };

  const resetObjectSelect = () => {
    dispatch(selectedObjectActions.resetAll());
  };

  return { onObjectSelect, resetObjectSelect, selected, isSelected, setSelected };
};

export default useObjectSelect;
