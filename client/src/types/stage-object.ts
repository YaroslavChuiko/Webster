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
  z_index: number;
  updatedAt: number;
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
  font: {
    family: string;
    variants: string[];
    webFont: boolean; //is installed by default
  };
  lineHeight: number;
  letterSpacing: number;
  fill: string;
  rotation: number;
  fontStyle: 'normal' | 'italic' | 'bold' | 'italic bold';
  align: 'left' | 'center' | 'right';
  textDecoration: '' | 'underline' | 'line-through';
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
