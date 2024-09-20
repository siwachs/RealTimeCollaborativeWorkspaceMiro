export type Color = { r: number; g: number; b: number };

export type Camera = { x: number; y: number };

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export interface XYWH {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Layer extends XYWH {
  fill: Color;
  value?: string;
}

export interface RectangleLayer extends Layer {
  type: LayerType.Rectangle;
}

export interface EllipseLayer extends Layer {
  type: LayerType.Ellipse;
}

export interface PathLayer extends Layer {
  type: LayerType.Path;
  points: number[][];
}

export interface TextLayer extends Layer {
  type: LayerType.Text;
}

export interface NoteLayer extends Layer {
  type: LayerType.Note;
}

export type Point = {
  x: number;
  y: number;
};

export enum Side {
  Top = 1,
  Right = 8,
  Bottom = 2,
  Left = 4,
}

export enum CanvasMode {
  NONE,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type CanvasState =
  | {
      mode: CanvasMode.NONE;
    }
  | { mode: CanvasMode.SelectionNet; origin: Point; current?: Point }
  | { mode: CanvasMode.Translating; current: Point }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Rectangle
        | LayerType.Ellipse
        | LayerType.Text
        | LayerType.Note;
    }
  | { mode: CanvasMode.Pencil }
  | { mode: CanvasMode.Pressing; origin: Point }
  | { mode: CanvasMode.Resizing; initialBounds: XYWH; corner: Side };
