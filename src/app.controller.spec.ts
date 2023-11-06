jest.mock('./app.service');

import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateReceivableWebRequest } from './wr/create-receivable.wr';
import { Receivable } from './schema/receivable.schema';
import { UpdateReceivableWebRequest } from './wr/update-receivable.wr';

describe('AppController', () => {
  const mockReceivable: Receivable = new Receivable(
    'danielle',
    12000000,
    48,
    4,
  );

  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('findAll', () => {
    it('should create a receivable', () => {
      const createReceivableWebRequest: CreateReceivableWebRequest = {
        clientName: mockReceivable.clientName,
        totalDebt: mockReceivable.monthPaid,
        tenure: mockReceivable.tenure,
      };
      const spy = jest.spyOn(appService, 'postReceivable');
      appController.create(createReceivableWebRequest);
      expect(spy).toHaveBeenCalledWith(createReceivableWebRequest);
    });

    it('should get a receivable by id', async () => {
      const id = 1;
      jest.spyOn(appService, 'getReceivable').mockResolvedValue(mockReceivable);
      const result = await appController.getReceivable({ id });
      expect(result).toEqual(mockReceivable);
    });

    it('should update a receivable by id', () => {
      const id = 'some-id';
      const updateReceivableWebRequest: UpdateReceivableWebRequest = {
        tenure: 48,
        monthPaid: 4,
      };
      const spy = jest.spyOn(appService, 'updateReceivable');
      appController.updateReceivable({ id }, updateReceivableWebRequest);
      expect(spy).toHaveBeenCalledWith(id, updateReceivableWebRequest);
    });

    it('should delete a receivable by id', () => {
      const id = 'some-id';
      const spy = jest.spyOn(appService, 'deleteReceivable');
      appController.deleteReceivable({ id });
      expect(spy).toHaveBeenCalledWith(id);
    });
  });
});
