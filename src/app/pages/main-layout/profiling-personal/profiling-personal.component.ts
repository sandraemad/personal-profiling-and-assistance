import { Component, inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { UserProfileService } from '../../../core/services/userProfile/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../core/interface/iuser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profiling-personal',
  imports: [FormsModule,DatePipe],
  templateUrl: './profiling-personal.component.html',
  styleUrl: './profiling-personal.component.css',
})
export class ProfilingPersonalComponent {
  private readonly userProfileService=inject(UserProfileService);
  private readonly toastrService=inject(ToastrService);
  private readonly router=inject(Router);
  userDetails:IUser={} as IUser;
//   savePhoto!:File;
//  username:string="";
//  phonenumber:string="";
//  gender:string="";
//  email!:string;
//  image!:string;
// changIamge(e:Event):void{
//   const input=e.target as HTMLInputElement;
//   if(input.files && input.files.length>0){
//     this.savePhoto=input.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.image = reader.result as string; // هنا بتخزن البيانات المحولة من الصورة
//     };
//     reader.readAsDataURL(this.savePhoto); // تقرأ الصورة وتحوّلها
//     console.log(input.files[0]);

//   }

  

  // updateProfile():void{
  //   const formData=new FormData();
  //   formData.append("UserName",this.username);
  //   formData.append("PhoneNumber",this.phonenumber);
  //   formData.append("Gender",this.gender);
  //   formData.append("ProfilePicture",this.savePhoto);
  //   console.log(formData);
  //   this.userProfileService.UpdateProfileUser(formData).subscribe({
  //     next:(res)=>{
  //       this.toastrService.success("تم تحديث السؤال بنجاح", "نجاح");
  //       formData.delete;
  //       this.router.navigate(['/setting']);
       
  //     }
  //   })
  // }
  ngOnInit(): void {
    this.userProfileService.getProfileUser().subscribe({
      next:(res)=>{
      
        this.userDetails=res.data;
        console.log("profileAdmin",this.userDetails);
      }
    })
  }

}
