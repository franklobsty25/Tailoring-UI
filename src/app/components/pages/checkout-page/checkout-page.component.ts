import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Product } from 'src/app/shared/models/product';
import { Cart } from 'src/app/shared/models/cart';
import { TopMeasurement } from 'src/app/shared/models/top-measurement';
import { DownMeasurement } from 'src/app/shared/models/down-measurement';
import { Order } from 'src/app/shared/models/order';

@Component({
    selector: 'app-checkout-page',
    templateUrl: './checkout-page.component.html',
    styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
    @ViewChild('detailForm') userFormDirective;
    @ViewChild('top') topFormDirective;
    @ViewChild('down') downFormDirective;
    Id: string;
    user: User;
    email: string;
    delivery: number;
    total: number;
    product: Product;
    carts: Cart[];
    successTop: string;
    errorTop: string;
    successDown: string;
    errorDown: string;
    subtotal: number;
    userForm: FormGroup;
    topForm: FormGroup;
    downForm: FormGroup;
    top: TopMeasurement;
    down: DownMeasurement;
    length: number;
    order: Order;
    orders: Order[] = [];

    reference = '';
    currency = '';
    metadata = {};
    pay;

    formErrors = {
        'firstName': '',
        'lastName': '',
        'address': '',
        'townCity': '',
        'username': '',
        'phoneNumber': 0
      };
  
      validationMessages = {
        'firstName': {
          'required': 'First name is required.',
          'minlength': 'First name must be at least 2 characters long.'
        },
        'lastName': {
            'required': 'Last name is required.',
            'minlength': 'Last name must be at least 2 characters long.'
          },
          'address': {
            'required': 'Address is required.',
          },
          'townCity': {
              'required': 'Town/City is required.'
          },
        'username': {
          'required': 'Email is required.'
        },
        'phoneNumber': {
            'required': 'Phone number is required.'
        }
        
      };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        @Inject('environment') private environment
    ) {}

    ngOnInit(): void {
        this.Id = this.route.snapshot.paramMap.get('id');
        this.userCheckout(this.Id);
        this.getProfile();
        this.createUserForm();
        this.createTopFormMeasurement();
        this.createDownFormMeasurement();

        this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
        this.currency = 'GHS';

    }

    // get user carts
    getCarts() {
      if (this.authService.isLoggedIn) {

        this.authService.getUserCarts().subscribe(carts => {
          this.carts = carts;

          this.subtotal = this.carts.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = this.carts.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
              
        },
        error => {
          if (error.status === 403)
          this.router.navigate(['profile-authentication']);
            console.log(error);
        });
      }
      else {
        this.router.navigate(['profile-authentication']);
      }
    }

    // get product ordered
    getProductCheckout(productId) {
      this.authService.getProduct(productId).subscribe(product => {
        this.product = product;
        
        this.subtotal = this.product.price;
        this.delivery = this.product.delivery;

        this.total = Number(this.subtotal) + Number(this.delivery);

        this.pay = this.total * 100;
      },
      error => {
          console.log(error.message);
      });
    }

    userCheckout(Id) {
      if (this.authService.isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (Id == user.access_token) {

          this.getCarts();

        } else {

          this.getProductCheckout(Id);

        }

      }
      else {
        this.router.navigate(['profile-authentication']);
      }
    }

    // set firstname, lastname & email text field for database
    getProfile() {
      if (this.authService.isLoggedIn) {
        this.authService.getUser().subscribe((res) => {
          this.user = res;
          this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            country: 'Ghana',
            username: this.user.username
        });
        this.email = this.user.username;
        },
        err => {
          if (err.status === 403)
          this.router.navigate(['profile-authentication']);
          console.log(err);
        });
      }
      else {
        this.router.navigate(['profile-authentication']);
      }

    }

    // top measurment form
    createTopFormMeasurement() {
      this.topForm = this.fb.group({
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
    createDownFormMeasurement() {
      this.downForm = this.fb.group({
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

    // create user form
    createUserForm() {
        this.userForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            address: ['', Validators.required],
            townCity: ['', Validators.required],
            state: '',
            country: '',
            postalCodeZip: '',
            username: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            differentAddress: false,
            orderNote: ''
        });
        this.userForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.userForm) { return; }
          const form = this.userForm;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // Clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + '';
                }
              }
            }
          }
        }
    }

    // update user profile
    onSubmitUserDetail() {
      if (this.authService.isLoggedIn) {
        this.user = this.userForm.value;
        this.user.deliveryDate = this.order.deliveryDate;
      }
      else {
        this.router.navigate(['profile-authentication']);
      }
    }

    // Price variation upon measurement length
    onlengthChange(event) { 
      this.length = Number(event.target.value);
      if (this.length <= 19){
        this.orders = [];
        if (this.carts) {
          let array = [];
          this.carts.forEach(cart => {
            cart.price = cart.xsmallSize;
            cart.total = cart.xsmallSize;
            array.push(cart);
            this.setOrder(cart);
          });
          this.subtotal = array.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = array.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
          
        }
        else {
          this.product.price = this.product.xsmallSize;
          this.product.total = this.product.xsmallSize;
        
          this.subtotal = this.product.total;
          this.delivery = this.product.delivery;
    
          this.total = Number(this.subtotal) + Number(this.delivery);
    
          this.pay = this.total * 100;

          this.setOrder(this.product);
        }
      }
      else if (this.length >= 20 && this.length <= 29) {
        this.orders = [];
        if (this.carts) {
          let array = [];
          this.carts.forEach(cart => {
            cart.price = cart.smallSize;
            cart.total = cart.smallSize;
            array.push(cart);
            this.setOrder(cart);
          });
          this.subtotal = array.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = array.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
        }
        else {
          this.product.price = this.product.smallSize;
          this.product.total = this.product.smallSize;
        
          this.subtotal = this.product.total;
          this.delivery = this.product.delivery;
    
          this.total = Number(this.subtotal) + Number(this.delivery);
    
          this.pay = this.total * 100;

          this.setOrder(this.product);
        }
      }
      else if (this.length >= 30 && this.length <= 39) {
        this.orders = [];
        if (this.carts) {
          let array = [];
          this.carts.forEach(cart => {
            cart.price = cart.mediumSize;
            cart.total = cart.mediumSize;
            array.push(cart);
            this.setOrder(cart);
          });
          this.subtotal = array.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = array.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
        }
        else {
          this.product.price = this.product.mediumSize;
          this.product.total = this.product.mediumSize;
        
          this.subtotal = this.product.total;
          this.delivery = this.product.delivery;
    
          this.total = Number(this.subtotal) + Number(this.delivery);
    
          this.pay = this.total * 100;

          this.setOrder(this.product);
        }
      }
      else if (this.length >= 40 && this.length <= 49) {
        this.orders = [];
        if (this.carts) {
          let array = [];
          this.carts.forEach(cart => {
            cart.price = cart.largeSize;
            cart.total = cart.largeSize;
            array.push(cart);
            this.setOrder(cart);
          });
          this.subtotal = array.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = array.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
        }
        else {
          this.product.price = this.product.largeSize;
          this.product.total = this.product.largeSize;
        
          this.subtotal = this.product.total;
          this.delivery = this.product.delivery;
    
          this.total = Number(this.subtotal) + Number(this.delivery);
    
          this.pay = this.total * 100;

          this.setOrder(this.product);
        }
      }
      else if (this.length >= 50 && this.length <= 59) {
        this.orders = [];
        if (this.carts) {
          let array = [];
          this.carts.forEach(cart => {
            cart.price = cart.xlargeSize;
            cart.total = cart.xlargeSize;
            array.push(cart);
            this.setOrder(cart);
          });
          this.subtotal = array.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = array.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
        }
        else {
          this.product.price = this.product.xlargeSize;
          this.product.total = this.product.xlargeSize;
        
          this.subtotal = this.product.total;
          this.delivery = this.product.delivery;
    
          this.total = Number(this.subtotal) + Number(this.delivery);
    
          this.pay = this.total * 100;

          this.setOrder(this.product);
        }
      }
      else if (this.length >= 60) {
        this.orders = [];
        if (this.carts) {
          let array = [];
          this.carts.forEach(cart => {
            cart.price = cart.xxlargeSize;
            cart.total = cart.xxlargeSize;
            array.push(cart);
            this.setOrder(cart);
          });
          this.subtotal = array.reduce((accumulator, current) => accumulator + current.total, 0);
          this.delivery = array.reduce((accumulator, current) => accumulator + current.delivery, 0);
  
          this.total = Number(this.subtotal) + Number(this.delivery);
  
          this.pay = this.total * 100;
        }
        else {
          this.product.price = this.product.xxlargeSize;
          this.product.total = this.product.xxlargeSize;
        
          this.subtotal = this.product.total;
          this.delivery = this.product.delivery;
    
          this.total = Number(this.subtotal) + Number(this.delivery);
    
          this.pay = this.total * 100;

          this.setOrder(this.product);
        }
      }

    }
    // submit user top measurement
    onSubmitTopMeasurement() {
      if (this.authService.isLoggedIn) {
        this.top = this.topForm.value;
        this.authService.getUserTopMeasurement()
        .subscribe(res => {
          if (res == null) {
            this.authService.addTopMeasurement(this.top).subscribe(res => {
              if (res.success)
              this.successTop = res.status;
              this.topFormDirective.resetForm();
            },
            err => {
              if (err.status === 500)
              this.errorTop = 'Inputs invalid!';
            })
          }
          else {
            this.authService.updateTopMeasurement(this.top).subscribe(res => {
              if (res.success) {
                this.successTop = res.status;
                this.topFormDirective.resetForm();
              }
            },
            err => {
              if (err.status === 500)
              this.errorTop = 'Inputs invalid!';
            });
          }
        })
      }
      else {
        this.router.navigate(['profile-authentication']);
      } 
    }

    // submit user down measurement
    onSubmitDownMeasurement() {
      if (this.authService.isLoggedIn) {
        this.down = this.downForm.value;
        this.authService.getUserDownMeasurement().subscribe(res => {
          if (res == null ) {
            this.authService.addDownMeasurement(this.down).subscribe(res => {
              if (res.success)
              this.successDown = res.status;
              this.downFormDirective.resetForm();
            },
            err => {
              if (err.status === 500)
              this.errorDown = 'Inputs invalid!';
            })
          }
          else {
            this.authService.updateDownMeasurement(this.down).subscribe(res => {
              if (res.success) {
                this.successDown = res.status;
                this.downFormDirective.resetForm();
              }
            },
            err => {
              if (err.status === 500)
              this.errorDown = 'Inputs invalid!';
            });
          }
        });

      }
      else {
        this.router.navigate(['profile-authentication']);
      }
    }

    setOrder(data) {
      let actualPrice = Number(data.price) - Number((data.price * 0.05).toFixed());
      let duration = new Date();
      duration.setDate(duration.getDate() + data.duration);
      this.order = {
        name: data.name,
        image: data.image,
        fabric: data.fabric,
        category: data.category,
        quantity: data.quantity,
        price: actualPrice,
        total: data.total,
        orderDate: new Date().toDateString(),
        deliveryDate: duration.toDateString(),
        productId: data._id || data.productId,
        tailorId: data.tailorId
      };
      this.orders.push(this.order);
      this.metadata = {
        'Design ID': this.order.productId , 
        'Design Name': this.order.name, 
        'Design Price': this.order.total
      };
    }

    placeOrder() {
      this.orders.forEach(order => {
      this.authService.createUserOrder(order).subscribe(res => {
        if (res.success)
        console.log(res.status);
      },
      err => {
        if (err.status === 403)
        this.router.navigate(['profile-authentication']);
      });
      });
      // update order profile
      this.authService.updateProfile(this.user).subscribe(res => {
        if (res.success) {
          this.onSubmitTopMeasurement();
          this.onSubmitDownMeasurement();
          this.userFormDirective.resetForm();
          if (this.carts) {
            this.authService.clearOrderedCarts().subscribe(res => {
              if (res.success)
              console.log(res.status);
            })
          }
        }
      },
      err => {
        console.log(err);
      });
    }

    // payment settings
    paymentInit() {
      console.log('Payment initialized');
    }

    paymentDone(ref: any) {
      const title = 'Payment successful.';
      console.log(title, ref);
      this.placeOrder();
      setTimeout(()=>{window.location.reload()},0.001);
      this.router.navigate(['']);
    }

    paymentCancel() {
      console.log('payment failed');
    }

    pageTitle = [
        {
            bgImage: `assets/img/page-title/banner.jpg`, // page-title2.jpg
            title: `Checkout`,
        }
    ]

}