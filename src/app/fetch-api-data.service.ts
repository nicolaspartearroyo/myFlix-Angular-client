import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaration of the api url which will fetch with the app
const apiUrl = 'https://myflixbypartearroyo.herokuapp.com/';

// registration
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject HttpClient module to constructor
  constructor(private http: HttpClient, private router: Router) { }

  /**
  * @param userData  Provided from API, Username, Password, Email, Birthdate, Favorite Movies.
  */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
    * Endpoint for user login.
  */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete user profile
  */
  public deleteUser(): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
     * Fetch all movies
     * @retuns All the movies
    */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Fetch user details
  * @param user Username is required.
  * @returns User details
 */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'users/' + user, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Update user details
  * @param userDetails Fetched from input forn, exludes Username. If included will return 500 error
  * @param user Username required
  * @returns Updates users details
 */
  editUserProfile(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.put(apiUrl + 'users/' + user, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie endpoint (Endpoint: 'movies/:title', Method: GET).
  public getMovie(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `movies/${movieTitle}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Get directors endpoint
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get Genre endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get Favorites list from user
  public getFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `users/${username}/favourties/`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Add movie to Favorites list (Endpoint: 'users/:username/favorites/:movie_id', Method: POST).
  public addMovieFavorites(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Remove movie from Favorites list (Endpoint: 'users/:username/favorites/:movie_id', Method: DELETE).
  public removeMovieFavorites(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .delete(apiUrl + `users/${username}/favourites/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }
  // Non-typed response extraction
  private extractResponseData(res: any | object): any {
    const body = res;
    return body || {};
  }

  // hadle errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}