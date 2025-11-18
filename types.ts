export interface Photo {
  id: number;
  url: string;
  caption: string;
}

export enum AppState {
  LOCKED = 'LOCKED',
  LETTER = 'LETTER',
  GALLERY = 'GALLERY',
  CAKE = 'CAKE',
  WISH = 'WISH'
}