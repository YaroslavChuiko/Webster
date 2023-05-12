import { ShapeType } from '~/types/shape-type';
import { INIT_HEX_COLOR } from '~/consts/stage-object';

export type shapeItemType = {
  name: string;
  shapeType: ShapeType;
};

const SHAPES_FOLDER_PATH = '~/../public/shapes';

export const shapesItems = [
  {
    src: `${SHAPES_FOLDER_PATH}/square.png`,
    name: 'Square',
    shapeType: ShapeType.RECT,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/circle.png`,
    name: 'Circle',
    shapeType: ShapeType.CIRCLE,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/trianle.png`,
    name: 'Trianle',
    shapeType: ShapeType.POLYGON,
    sides: 3,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/pentagon.png`,
    name: 'Pentagon',
    shapeType: ShapeType.POLYGON,
    sides: 5,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/hexagon.png`,
    name: 'Hexagon',
    shapeType: ShapeType.POLYGON,
    sides: 6,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/heptagon.png`,
    name: 'Heptagon',
    shapeType: ShapeType.POLYGON,
    sides: 7,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/octagon.png`,
    name: 'Octagon',
    shapeType: ShapeType.POLYGON,
    sides: 8,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/star-4.png`,
    name: 'Star 4',
    shapeType: ShapeType.STAR,
    numPoints: 4,
    innerRadius: 15,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/star-5.png`,
    name: 'Star 5',
    shapeType: ShapeType.STAR,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/star-6.png`,
    name: 'Star 6',
    shapeType: ShapeType.STAR,
    numPoints: 6,
    innerRadius: 30,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: `${SHAPES_FOLDER_PATH}/arrow.png`,
    name: 'Arrow',
    shapeType: ShapeType.ARROW,
    points: [0, 0, 50, 0],
    pointerLength: 15,
    pointerWidth: 15,
    stroke: INIT_HEX_COLOR,
    strokeWidth: 4,
    pointerAtEnding: true,
  },
];
