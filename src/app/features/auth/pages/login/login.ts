import { Component, inject } from '@angular/core'; // 1. Importa inject
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate de tener esto si es un componente standalone
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  // 2. Usamos inject() en lugar del constructor para evitar el error TS2729
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    // 3. Usamos nonNullable para que los valores sean string y no string|null
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid) return;

    // 4. Usamos getRawValue() para enviar los datos limpios al servicio
    const credentials = this.form.getRawValue();

    this.auth.login(credentials).subscribe({
      next: (res) => {
        this.auth.saveSession(res);
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Credenciales incorrectas'),
    });
  }
}
