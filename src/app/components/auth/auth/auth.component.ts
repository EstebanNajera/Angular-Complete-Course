import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private storeSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnDestroy(): void {
    if (this.alerHostSub) {
      this.alerHostSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
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
    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }));
    }
    authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
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
