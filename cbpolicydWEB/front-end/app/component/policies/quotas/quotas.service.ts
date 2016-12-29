import {Injectable}         from '@angular/core';
import {Response, Http, Headers}    from '@angular/http';
import {Quotas}         from '../../../model/quotas';
import '../../../rxjs/rxjs-extensions';

@Injectable()
export class QuotasService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private quotasURL = 'api/quotas';

    constructor(private http: Http) {}

    getQuotas(): Promise<Quotas[]>{
        return this.http.get(this.quotasURL)
            .toPromise()
            .then(response => response.json().data as Quotas[]);
    }

    getQuota(id: number): Promise<Quotas> {
    const url = `${this.quotasURL}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Quotas);
    }

    delete(id: number): Promise<void> {
        const url = `${this.quotasURL}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }

    create(quota: Quotas): Promise<any> {
        return this.http
        .post(this.quotasURL, JSON.stringify(quota), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    }

    update(quotas: Quotas): Promise<Quotas> {
        const url = `${this.quotasURL}/${quotas.id}`;
        return this.http
        .put(url, JSON.stringify(quotas), {headers: this.headers})
        .toPromise()
        .then(() => quotas)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}