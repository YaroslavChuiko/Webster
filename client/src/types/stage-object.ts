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
  draggable: boolean;
} & Record<string, any>;

export type StageObject = {
  id: string;
  data: StageObjectData;
} & Record<string, any>;

export type StageImageData = {
  src: string;
} & StageObjectData;

export type StageTextData = {
  text: string;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  fill: string;
  fontStyle: 'normal' | 'italic' | 'bold' | 'italic bold';
  align: 'left' | 'center' | 'right';
  textDecoration: '' | 'underline' | 'line-through';
} & StageObjectData;

export type StageObjectPartial = {
  id: string;
  data: Partial<StageObjectData>;
};
