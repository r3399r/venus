import { Client } from '@line/bot-sdk';
import { inject, injectable } from 'inversify';
import { DbAccess } from 'src/access/DbAccess';
import { TreasureAccess } from 'src/access/TreasureAccess';
import { BadRequestError } from 'src/celestial-service/error';
import { GetTreasureResponse, PutTreasureRequest } from 'src/model/Api';
import { TreasureEntity } from 'src/model/TreasureEntity';

/**
 * Service class for treasure
 */
@injectable()
export class TreasureService {
  @inject(DbAccess)
  private readonly dbAccess!: DbAccess;

  @inject(TreasureAccess)
  private readonly treasureAccess!: TreasureAccess;

  @inject(Client)
  private readonly client!: Client;

  public async cleanup() {
    await this.dbAccess.cleanup();
  }

  public async getTreasureList(): Promise<GetTreasureResponse> {
    const res = await this.treasureAccess.find();

    const userSet = new Set([...res.map((v) => v.userId)]);
    const userArray = [...userSet];
    const userProfile = await Promise.all(
      userArray.map((v) => this.client.getProfile(v))
    );

    return res.map((v) => {
      const user = userProfile.find((o) => o.userId === v.userId);

      return {
        ...v,
        displayName: user?.displayName ?? '(unknown)',
      };
    });
  }

  public async reviseTreasureStatus(data: PutTreasureRequest) {
    const res = await this.treasureAccess.findByUserIdAndStage(
      data.userId,
      data.stage
    );
    if (res !== null && res.status === 'pass') return;

    if (data.stage === 1)
      if (data.answer === '2') {
        const treasure = new TreasureEntity();
        treasure.userId = data.userId;
        treasure.stage = data.stage;
        treasure.status = 'pass';

        await this.treasureAccess.save(treasure);
      } else throw new BadRequestError('wrong!');
    else if (data.stage === 2) {
      if (res === null) return;
      await this.treasureAccess.update({ ...res, status: 'pass' });
    }
  }
}
