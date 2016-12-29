import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataPoliciesService implements InMemoryDbService {
  createDb() {
    let policies = [
        {id: 1, name: 'Default', priority: 0, description: 'Default System Policy', disabled: 0},
        {id: 2, name: 'Default Outbound', priority: 10, description: 'Default Outbound System', disabled: 0},
        {id: 3, name: 'Default Inbound', priority: 10, description: 'Default Inbound System Policy', disabled: 0},
        {id: 4, name: 'Default Internal', priority: 20, description: 'Default Internal System Policy', disabled: 0}
    ]

    let quotas = [
        {id: 1, policyID: 5, name: 'Recipient quotas', track: 'Recipient:user@domain', period: 3600 , verdict: 'REJECT', data: '', lastQuota: 0, comment: '', disabled: 0},
        {id: 2, policyID: 5, name: 'Quota on all /24s', track: 'SenderIP:/24', period: 3600, verdict: 'REJECT', data: '', lastQuota: 0, comment: '', disabled: 0}
    ]

    let accessControl =[
        {id: 1, policyID: 3, name: 'homologa_acl', verdict: 'REJECT', data: 'Access Denied', comment: 'Somente envio local', disabled: 0}
    ]

    let policyGroups = [
        {id: 1, name: 'internal_ips',     disabled: 0, comment: ''},
        {id: 2, name: 'internal_domains', disabled: 0, comment: ''}
    ]

    let policyGroupMembers = [
        {id: 1, policyGroupID: 1, member: '10.0.0.0/8',   disabled: 0, comment: ''},
        {id: 2, policyGroupID: 2, member: '@example.org', disabled: 0, comment: ''},
        {id: 3, policyGroupID: 2, member: '@example.com', disabled: 0, comment: ''}
    ]

    let policyMembers = [
        {id: 1, policyID: 1, source: '', destination: '', comment: '', disabled: 0},
        {id: 2, policyID: 2, source: '%internal_ips,%internal_domains', destination: '!%internal_domains', comment: '', disabled: 0},
        {id: 3, policyID: 3, source: '!%internal_ips,!%internal_domains', destination: '%internal_domains', comment: '' , disabled: 0},
        {id: 4, policyID: 4, source: '%internal_ips,%internal_domains', destination: '%internal_domains', comment: '', disabled: 0},
        {id: 5, policyID: 2, source: '@example.net', destination: '@f13.com.br', comment: '', disabled: 0}
    ];

    return {policies, quotas, accessControl, policyGroups, policyMembers, policyGroupMembers};
    
  }
}