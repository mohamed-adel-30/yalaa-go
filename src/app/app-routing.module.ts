import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NOTFOUNDComponent } from './notfound/notfound.component';
import { PlacesComponent } from './places/places.component';
import { WeekendComponent } from './weekend/weekend.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthGuardOwnerService } from './auth-guard-owner.service';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "ownerProfile/:name", canActivate: [AuthGuardOwnerService], component: AboutUsComponent },
  { path: "ownerProfile", canActivate: [AuthGuardOwnerService], component: AboutUsComponent },
  { path: "Weekend", component: WeekendComponent },
  { path: "cat/:id", component: SingleCategoryComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "place/:id", component: PlacesComponent },
  { path: "user-profile", canActivate: [AuthGuardService], component: UserProfileComponent },
  { path: "reservation/:id", canActivate: [AuthGuardService], component: ReservationComponent },
  { path: "error", component: NOTFOUNDComponent },
  { path: "**", component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
