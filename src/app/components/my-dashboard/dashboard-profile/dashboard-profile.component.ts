import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard-profile',
	templateUrl: './dashboard-profile.component.html',
	styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
    @ViewChild('user') userFormDirective;
    user: User;
    photoUrl: string;
    success: string;
    userForm: FormGroup;
    error: string;
    selectedFile: File;
    uError: string;

	constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        @Inject('environment') private environment
    ) {}

	ngOnInit(): void {
        this.getUser();
        this.createForm();
	}
    // create user form
    createForm() {
        this.userForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            image: ''
        });
    }

    // get user
    getUser() {
        if (this.authService.isLoggedIn) {

            this.authService.getUser().subscribe((res) => {
                this.user = res;
                this.getProfile(this.user);
                if (this.user.photoUrl != '') {
                    this.photoUrl = `${this.environment.apiUrl}/images/profile/${this.user.photoUrl}`
                }
                else {
                    this.photoUrl = 'assets/img/no-user-image.png';
                }
            },
            err => {
                if (err.status === 403)
                this.authService.signOut();
            });
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    // get user profile
    getProfile(user) {
        this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phoneNumber: user.phoneNumber
        });
    }

    // upload profile image
    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            if (file.type.match('image.*')) {
                this.selectedFile = file;
                this.error = '';
                this.authService.uploadProfileImage(this.selectedFile)
                .subscribe((res) => {
                    if (res.success) {
                        console.log(res.status);
                        this.getUser();
                    }
                },
                err => {
                    this.error = err;
                })
            } else {
                this.error = 'File selected is not an image.';
            }
        }
    }

    // update user profile
    updateUserProfile() {
        if (this.authService.isLoggedIn) {
            this.authService.updateProfile(this.userForm.value)
            .subscribe((res) => {
                if (res.success) {
                    this.success = res.status;
                }
                else {
                    this.uError = res.status;
                }
            },
            err => {
                if (err.status === 500) {
                    this.uError = 'Input invalid.';
                }
            })
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    logOut() {
        localStorage.removeItem('user');
        this.authService.signOut();
    }



    pageTitle = [
        {
            bgImage: `assets/img/page-title/page-title3.jpg`,
            title: `My Dashboard`,
        }
    ]

}