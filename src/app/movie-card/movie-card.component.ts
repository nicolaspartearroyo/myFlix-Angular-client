// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  openMovieSynopsis(Title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, description },
      width: '650px'
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
      width: '650px'
    });
  }

  //   directorDetails(name: string, bio: string): void {
  //     this.dialog.open(MovieDirectorComponent, {
  //       data: { name, bio },
  //     });
  //   }
}
