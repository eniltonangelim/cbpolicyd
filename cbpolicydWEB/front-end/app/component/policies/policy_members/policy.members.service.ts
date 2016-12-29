import {Injectable}             from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import {PolicyMembers}           from '../../../model/policy.members';
import '../../../rxjs/rxjs-extensions';

@Injectable()
export class PolicyMembersService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private policyMembersURL = 'api/policyMembers';

    constructor(private http: Http) {}

    getPolicyMembers(): Promise<PolicyMembers[]>{
        return this.http.get(this.policyMembersURL)
            .toPromise()
            .then(response => response.json().data as PolicyMembers[]);
    }

    getPolicyMember(id: number): Promise<PolicyMembers> {
        const url = `${this.policyMembersURL}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as PolicyMembers);
    }

    getPolicyMembersbyPolicyID(id: number): Promise<PolicyMembers[]> {
        const url = `${this.policyMembersURL}?policyID=${id}`;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as PolicyMembers[]);
    }

    delete(id: number): Promise<void> {
        const url = `${this.policyMembersURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(policyMembers: PolicyMembers): Promise<any> {
        console.log(policyMembers)
        return this.http
        .post(this.policyMembersURL, JSON.stringify(policyMembers), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(policyMembers: PolicyMembers): Promise<PolicyMembers> {
        const url = `${this.policyMembersURL}/${policyMembers.id}`;
        return this.http
        .put(url, JSON.stringify(PolicyMembers), {headers: this.headers})
        .toPromise()
        .then(() => PolicyMembers)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}