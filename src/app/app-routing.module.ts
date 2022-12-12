import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
 {//rotta principale da cui parte tutto
   path: "",
   canActivate: [AuthGuard],
    loadChildren: () => import("../app/start/start.module").then((m)=> m.StartModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
