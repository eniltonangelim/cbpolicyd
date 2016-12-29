import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataQuotasLimitsService implements InMemoryDbService {
  createDb() {
    let quotasLimits = [
        {id: 1, quotasID: 1, type: 'MessageCount', counterLimit: 10, comment: '', disabled: 0},
        {id: 2, quotasID: 1, type: 'MessageCumulativeSize', counterLimit: 8000, comment: '', disabled: 0 },
        {id: 3, quotasID: 2, type: 'MessageCount', counterLimit: 12, comment: '', disabled: 0 },
        {id: 4, quotasID: 1, type: 'MessageCount', counterLimit: 15, comment: '', disabled: 1 }    
    ]
    return {quotasLimits};
  }
}