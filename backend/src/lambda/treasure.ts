import { bindings } from 'src/bindings';
import {
  BadRequestError,
  InternalServerError,
} from 'src/celestial-service/error';
import { errorOutput, successOutput } from 'src/celestial-service/LambdaOutput';
import {
  LambdaContext,
  LambdaEvent,
  LambdaOutput,
} from 'src/celestial-service/model/Lambda';
import { TreasureService } from 'src/logic/TreasureService';
import { PutTreasureRequest } from 'src/model/Api';
import { BindingsHelper } from 'src/util/BindingsHelper';

export async function treasure(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  let service: TreasureService | null = null;
  try {
    BindingsHelper.bindClientConfig({
      channelAccessToken: String(process.env.CHANNEL_TOKEN),
      channelSecret: String(process.env.CHANNEL_SECRET),
    });

    service = bindings.get(TreasureService);

    let res: unknown;

    switch (event.resource) {
      case '/api/treasure':
        res = await apiTreasure(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  } finally {
    await service?.cleanup();
  }
}

async function apiTreasure(event: LambdaEvent, service: TreasureService) {
  switch (event.httpMethod) {
    case 'GET':
      return service.getTreasureList();
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.reviseTreasureStatus(
        JSON.parse(event.body) as PutTreasureRequest
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}
