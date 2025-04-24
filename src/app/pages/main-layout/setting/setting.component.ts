import { Component, inject, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/userProfile/user-profile.service';
import { IUser } from '../../../core/interface/iuser';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit{
  private readonly userProfileService=inject(UserProfileService);
  private readonly router=inject(Router);
  userInfo!:IUser;


  Delete(): void {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userProfileService.DeleteProfileUser().subscribe({
          next: (res) => {
              Swal.fire({
                title: "تم الحذف!",
                text: "تم حذف الاختبار بنجاح.",
                icon: "success"
              });
              localStorage.removeItem("token");
              localStorage.removeItem('userId');
              this.router.navigate(['/login']);
          },
          error: (error: HttpErrorResponse) => {
            console.log('error:', error);
          },
        });
      }
    });
  }





ngOnInit(): void {
  this.userProfileService.getProfileUser().subscribe({
    next: (response) => {
      console.log(response.data);
      this.userInfo=response.data;
      console.log(this.userInfo);

    }
  })
}

}
