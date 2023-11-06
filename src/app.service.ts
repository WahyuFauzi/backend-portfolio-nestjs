import { Injectable } from '@nestjs/common';
import { Receivable } from './schema/receivable.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReceivableWebRequest } from './wr/create-receivable.wr';
import { UpdateReceivableWebRequest } from './wr/update-receivable.wr';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Receivable.name) private receivable: Model<Receivable>,
  ) {}

  async postReceivable(createReceivableWebRequest: CreateReceivableWebRequest) {
    this.receivable.create(
      new Receivable(
        createReceivableWebRequest.clientName,
        createReceivableWebRequest.totalDebt,
        createReceivableWebRequest.tenure,
        0,
      ),
    );
  }

  async getReceivable(id: number): Promise<Receivable> {
    return this.receivable.findById(id).exec();
  }

  async updateReceivable(
    id: number,
    updateReceivableWebRequest: UpdateReceivableWebRequest,
  ) {
    const receivable = await this.receivable.findById(id).exec();

    this.receivable.findByIdAndUpdate(
      id,
      new Receivable(
        receivable.clientName,
        receivable.totalDebt,
        updateReceivableWebRequest.tenure,
        updateReceivableWebRequest.monthPaid,
      ),
    );
  }

  async deleteReceivable(id: number) {
    this.receivable.findByIdAndDelete(id).exec();
  }
}
