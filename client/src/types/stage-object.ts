import { FontVariant } from './google-font-type';

export enum StageObjectType {
  IMAGE = 'image',
  TEXT = 'text',
  SHAPE = 'shape',
}

export type StageObjectData = {
  type: StageObjectType;
  width: number;
  height: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  scaleX: number;
  scaleY: number;
  draggable: boolean;
  z_index: number;
  updatedAt: number;
} & Record<string, any>;

export type StageObject = {
  id: string;
  data: StageObjectData;
} & Record<string, any>;

export type StageImageFilterValues = {
  brighten?: number;
  contrast?: number;
  red?: number;
  green?: number;
  blue?: number;
};

export type StageImageData = {
  src: string;
  filterNames: FilterName[];
  filterValues: StageImageFilterValues;
} & StageObjectData;

export type StageTextData = {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontVariants: FontVariant[];
  webFont: boolean; // is installed by default
  lineHeight: number;
  letterSpacing: number;
  fill: string;
  rotation: number;
  fontStyle: 'normal' | 'italic' | 'bold' | 'italic bold'; // due to Konva Text typings
  align: 'left' | 'center' | 'right' | 'justify';
  textDecoration: '' | 'underline' | 'line-through' | 'underline line-through';
} & StageObjectData;

export type GenericStageObject<Type> = {
  id: string;
  data: Type;
};

export type StageTextObjectData = GenericStageObject<StageTextData>;

export type StageObjectPartial = {
  id: string;
  data: Partial<StageObjectData>;
};

export enum FilterName {
  brighten = 'Brighten',
  contrast = 'Contrast',
  grayscale = 'Grayscale',
  invert = 'Invert',
  rgb = 'RGB',
}

export type FilterValue = {
  name: FilterName;
  min?: number;
  max?: number;
  step?: number;
};

export const RGB_FILTERS = ['red', 'green', 'blue'];
