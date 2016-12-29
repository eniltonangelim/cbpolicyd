import {Injectable}             from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import {QuotasLimits}           from '../../../model/quotas.limits';
import '../../../rxjs/rxjs-extensions';

@Injectable()
export class QuotasLimitsService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private quotasLimitsURL = 'api/quotasLimits';

    constructor(private http: Http) {}

    getQuotasLimits(): Promise<QuotasLimits[]>{
        return this.http.get(this.quotasLimitsURL)
            .toPromise()
            .then(response => response.json().data as QuotasLimits[]);
    }

    getPolicyMember(id: number): Promise<QuotasLimits> {
        const url = `${this.quotasLimitsURL}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as QuotasLimits);
    }

    getQuotasLimitsbyQuotasID(id: number): Promise<QuotasLimits[]> {
        const url = `${this.quotasLimitsURL}?policyGroupID=${id}`;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as QuotasLimits[]);
    }

    delete(id: number): Promise<void> {
        const url = `${this.quotasLimitsURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(quotasLimits: QuotasLimits): Promise<any> {
        console.log(quotasLimits)
        return this.http
        .post(this.quotasLimitsURL, JSON.stringify(quotasLimits), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(quotasLimits: QuotasLimits): Promise<QuotasLimits> {
        const url = `${this.quotasLimitsURL}/${quotasLimits.id}`;
        return this.http
        .put(url, JSON.stringify(quotasLimits), {headers: this.headers})
        .toPromise()
        .then(() => QuotasLimits)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}