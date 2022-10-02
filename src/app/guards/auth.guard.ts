import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth-service.service';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
   constructor(private auth: AuthService, private router: Router, private tokenStorage: TokenStorageService) {}

   canActivate(
      _route: ActivatedRouteSnapshot,
      _state: RouterStateSnapshot,
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.tokenStorage.getToken()) {
         return true;
      }
      return this.router.parseUrl("/login");
   }

   canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
   ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.canActivate(childRoute, state);
   }
}
