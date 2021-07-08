import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/models/cart';
import { Custom } from 'src/app/shared/models/custom';
import { TopMeasurement } from 'src/app/shared/models/top-measurement';
import { DownMeasurement } from 'src/app/shared/models/down-measurement';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-store',
    templateUrl: './dashboard-store.component.html',
    styleUrls: ['./dashboard-store.component.scss']
})
export class DashboardStoreComponent implements OnInit {
    @ViewChild('custom') customFormDirective;
    @ViewChild('top') topMeasurementFormDirective;
    @ViewChild('down') downMeasurementFormDirective;
    user: User;
    cart: Cart;
    photoUrl: string;
    success: string;
    error: string;
    successTop: string;
    successDown: string;
    display: boolean = false;
    err: string;
    file: File;
    custom: Custom;
    customForm: FormGroup;
    topMeasurementForm: FormGroup;
    downMeasurementForm: FormGroup;
    topMeasurement: TopMeasurement;
    downMeasurement: DownMeasurement;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        @Inject('environment') private environment
    ) {}

    ngOnInit(): void {
        this.getUserProfile();
        this.createCustomForm();
        this.createTopMeasurement();
        this.createDownMeasurement();
    }

    // create custom user form
    createCustomForm() {
        this.customForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            image: '',
            quantity: 1,
            fabric: ['', Validators.required]
        });
    }

    // validators check
    get f() {
        return this.customForm.controls;
    }

    // top measurement form
    createTopMeasurement() {
        this.topMeasurementForm = this.fb.group({
            length: ['', Validators.required],
            back: ['', Validators.required],
            sleeve: ['', Validators.required],
            chest: ['', Validators.required],
            aroundArm: ['', Validators.required],
            cuff: ['', Validators.required],
            additionalNotes: ''
        });
    }

    // down measurement form
    createDownMeasurement() {
        this.downMeasurementForm = this.fb.group({
            length: ['', Validators.required],
            waist: ['', Validators.required],
            thighs: ['', Validators.required],
            bass: ['', Validators.required],
            seat: ['', Validators.required],
            knee: ['', Validators.required],
            flap: ['', Validators.required],
            additionalNotes: ''
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            if (file.type.match('image.*')) {
                this.file = file;
                this.err = '';
            } else {
                this.err = 'File selected is not an image.';
            }
        }
    }

    // add custom design
    customDesign() {
        if (this.authService.isLoggedIn) {
            this.custom = this.customForm.value;
            this.custom.image = this.file.name;

            this.authService.uploadCustomDesign(this.file)
            .subscribe((res) => {
                if (res.success) {
                    console.log(res.status);
                    this.authService.addCustomDesign(this.custom).subscribe((res) => {
                        if (res.success) {
                            this.success = res.status;
                            this.error = '';
                            this.customFormDirective.resetForm();
                        }
                    }, err => {
                        if (err.status === 500)
                        this.error = 'Inputs invalid.';
                    });
                }
            },
            err => {
                if (err.status === 500)
                this.error = 'Design not an image.';
            });
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    // get user
    getUserProfile() {
        if (this.authService.isLoggedIn) {

        this.authService.getUser().subscribe(user => {
            this.user = user;

            if (this.user.photoUrl == '') {
                this.photoUrl = 'assets/img/no-user-image.png';
            }
            else {
                this.photoUrl = `${this.environment.apiUrl}/images/profile/${this.user.photoUrl}`;
            }
        },
        error => {
            console.log(error);
        });

        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }

    // top measurement submission
    onSubmitTopMeasurement() {
        if (this.authService.isLoggedIn) {
            this.topMeasurement = this.topMeasurementForm.value;

            this.authService.getUserTopMeasurement().subscribe(res => {
                if (res == null) {
                    this.authService.addTopMeasurement(this.topMeasurement)
                    .subscribe((top) => {
                        if (top.success)
                            this.successTop = top.status;
                            this.topMeasurementFormDirective.resetForm();
                    },
                    err => {
                        console.log(err);
                    });
                }
                else {
                    this.authService.updateTopMeasurement(this.topMeasurement)
                    .subscribe((top) => {
                        if (top.success)
                        this.successTop = top.status;
                        this.topMeasurementFormDirective.resetForm();
                    },
                    err => {
                        console.log(err);
                    });
                }
            });
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }


    // down measurement submission
    onSubmitDownMeasurement() {
        if (this.authService.isLoggedIn) {
            this.downMeasurement = this.downMeasurementForm.value;

            this.authService.getUserDownMeasurement().subscribe(res => {
                if (res == null) {
                    this.authService.addDownMeasurement(this.downMeasurement)
                    .subscribe((down) => {
                        if (down.success)
                            this.successDown = down.status;
                            this.downMeasurementFormDirective.resetForm();
                    },
                    err => {
                        if (err.status === 403)
                        this.authService.signOut();
                    });
                }
                else {
                    this.authService.updateDownMeasurement(this.downMeasurement)
                    .subscribe((down) => {
                        if (down.success)
                        this.successDown = down.status;
                        this.downMeasurementFormDirective.resetForm();
                    },
                    err => {
                        console.log(err);
                    });
                }
            });
        }
        else {
            this.router.navigate(['profile-authentication']);
        }
    }


    displayMeasurement(event) {
        if (event.target.value) {
            this.display = event.target.value;
        } else {
            this.display = false;
        }
    }

    logOut() {
        localStorage.removeItem('user');
        this.authService.signOut();
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/page-title4.jpg`,
            title: `My Dashboard`,
        }
    ]

}