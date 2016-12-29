import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataPolicyGroupMembersService implements InMemoryDbService {
  createDb() {
    let policyGroupMembers = [
        {id: 1, policyGroupID: 1, member: '10.0.0.0/8',   disabled: 0, comment: ''},
        {id: 2, policyGroupID: 2, member: '@example.org', disabled: 0, comment: ''},
        {id: 3, policyGroupID: 2, member: '@example.com', disabled: 0, comment: ''}
    ]
    return {policyGroupMembers};
  }
}

