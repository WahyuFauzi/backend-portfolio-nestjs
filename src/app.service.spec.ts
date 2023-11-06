import { Receivable } from './schema/receivable.schema';
import { Model } from 'mongoose';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateReceivableWebRequest } from './wr/create-receivable.wr';
import { UpdateReceivableWebRequest } from './wr/update-receivable.wr';

const mockReceivable: Receivable = new Receivable('danielle', 12000000, 48, 4);

describe('AppService', () => {
  let appService: AppService;
  let receivableModel: Model<Receivable>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getModelToken('Receivable'),
          useValue: {
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    receivableModel = module.get<Model<Receivable>>(
      getModelToken('Receivable'),
    );
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('Service method test', () => {
    it('should create a new receivable', async () => {
      const createReceivableWebRequest: CreateReceivableWebRequest = {
        clientName: mockReceivable.clientName,
        totalDebt: mockReceivable.monthPaid,
        tenure: mockReceivable.tenure,
      };

      jest.spyOn(receivableModel, 'create');

      await appService.postReceivable(createReceivableWebRequest);

      expect(receivableModel.create).toHaveBeenCalledWith(
        new Receivable(
          createReceivableWebRequest.clientName,
          createReceivableWebRequest.totalDebt,
          createReceivableWebRequest.tenure,
          0,
        ),
      );
    });

    it('should get a receivable', async () => {
      jest.spyOn(receivableModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockReceivable),
      } as any);

      const retrievedReceivable = await appService.getReceivable(1);

      expect(retrievedReceivable).toEqual(mockReceivable);
    });

    it('should update a receivable', async () => {
      jest.spyOn(receivableModel, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockReceivable),
      } as any);

      const updateReceivableWebRequest: UpdateReceivableWebRequest = {
        tenure: 48,
        monthPaid: 1,
      };

      jest.spyOn(receivableModel, 'findByIdAndUpdate');

      await appService.updateReceivable(1, updateReceivableWebRequest);

      expect(receivableModel.findByIdAndUpdate).toHaveBeenCalledWith(
        1,
        new Receivable(
          mockReceivable.clientName,
          mockReceivable.totalDebt,
          updateReceivableWebRequest.tenure,
          updateReceivableWebRequest.monthPaid,
        ),
      );
    });

    it('should delete a receivable', async () => {
      const id = 1;
      jest.spyOn(receivableModel, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn(),
      } as any);

      await appService.deleteReceivable(id);

      expect(receivableModel.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(receivableModel.findByIdAndDelete).toHaveBeenCalledTimes(id);
    });
  });
});
