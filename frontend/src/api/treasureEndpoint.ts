import { GetTreasureResponse } from '../model/Api';
import http from '../util/http';

const getTreasure = async () => await http.get<GetTreasureResponse>('treasure');

//   const putTreasure = async (data: PostBookRequest) =>
//     await http.post<PostBookResponse>('book', { data });

export default {
  getTreasure,
  // putTreasure
};
