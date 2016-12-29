import {Injectable}             from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import {PolicyGroupMembers}           from '../../../model/policy.group.members';
import '../../../rxjs/rxjs-extensions';

@Injectable()
export class PolicyGroupMembersService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private policyGroupMembersURL = 'api/policyGroupMembers';

    constructor(private http: Http) {}

    getPolicyGroupMembers(): Promise<PolicyGroupMembers[]>{
        return this.http.get(this.policyGroupMembersURL)
            .toPromise()
            .then(response => response.json().data as PolicyGroupMembers[]);
    }

    getPolicyMember(id: number): Promise<PolicyGroupMembers> {
        const url = `${this.policyGroupMembersURL}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as PolicyGroupMembers);
    }

    getPolicyGroupMembersbyPolicyGroupID(id: number): Promise<PolicyGroupMembers[]> {
        const url = `${this.policyGroupMembersURL}?policyGroupID=${id}`;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as PolicyGroupMembers[]);
    }

    delete(id: number): Promise<void> {
        const url = `${this.policyGroupMembersURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(policyGroupMembers: PolicyGroupMembers): Promise<any> {
        console.log(policyGroupMembers)
        return this.http
        .post(this.policyGroupMembersURL, JSON.stringify(policyGroupMembers), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(policyGroupMembers: PolicyGroupMembers): Promise<PolicyGroupMembers> {
        const url = `${this.policyGroupMembersURL}/${policyGroupMembers.id}`;
        return this.http
        .put(url, JSON.stringify(PolicyGroupMembers), {headers: this.headers})
        .toPromise()
        .then(() => PolicyGroupMembers)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}