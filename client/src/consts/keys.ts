export enum KeyType {
  MULTISELECT = 'Shift',
  DELETE = 'Delete',
  COPY = 'Ctrl+C',
  PASTE = 'Ctrl+V',
  CUT = 'Ctrl+X',
  DUPLICATE = 'Ctrl+B',
  Z_INDEX_UP = 'Ctrl+Up',
  Z_INDEX_DOWN = 'Ctrl+Down',
  UNDO = 'Ctrl+Z',
  REDO = 'Ctrl+Y',
  DRAG_STAGE = ' ', //space
  UNSELECT = 'Esc',
  ZOOM = 'Mouse wheel',
  SAVE = 'Alt+S',
}

export type KeyWithDescriptionType = {
  key: KeyType | string[];
  description: string;
};

export const KeysWithDescription: KeyWithDescriptionType[] = [
  { key: KeyType.MULTISELECT, description: 'Select multiple objects at once.' },
  { key: KeyType.DELETE, description: 'Delete an object from the stage.' },
  { key: KeyType.COPY, description: 'Copy an object to buffer.' },
  { key: KeyType.PASTE, description: 'Paste the copied object onto the stage.' },
  { key: KeyType.CUT, description: 'Cut an object from the stage.' },
  { key: KeyType.DUPLICATE, description: 'Duplicate an object.' },
  { key: KeyType.Z_INDEX_UP, description: 'Bring an object forward.' },
  { key: KeyType.Z_INDEX_DOWN, description: 'Bring an object backward.' },
  { key: KeyType.UNDO, description: 'Undo the last action.' },
  { key: KeyType.REDO, description: 'Redo the last action.' },
  { key: KeyType.DRAG_STAGE, description: 'Drag the stage.' },
  { key: KeyType.UNSELECT, description: 'Unselect an object.' },
  { key: KeyType.ZOOM, description: 'Zoom in / Zoom out.' },
  { key: KeyType.SAVE, description: 'Save recent changes to the stage.' },
];
