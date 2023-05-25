export interface ICanvasPayload {
  name: string;
  description: string;
  content: string;
}

export interface ICanvasResponse extends ICanvasPayload {
  id: string;
  updatedAt: string;
  createdAt: string;
}
