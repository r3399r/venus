import { Treasure } from './Treasure';

export type GetTreasureResponse = Treasure[];

export type PutTreasureRequest = {
  userId: string;
  stage: number;
  answer?: string;
};

export type PutTreasureResponse = Treasure[];
