import { FilterName, StageObjectData, StageObjectType } from '~/types/stage-object';

export const DEFAULT_STAGE_OBJECT = {
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  draggable: true,
  z_index: 0,
  updatedAt: Date.now(),
  offsetX: 0,
  offsetY: 0,
  scaleX: 1,
  scaleY: 1,
};

export const DEFAULT_IMAGE_OBJECT: StageObjectData = {
  ...DEFAULT_STAGE_OBJECT,
  type: StageObjectType.IMAGE,
  filterNames: [FilterName.brighten],
  filterValues: {},
};

export const DEFAULT_TEXT_OBJECT: StageObjectData = {
  ...DEFAULT_STAGE_OBJECT,
  text: 'Your paragraph text',
  width: 300,
  fill: '#000',
  fontSize: 24,
  lineHeight: 1.2,
  letterSpacing: 0,
  fontStyle: 'normal',
  rotation: 0,
  fontFamily: 'Inter Variable',
  fontVariants: ['400', '400italic', '700', '700italic'], //regular, italic, 700, 700italic
  webFont: false,
  align: 'center',
  textDecoration: '',
  type: StageObjectType.TEXT,
};

export const INIT_HEX_COLOR = 'rgba(165, 142, 251, 1)';

export const DEFAULT_SHAPE_OBJECT: StageObjectData = {
  ...DEFAULT_STAGE_OBJECT,
  type: StageObjectType.SHAPE,
  fill: INIT_HEX_COLOR,
  radius: 50,
};
