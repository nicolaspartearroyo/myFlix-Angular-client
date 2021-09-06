import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  // Store the favorites movies returned by the API call.
  movies: any[] = [];
  // Set user's username.
  username = localStorage.getItem('username');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // this.getMovies();
    this.getFavoritesMovies();
  }

  // getUsersFavs(): void {
  //   const user = localStorage.getItem('username');
  //   this.fetchApiData.getUser(user).subscribe((resp: any) => {
  //     this.faves = resp.Favorites;
  //     console.log(this.faves);
  //     return this.faves;
  //   });
  // }

  // getUser(): void {
  //   let user = localStorage.getItem('username');
  //   this.fetchApiData.getUser(user).subscribe((res: any) => {
  //     this.user = res;
  //     this.getMovies();
  //   });
  // }

  // getMovies(): void {
  //   this.isLoading = true;
  //   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  //     this.isLoading = false;
  //     this.movies = resp;
  //     return this.filterFavorites();
  //   });
  // }

  // Fetch all movies in user's Favorites list.
  getFavoritesMovies(): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      const favoriteMovies = resp.FavoriteMovies;

      favoriteMovies.forEach((favoriteMovie: any) => {
        this.fetchApiData.getMovie(favoriteMovie).subscribe((resp: any) => {
          this.movies.push(resp);
        });
        return this.movies;
      });
    });
  }

  // Add or remove movies from the Favorites list.
  toggleFavoriteMovie(movieId: any, movieTitle: any): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      const favoriteMovies = resp.FavoriteMovies;

      if (favoriteMovies.includes(movieId)) {
        this.fetchApiData
          .removeMovieFavorites(this.username, movieId)
          .subscribe(() => {
            this.snackBar.open(
              `"${movieTitle}" was removed from your Favorites list!`,
              'OK',
              {
                duration: 3000,
              }
            );
          });
      } else {
        this.fetchApiData
          .addMovieFavorites(this.username, movieId)
          .subscribe(() => {
            this.snackBar.open(
              `"${movieTitle}" was added to your Favorites list!`,
              'OK',
              {
                duration: 3000,
              }
            );
          });
      }
    });
  }
}