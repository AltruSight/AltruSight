import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Custom Component Imports & Project Config Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { environment } from '../environments/environment';
import { NonprofitPageComponent } from './nonprofit/nonprofit-page/nonprofit-page.component';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { NonprofitSearchPageComponent } from './nonprofit-search-page/nonprofit-search-page.component';
import { AccountStatsPageComponent } from './user/account-stats-page/account-stats-page.component';
import { FriendsPageComponent } from './user/friends-page/friends-page.component';
import { FavoriteNonprofitsComponent } from './user/favorite-nonprofits/favorite-nonprofits.component';
import { DonationDialogComponent } from './nonprofit/nonprofit-page/nonprofit-page.component';
import { OtherUserProfilePageComponent } from './user/other-user-profile-page/other-user-profile-page.component';

// Material Design Imports
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';

// Angular Firebase Imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 3rd Party Modules
import { BarRatingModule } from 'ngx-bar-rating';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NonprofitPageComponent,
    ProfilePageComponent,
    NonprofitSearchPageComponent,
    AccountStatsPageComponent,
    FriendsPageComponent,
    FavoriteNonprofitsComponent,
    DonationDialogComponent,
    OtherUserProfilePageComponent
  ],
  imports: [
    // Angular Core
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatListModule,
    MatTabsModule,
    MatPaginatorModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    // 3rd Party
    BarRatingModule,
    FontAwesomeModule,
    CreditCardDirectivesModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
