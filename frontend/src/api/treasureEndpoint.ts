import { GetTreasureResponse, PutTreasureRequest } from '../model/Api';
import http from '../util/http';

const getTreasure = async () =>
  await http.get<GetTreasureResponse>('treasure', { headers: { 'x-api-code': 'qq' } });

const putTreasure = async (data: PutTreasureRequest) =>
  await http.put<PutTreasureRequest>('treasure', { data });

export default {
  getTreasure,
  putTreasure,
};
