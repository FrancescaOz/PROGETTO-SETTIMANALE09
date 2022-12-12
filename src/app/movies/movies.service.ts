import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/model/movie'
import { AuthInfo, AuthService } from 'src/app/auth/auth.service';
import { Favorite } from '../model/favorite';
import { take } from 'rxjs';

export interface Movie2{
  data: Movie;
  favoriteId?: number;
  favoriteb: boolean;
  poster_path: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    constructor(private http:HttpClient, private authSrv: AuthService) {}
  url = 'http://localhost:4201/';
  movieDetails: Movie | undefined;
  movies: Movie[] = [];


   async getPopularMovies(): Promise<Movie2[]> {
    const user: AuthInfo = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthInfo;
      console.log(user.accessToken);
    const movies:any = await this.http
      .get<Movie[]>(`${this.url}movie/popular`)
      .toPromise();
      console.log(user.accessToken);
    const fav:any = await this.http
      .get<Favorite[]>(
        `${this.url}favorites?userId=${user.user.id}`
      )
      .toPromise();
    return movies.map((m:any) => ({
      data: m,
      favoriteb: false,
      favoriteId: fav.find((f:any) => f.movieId == m.id)?.id,
    }));
  }

  async addFavorite(movieId: number) {
    const user: AuthInfo = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthInfo;
    return this.http.post<Favorite>(`${this.url}favorites`, {
      userId: user.user.id,
      movieId,
    });
  }
  removeFavorite(id: number) {
    return this.http.delete(`${this.url}favorites/${id}`);
  }
}
