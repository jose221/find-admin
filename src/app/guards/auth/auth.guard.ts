import { UserService } from './../../services/auth/user.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userService: UserService, private router: Router
 ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise( (resolve, reject) => {
      this.userService.getCurrentUser()
        .then( user => {
          return resolve(true);
        }, err => {
          this.router.navigate(['/login']);
          return resolve(false);
        });
    });
  }
  
}
