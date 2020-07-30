import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {MemberListComponent} from './member-list/member-list.component';
import {MessagesComponent} from './messages/messages.component';
import {ListsComponent} from './lists/lists.component';

export const appRoute: Routes = [
    { path: 'member', component: MemberListComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: 'home', pathMatch : 'full'}
];
