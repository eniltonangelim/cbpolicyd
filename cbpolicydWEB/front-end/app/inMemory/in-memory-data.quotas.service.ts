import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataQuotasService implements InMemoryDbService {
  createDb() {
    let quotas = [
        {id: 1, policyGroupID: 5, name: 'Recipient quotas', track: 'Recipient:user@domain', period: 3600 , verdict: 'REJECT', data: '', lastQuota: 0, comment: '', disabled: 0},
        {id: 2, policyGroupID: 5, name: 'Quota on all /24s', track: 'SenderIP:/24', period: 3600, verdict: 'REJECT', data: '', lastQuota: 0, comment: '', disabled: 0}
    ]
    return {quotas};
  }
}