import Konva from 'konva';
import { RefObject, useState } from 'react';
import { useAppSelector } from './use-app-selector';
import { useDispatch } from 'react-redux';
import { selectedObjectActions } from '~/store/slices/selected-objects-slice';
import { StageObjectType } from '~/types/stage-object';
import useKeyPress from './use-key-press';
import { KeyType } from '~/consts/keys';

type Props = {
  imageTransformer?: RefObject<Konva.Transformer>;
  textTransformer?: RefObject<Konva.Transformer>;
  multiTransformer?: RefObject<Konva.Transformer>;
};

const useObjectSelect = ({ imageTransformer, textTransformer, multiTransformer }: Props) => {
  const { selected } = useAppSelector((state) => state.selected);
  const dispatch = useDispatch();

  const isKeyPressed = useKeyPress(KeyType.MULTISELECT);

  const [selectedNodes, setSelectedNodes] = useState<Konva.Node[]>([]);

  const isSelected = (id: string) => selected.includes(id);

  const onObjectSelect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const target = e.target;

    if (!target) {
      return;
    }

    if (target.getType() === 'Stage') {
      setImageTransformerNodes([]);
      setTextTransformerNodes([]);
      setMultiTransformerNodes([]);
      setSelectedNodes([]);
      dispatch(selectedObjectActions.resetAll());
      return;
    }

    if (isKeyPressed) {
      setImageTransformerNodes([]);
      setTextTransformerNodes([]);
      if (selectedNodes.includes(target)) {
        const sNodes = selectedNodes.filter((node) => node !== target);
        setMultiTransformerNodes([...sNodes]);
        setSelectedNodes([...sNodes]);
        dispatch(selectedObjectActions.removeOne(target.attrs.id));
      } else {
        setMultiTransformerNodes([...selectedNodes, target]);
        setSelectedNodes([...selectedNodes, target]);
        dispatch(selectedObjectActions.addOne(target.attrs.id));
      }
      return;
    }

    if (target.attrs.type === StageObjectType.IMAGE || target.attrs.type === StageObjectType.SHAPE) {
      setImageTransformerNodes([target]);
      setTextTransformerNodes([]);
      setMultiTransformerNodes([]);
      setSelectedNodes([target]);
      dispatch(selectedObjectActions.setAll([target.attrs.id]));
      return;
    }

    if (target.attrs.type === StageObjectType.TEXT) {
      setImageTransformerNodes([]);
      setTextTransformerNodes([target]);
      setMultiTransformerNodes([]);
      setSelectedNodes([target]);
      dispatch(selectedObjectActions.setAll([target.attrs.id]));
      return;
    }
  };

  const setImageTransformerNodes = (nodes: Konva.Node[]) => {
    imageTransformer?.current?.nodes(nodes);
    imageTransformer?.current?.getLayer()?.batchDraw();
  };

  const setTextTransformerNodes = (nodes: Konva.Node[]) => {
    textTransformer?.current?.nodes(nodes);
    textTransformer?.current?.getLayer()?.batchDraw();
  };

  const setMultiTransformerNodes = (nodes: Konva.Node[]) => {
    multiTransformer?.current?.nodes(nodes);
    multiTransformer?.current?.getLayer()?.batchDraw();
  };

  const resetObjectSelect = () => {
    setImageTransformerNodes([]);
    setTextTransformerNodes([]);
    setMultiTransformerNodes([]);
    setSelectedNodes([]);
    dispatch(selectedObjectActions.resetAll());
  };

  return { onObjectSelect, resetObjectSelect, selected, isSelected };
};

export default useObjectSelect;
