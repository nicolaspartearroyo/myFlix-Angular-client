import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  // Store the movies returned by the API call.
  movies: any[] = [];
  faves: any[] = [];
  isLoading = false;
  // Set user's username.
  username = localStorage.getItem('username');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    // this.getUsersFavs();

  }

  //Get all movies from the API 
  getMovies(): void {
    this.isLoading = true;
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.isLoading = false;
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }

  //Open modal with movie description
  openMovieSynopsis(Title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, description },
      width: '650px'
    });
  }

  //Open modal with movie Genre data
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '650px'
    });
  }


  openDirectorDialog(name: string, bio: string, birthdate: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birthdate },
      width: '650px'
    });
  }

  // Add or remove movies from the Favorites list.
  toggleFavoriteMovie(movieId: any, Title: any): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      const favoriteMovies = resp.FavoriteMovies;

      if (favoriteMovies.includes(movieId)) {
        this.fetchApiData
          .removeMovieFavorites(this.username, movieId)
          .subscribe(() => {
            this.snackBar.open(
              `"${Title}" removed from your Favorites list!`,
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
              `"${Title}" added to your Favorites list!`,
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
