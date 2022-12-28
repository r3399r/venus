import { inject, injectable } from 'inversify';
import { DbAccess } from 'src/access/DbAccess';
import { TreasureAccess } from 'src/access/TreasureAccess';
import { BadRequestError } from 'src/celestial-service/error';
import { PutTreasureRequest } from 'src/model/Api';
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

  public async cleanup() {
    await this.dbAccess.cleanup();
  }

  public async getTreasureList() {
    return await this.treasureAccess.find();
  }

  public async reviseTreasureStatus(data: PutTreasureRequest) {
    if (data.answer === '2') {
      const treasure = new TreasureEntity();
      treasure.userId = data.userId;
      treasure.stage = data.stage;
      treasure.status = 'pass';

      await this.treasureAccess.save(treasure);
    } else throw new BadRequestError('wrong!');
  }
}
