import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { MessageService } from './message.service'
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  constructor(private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]>
  {
    this.messageService.add(`HeroService: fetched heroes`)
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`heroService: fetched hero id=${id}`);

    return of(new Hero[''].find(hero => hero.id === id))
          .pipe(
            catchError(this.handleError('getHeroes',[]))
            );
  }
  log(message: string): void {
    this.messageService.add('HeroService: ' + message);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.F
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
