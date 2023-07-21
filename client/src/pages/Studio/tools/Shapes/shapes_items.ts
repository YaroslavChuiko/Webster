import { ShapeType } from '~/types/shape-type';
import { INIT_HEX_COLOR } from '~/consts/stage-object';
import squareUrl from '~/assets/shapes/square.png';
import circleUrl from '~/assets/shapes/circle.png';
import triangleUrl from '~/assets/shapes/triangle.png';
import pentagonUrl from '~/assets/shapes/pentagon.png';
import hexagonUrl from '~/assets/shapes/hexagon.png';
import heptagonUrl from '~/assets/shapes/heptagon.png';
import octagonUrl from '~/assets/shapes/octagon.png';
import star4Url from '~/assets/shapes/star-4.png';
import star5Url from '~/assets/shapes/star-5.png';
import star6Url from '~/assets/shapes/star-6.png';
import arrowUrl from '~/assets/shapes/arrow.png';

export type shapeItemType = {
  name: string;
  shapeType: ShapeType;
};

export const shapesItems = [
  {
    src: squareUrl,
    name: 'Square',
    shapeType: ShapeType.RECT,
    strokeScaleEnabled: false,
  },
  {
    src: circleUrl,
    name: 'Circle',
    shapeType: ShapeType.CIRCLE,
    strokeScaleEnabled: false,
  },
  {
    src: triangleUrl,
    name: 'Triangle',
    shapeType: ShapeType.POLYGON,
    sides: 3,
    strokeScaleEnabled: false,
  },
  {
    src: pentagonUrl,
    name: 'Pentagon',
    shapeType: ShapeType.POLYGON,
    sides: 5,
    strokeScaleEnabled: false,
  },
  {
    src: hexagonUrl,
    name: 'Hexagon',
    shapeType: ShapeType.POLYGON,
    sides: 6,
    strokeScaleEnabled: false,
  },
  {
    src: heptagonUrl,
    name: 'Heptagon',
    shapeType: ShapeType.POLYGON,
    sides: 7,
    strokeScaleEnabled: false,
  },
  {
    src: octagonUrl,
    name: 'Octagon',
    shapeType: ShapeType.POLYGON,
    sides: 8,
    strokeScaleEnabled: false,
  },
  {
    src: star4Url,
    name: 'Star 4',
    shapeType: ShapeType.STAR,
    numPoints: 4,
    innerRadius: 15,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: star5Url,
    name: 'Star 5',
    shapeType: ShapeType.STAR,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: star6Url,
    name: 'Star 6',
    shapeType: ShapeType.STAR,
    numPoints: 6,
    innerRadius: 30,
    outerRadius: 70,
    strokeScaleEnabled: false,
  },
  {
    src: arrowUrl,
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
