import { useState, useEffect } from 'react';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './use-app-selector';
import { setScale } from '~/store/slices/frame-slice';
import useKeyPress from './use-key-press';
import { FRAME_CONTAINER_PADDING } from '~/consts/components';
import { KeyType } from '~/consts/keys';

type Props = {
  stageRef?: React.RefObject<Konva.Stage> | null;
};

const useStageResize = ({ stageRef }: Props) => {
  const dispatch = useDispatch();
  const { width, height, scale } = useAppSelector((state) => state.frame);
  const [boxWidth, setBoxWidth] = useState(500);
  const [boxHeight, setBoxHeight] = useState(500);

  const isKeyPressed = useKeyPress(KeyType.DRAG_STAGE);

  const setStageSize = () => {
    const toolbar = document.querySelector('#toolbar') as HTMLElement;
    const navbar = document.querySelector('#navbar') as HTMLElement;
    const editingToolbar = document.querySelector('#editing_toolbar') as HTMLElement;
    if (toolbar && navbar && editingToolbar) {
      const w = window.innerWidth - toolbar.offsetWidth - FRAME_CONTAINER_PADDING * 2;
      const h = window.innerHeight - navbar.offsetHeight - editingToolbar.offsetHeight - FRAME_CONTAINER_PADDING * 2;

      setBoxWidth(w);
      setBoxHeight(h);

      const wScale = w / width;
      const hScale = h / height;
      if (wScale < hScale) {
        dispatch(setScale({ scale: wScale }));
      } else {
        dispatch(setScale({ scale: hScale }));
      }
    }
  };

  useEffect(() => {
    setStageSize();
  }, [width, height]);

  const setStageCoodrs = () => {
    let x = Math.min(stageRef?.current?.attrs.x || 0, 0);
    let y = Math.min(stageRef?.current?.attrs.y || 0, 0);

    const stageWidth = stageRef?.current?.attrs.width;
    if (stageWidth <= boxWidth) {
      x = 0;
    } else if (stageWidth + x < boxWidth) {
      x = boxWidth - stageWidth;
    }

    const stageHeight = stageRef?.current?.attrs.height;
    if (stageHeight <= boxHeight) {
      y = 0;
    } else if (stageHeight + y < boxHeight) {
      y = boxHeight - stageHeight;
    }

    stageRef?.current?.x(x);
    stageRef?.current?.y(y);
  };

  useEffect(() => {
    setStageCoodrs();
  }, [scale]);

  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true, in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const scaleBy = 1.01;
    dispatch(setScale({ scale: direction > 0 ? scale * scaleBy : scale / scaleBy }));
    setStageCoodrs();
  };

  const handleDragMoveStage = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();

    if (isKeyPressed) {
      stageRef?.current?.startDrag();
    }

    setStageCoodrs();
  };

  return { boxWidth, boxHeight, handleZoom, handleDragMoveStage, setStageSize };
};

export default useStageResize;
