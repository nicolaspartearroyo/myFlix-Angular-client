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

export class MovieCardComponent implements OnInit {
  isLoading = false;
  movies: any[] = [];
  faves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * Get all Movies
  */
  getMovies(): void {
    this.isLoading = true;
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.isLoading = false;
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }


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


  openMovieSynopsis(Title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, description },
      width: '650px'
    });
  }

  /**
   * Adds move to users favorites list
  */
  addToFavoriteMoviesList(id: string, Title: string): void {
    this.fetchApiData.addToFavoriteMoviesList(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  /**
   * Removed movie from users favorites list
  */
  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  /**
   * Returns a list of the users favorites movie._id's
  */
  getUsersFavs(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.Favorites;
      //console.log(this.faves);
      return this.faves;
    });
  }
  /**
   * Compares movie id's with getUsersFavs returned list to set the Favorites icon to add/remove correctly
  */
  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}