import {Injectable}             from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import {PolicyGroups}           from '../../../model/policy.groups';
import '../../../rxjs/rxjs-extensions';

@Injectable()
export class PolicyGroupsService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private policyGroupsURL = 'api/policyGroups';

    constructor(private http: Http) {}

    getPolicyGroups(): Promise<PolicyGroups[]>{
        return this.http.get(this.policyGroupsURL)
            .toPromise()
            .then(response => response.json().data as PolicyGroups[]);
    }

    getPolicyGroup(id: number): Promise<PolicyGroups> {
        const url = `${this.policyGroupsURL}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as PolicyGroups);
    }

    delete(id: number): Promise<void> {
        const url = `${this.policyGroupsURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(policyGroups: PolicyGroups): Promise<any> {
        return this.http
        .post(this.policyGroupsURL, JSON.stringify(policyGroups), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(policyGroups: PolicyGroups): Promise<PolicyGroups> {
        const url = `${this.policyGroupsURL}/${policyGroups.id}`;
        return this.http
        .put(url, JSON.stringify(policyGroups), {headers: this.headers})
        .toPromise()
        .then(() => policyGroups)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}