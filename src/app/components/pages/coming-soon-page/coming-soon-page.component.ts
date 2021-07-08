import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-coming-soon-page',
    templateUrl: './coming-soon-page.component.html',
    styleUrls: ['./coming-soon-page.component.scss']
})
export class ComingSoonPageComponent implements OnInit {
    success: string;
    error: string;
    resetForm: FormGroup;
    @ViewChild('reset') resetFormDirective;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.resetForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    resetPassword() {
        this.authService.resetPassword(this.resetForm.value)
        .subscribe(res => {
            if (res.success) {
                this.success = res.status;
                this.resetFormDirective.resetForm();
            }
            else {
                this.error = res.status;
            }
        },
        err => {
            if (err.status === 500) {
                this.error = 'Email or Password invalid.'
            }
            this.error = err;
        })
    }

    comingSoonContent = [
        {
            bgImage: `assets/img/reset_bg.jpg`, // coming-soon-bg.jpg
            title: `Reset Password`
        }
    ]

}