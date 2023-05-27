export interface ICanvasPayload {
  name: string;
  description: string;
  content: string;
}

export interface ICanvas extends ICanvasPayload {
  id: string;
  updatedAt: string;
  createdAt: string;
}

export interface ICanvasResponse {
  canvases: ICanvas[];
  count: number;
}

export interface ICanvasParams {
  take?: number;
  skip?: number;
}
