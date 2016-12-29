import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataPolicyGroupsService implements InMemoryDbService {
  createDb() {
    let policyGroups = [
        {id: 1, name: 'internal_ips',     disabled: 0, comment: ''},
        {id: 2, name: 'internal_domains', disabled: 0, comment: ''}
    ]
    return {policyGroups};
  }
}