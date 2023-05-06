import { ShapeType } from '~/types/shape-type';
import { INIT_HEX_COLOR } from '~/consts/stage-object';

export type shapeItemType = {
  name: string;
  shapeType: ShapeType;
};

export const shapesItems = [
  {
    name: 'Square',
    shapeType: ShapeType.RECT,
  },
  {
    name: 'Circle',
    shapeType: ShapeType.CIRCLE,
  },
  {
    name: 'Trianle',
    shapeType: ShapeType.POLYGON,
    sides: 3,
  },
  {
    name: 'Pentagon',
    shapeType: ShapeType.POLYGON,
    sides: 5,
  },
  {
    name: 'Hexagon',
    shapeType: ShapeType.POLYGON,
    sides: 6,
  },
  {
    name: 'Heptagon',
    shapeType: ShapeType.POLYGON,
    sides: 7,
  },
  {
    name: 'Octagon',
    shapeType: ShapeType.POLYGON,
    sides: 8,
  },
  {
    name: 'Star 4',
    shapeType: ShapeType.STAR,
    numPoints: 4,
    innerRadius: 15,
    outerRadius: 70,
  },
  {
    name: 'Star 5',
    shapeType: ShapeType.STAR,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 70,
  },
  {
    name: 'Star 6',
    shapeType: ShapeType.STAR,
    numPoints: 6,
    innerRadius: 30,
    outerRadius: 70,
  },
  {
    name: 'Arrow',
    shapeType: ShapeType.ARROW,
    points: [0, 0, 50, 0],
    pointerLength: 15,
    pointerWidth: 15,
    stroke: INIT_HEX_COLOR,
    strokeWidth: 4,
  },
];
