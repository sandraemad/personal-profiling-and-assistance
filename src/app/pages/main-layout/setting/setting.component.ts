import { Component, inject, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/userProfile/user-profile.service';
import { IUser } from '../../../core/interface/iuser';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit{
  private readonly userProfileService=inject(UserProfileService);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);
  userInfo!:IUser;
  savePhoto!:File;
 username:string="";
 phonenumber:string="";
 gender:string="";
 email!:string;
 image!:string;
changIamge(e:Event):void{
  const input=e.target as HTMLInputElement;
  if(input.files && input.files.length>0){
    this.savePhoto=input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string; // هنا بتخزن البيانات المحولة من الصورة
    };
    reader.readAsDataURL(this.savePhoto); // تقرأ الصورة وتحوّلها
    console.log(input.files[0]);

  }
}

  


  updateProfile():void{
    const formData=new FormData();
    formData.append("UserName",this.username);
    formData.append("PhoneNumber",this.phonenumber);
    formData.append("Gender",this.gender);
    formData.append("ProfilePicture",this.savePhoto);
    console.log(formData);
    this.userProfileService.UpdateProfileUser(formData).subscribe({
      next:(res)=>{
        this.toastrService.success("تم تحديث السؤال بنجاح", "نجاح");
        formData.delete;
        this.router.navigate(['/profiling']);
       
      }
    })
  }

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
    next: (res) => {
      console.log("profileAdmin",res.data);
      this.savePhoto=res.data.profilePicture;
      this.gender=res.data.gender;
      this.phonenumber=res.data.phone;
      this.username=res.data.name;
      this.email=res.data.email;
      this.image='data:image/' + res.data.profilePictureType + ';base64,' +res.data.profilePicture;

    }
  })
}


}