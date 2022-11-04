import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/service/auth.service';
import { PlaceholderDirective } from 'src/app/Utils/directives/placeholder.directive';
import { AlertComponent } from '../../shared/alert/alert.component';
import * as fromApp from '../../../ngrx/store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../ngrx/actions/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private alerHostSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnDestroy(): void {
    if (this.alerHostSub) {
      this.alerHostSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password)
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
    } else {
      authObs = this.authService.signup(email, password)
    }


    /*authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        this.isLoading = false;
        this.error = error;
        this.showErrorAlert(error);
      }
    );*/
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const viewContainerRef = hostViewContainerRef.createComponent(alertCmpFactory);
    viewContainerRef.instance.message = message;
    this.alerHostSub = viewContainerRef.instance.close.subscribe(() => {
      this.alerHostSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
