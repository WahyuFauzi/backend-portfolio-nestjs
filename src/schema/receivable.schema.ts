import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReceivableDocument = HydratedDocument<Receivable>;

@Schema()
export class Receivable {
  constructor(clientName, totalDebt, tenure, monthPaid) {
    this.clientName = clientName;
    this.totalDebt = totalDebt;
    this.tenure = tenure;
    this.monthPaid = monthPaid;
  }

  @Prop()
  clientName: string;

  @Prop()
  totalDebt: number;

  @Prop()
  tenure: number;

  @Prop()
  monthPaid: number;
}

export const ReceivableSchema = SchemaFactory.createForClass(Receivable);
