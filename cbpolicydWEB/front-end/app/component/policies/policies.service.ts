import {Injectable}         from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import '../../rxjs/rxjs-extensions';
import {Policies}         from '../../model/policies';

@Injectable()
export class PoliciesService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private policiesURL = 'api/policies';

    constructor(private http: Http) {}

    getPolicies(): Promise<Policies[]>{
        return this.http.get(this.policiesURL)
            .toPromise()
            .then(response => response.json().data as Policies[]);
    }

    getPolicy(id: number): Promise<Policies> {
    const url = `${this.policiesURL}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Policies);
    }

    delete(id: number): Promise<void> {
        const url = `${this.policiesURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(policy: Policies): Promise<any> {
        return this.http
        .post(this.policiesURL, JSON.stringify(policy), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(policies: Policies): Promise<Policies> {
        const url = `${this.policiesURL}/${policies.id}`;
        return this.http
        .put(url, JSON.stringify(policies), {headers: this.headers})
        .toPromise()
        .then(() => policies)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}