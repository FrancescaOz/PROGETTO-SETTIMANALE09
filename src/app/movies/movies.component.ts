import { Component, OnInit } from '@angular/core';
import { MoviesService, Movie2 } from './movies.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies!: Movie2[];
  constructor(private movieSrv: MoviesService) { }

   async ngOnInit() {
     this.movies = await this.movieSrv.getPopularMovies();
     console.log(this.movies);
  }

   async addFav(idM: number, i: number) {
    this.movies[i].favoriteb = true;
    try {
     const newFav:any = await (await this.movieSrv.addFavorite(idM)).toPromise();
      this.movies[i].favoriteb = false;
       this.movies[i] = {...this.movies[i],favoriteId:newFav.id}
     } catch (error) {
       this.movies[i].favoriteb = false;
       alert(error);
    }
   }
   async removeFav(idF: number, i: number) {
     this.movies[i].favoriteb = true;
    try {
     await this.movieSrv.removeFavorite(idF).toPromise();
     this.movies[i].favoriteb = false;
     this.movies[i] = {...this.movies[i],favoriteId:undefined}
  } catch (error) {
   this.movies[i].favoriteb = false;
   alert(error);
 }
   }

}
