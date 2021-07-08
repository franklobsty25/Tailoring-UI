import { Injectable, NgZone, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { TopMeasurement } from '../models/top-measurement';
import { Custom } from '../models/custom';
import { Review } from '../models/review';
import { Cart } from '../models/cart';
import { DownMeasurement } from '../models/down-measurement';
import { Message } from '../models/message';
import { Tailor } from '../models/tailor';
import { Order } from '../models/order';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider, AmazonLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  message: string;
  error: string;
  socialUser: SocialUser;
  user: User;

  constructor( 
    private http: HttpClient,
    public router: Router,
    public ngZone: NgZone,
    private socialAuthService: SocialAuthService,
    @Inject('environment') private environment
  ) {}

  // returns true when user is logged in
  get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null) ? true : false;
  }
   // sign up user with email & password
   signUp(user: User) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.environment.apiUrl}/users/register`, user, httpOptions)
    .pipe(
      map((res) => {
        return res;
      })
    );
   }
   // sign in user with email & passwrod
   signIn(username: string, password: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.environment.apiUrl}/users/login`, {username, password}, httpOptions)
    .pipe(
      map((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        return res;
      })
    );
   }
   // forget password
   forgotPassword(email: string) {
    if (email) {
     const data = { email: email };
     let httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     };
      return this.http.post<any>(`${this.environment.apiUrl}/users/forgotpassword`, data, httpOptions)
      .pipe(
        map((res) => {
          if (res.success) {
            this.message = res.status;
          }
          else {
            this.error = res.err;
          }
        })
      );
    }
   }
   // reset password
   resetPassword(data: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.environment.apiUrl}/users/reset`, data, httpOptions)
    .pipe(
      map((res) => {
        return res;
      })
    );
   }
   // get user profile
   getUser() {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`
         })
       };
       return this.http.get<User>(`${this.environment.apiUrl}/users/user`, httpOptions)
       .pipe(
         map((res) => {
           return res;
         })
       );
     }
   }
   // update user profile
   updateProfile(currentUser: User) {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         })
       };
       return this.http.put<any>(`${this.environment.apiUrl}/users/change/profile`, currentUser, httpOptions)
       .pipe(
         map((res) => {
           return res;
         })
       );
     }
   }
   // upload profile picture
   uploadProfileImage(file: File) {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       const formData: FormData = new FormData();
       formData.append('image', file);

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`
         })
       };
       return this.http.post<any>(`${this.environment.apiUrl}/users/profile-pic`, formData, httpOptions)
       .pipe(
         map((res) => {
           return res;
         })
       );
     }
   }
   // get products
   getProducts() {
     return this.http.get<Product[]>(`${this.environment.apiUrl}/products`)
     .pipe(
       map((res) => {
         return res;
       })
     );
   }
   // get product
   getProduct(productId) {
    return this.http.get<Product>(`${this.environment.apiUrl}/products/${productId}`)
    .pipe(
      map((res) => {
        return res;
      })
    );
   }
   // update price & total
   updatePriceTotal(productId, data) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<any>(`${this.environment.apiUrl}/products/user/${productId}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // add to cart
   addToUserCart(cart: Cart) {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         })
       };
       return this.http.post<any>(`${this.environment.apiUrl}/carts/cart`, cart, httpOptions)
       .pipe(
         map((res) => {
           return res;
         })
       );
     }
   }
   // add product review
   addProductReview(productId, review: Review) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(`${this.environment.apiUrl}/products/${productId}/review`, review, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // add custom design
   addCustomDesign(custom: Custom) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(`${this.environment.apiUrl}/customs/custom`, custom, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // upload custom image
   uploadCustomDesign(file: File) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      const formData: FormData = new FormData();
      formData.append('custom', file);

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post<any>(`${this.environment.apiUrl}/customs/upload`, formData, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // submit top measurement
   addTopMeasurement(top: TopMeasurement) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(`${this.environment.apiUrl}/measurements/savetop`, top, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // submit down measurement
   addDownMeasurement(down: DownMeasurement) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(`${this.environment.apiUrl}/measurements/savedown`, down, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // update top measurement
   updateTopMeasurement(top: TopMeasurement) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<any>(`${this.environment.apiUrl}/measurements/topchanges`, top, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // update down measurement
   updateDownMeasurement(down: DownMeasurement) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<any>(`${this.environment.apiUrl}/measurements/downchanges`, down, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // get top measurement
   getUserTopMeasurement() {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<TopMeasurement>(`${this.environment.apiUrl}/measurements/top/user`, httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
    }
   }
   // get down measurement
   getUserDownMeasurement() {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<DownMeasurement>(`${this.environment.apiUrl}/measurements/down/user`, httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
    }
   }
   // get user carts
   getUserCarts() {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`
         })
       };
       return this.http.get<Cart[]>(`${this.environment.apiUrl}/carts/cart`, httpOptions)
       .pipe(
         map((res) => {
           return res;
         })
       );
     }
   }
   // update cart quantity & total
   updateCart(cartId, cart) {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.put<any>(`${this.environment.apiUrl}/carts/change/${cartId}`, cart, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // remove from user cart
   removeFromCart(cartId) {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         })
       };
       return this.http.delete<any>(`${this.environment.apiUrl}/carts/remove/${cartId}`, httpOptions)
       .pipe(
         map((res) => {
           return res;
         })
       );
     }
   }
   // clear ordered cart
   clearOrderedCarts() {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user.access_token;

      let httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        })
      };
      return this.http.delete<any>(`${this.environment.apiUrl}/carts/remove`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
    }
   }
   // submit message
   contactMessage(message: Message) {
     let httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     };
     return this.http.post<any>(`${this.environment.apiUrl}/messages/message`, message, httpOptions)
     .pipe(
       map(res => {
         return res;
       })
     );
   }
   // get tailor info
   tailorDetail(tailorId) {
     return this.http.get<Tailor>(`${this.environment.apiUrl}/tailors/user/${tailorId}`)
     .pipe(
       map(res => {
         return res;
       })
     );
   }
   // set order
   createUserOrder(order: Order) {
     if (this.isLoggedIn) {
       const user = JSON.parse(localStorage.getItem('user'));
       const token = user.access_token;

       let httpOptions = {
         headers: new HttpHeaders({
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         })
       };
       return this.http.post<any>(`${this.environment.apiUrl}/orders/order`, order, httpOptions)
       .pipe(
         map(res => {
           return res;
         })
       );
     }
   }
   /*********************************************************  social network login ************************************************************/
  // sign in with facebook
  async facebookSignIn() {
    return await this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((facebookUser) => {
      this.socialUserRegister(facebookUser);
    }).catch((error) => {
      console.log(error);
    });
  }
  // sign in with google
  async googleSignIn() {
    return await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((googleUser) => {
      this.socialUserRegister(googleUser);
    }).catch((error) => {
      console.log(error);
    });
  }
  // sign in with amazon
  async amazonSignIn() {
    return await this.socialAuthService.signIn(AmazonLoginProvider.PROVIDER_ID)
    .then((amazonUser) => {
      this.socialUserRegister(amazonUser);
    }).catch((error) => {
      console.log(error);
    });
  }
  // register social user
  socialUserRegister(socialUser: SocialUser) {
    this.user = {
      firstName: socialUser.firstName,
      lastName: socialUser.lastName,
      username: socialUser.email,
      phoneNumber: '',
      photoUrl: socialUser.photoUrl,
      state: '',
      address: '',
      townCity: '',
      country: '',
      postalCodeZip: 0,
      differentAddress: false,
      orderNote: '',
      provider: socialUser.provider,
      deliveryDate: ''
    };
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>(`${this.environment.apiUrl}/users/social/login`, this.user, httpOptions)
    .subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res));
      this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
    },
    err => {
      console.log(err);
    });
  }

   // sign out current user
   signOut() {
     localStorage.removeItem('user');
     this.http.get(`${this.environment.apiUrl}/users/logout`);
     setTimeout(()=>{window.location.reload()},0.001);
     this.router.navigate(['profile-authentication']);
     if (this.socialAuthService)
     this.socialAuthService.signOut();
   }
     

}
