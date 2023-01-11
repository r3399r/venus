import { GetTreasureResponse, PutTreasureRequest, PutTreasureResponse } from '../model/Api';
import http from '../util/http';

const getTreasure = async () =>
  await http.get<GetTreasureResponse>('treasure', { headers: { 'x-api-code': 'qq' } });

const putTreasure = async (data: PutTreasureRequest) =>
  await http.put<PutTreasureResponse, PutTreasureRequest>('treasure', { data });

export default {
  getTreasure,
  putTreasure,
};
