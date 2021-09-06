import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent implements OnInit {
  constructor(

    // User injected to get the movie Title and desciption
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      description: string
    },
  ) { }

  ngOnInit(): void {
  }

}