import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrl: './validacion.component.css'
})
export class ValidacionComponent {

  code1: String = '';
  code2: String = '';
  code3: String = '';
  code4: String = '';
  code5: String = '';
  code6: String = '';


  mostrarToastExito = false;
  mostrarToastError = false;

  constructor(private userService: AuthService, private router: Router) { }

  autoFocusNext(event: any, nextInput: HTMLInputElement | null) {
    const value = event.target.value;
    if (!/^\d$/.test(value)) {
      event.target.value = '';
      return;
    }
    if (value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  autoFocusPrev(event: KeyboardEvent, prevInput: HTMLInputElement | null) {
    if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value && prevInput) {
      prevInput.focus();
    }
  }

  verifyCode() {
    const token = `${this.code1}${this.code2}${this.code3}${this.code4}${this.code5}${this.code6}`;

    if (token.length === 6 && /^\d{6}$/.test(token)) {
      this.userService.activateAccount(token).subscribe({
        next: () => {
          this.mostrarToastExito = true;
          this.mostrarToastError = false;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: () => {
          this.mostrarToastError = true;
          this.mostrarToastExito = false;
        }
      });
    } else {
      this.mostrarToastError = true;
    }
  }


  onPaste(event: ClipboardEvent) {
    const pastedData = event.clipboardData?.getData('text') || '';
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      this.code1 = pastedData[0];
      this.code2 = pastedData[1];
      this.code3 = pastedData[2];
      this.code4 = pastedData[3];
      this.code5 = pastedData[4];
      this.code6 = pastedData[5];
      event.preventDefault();
    }

  }

}
