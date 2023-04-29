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
  text?: string;
} & Record<string, any>;

export type StageObject = {
  id: number | string;
  data: StageObjectData;
} & Record<string, any>;
