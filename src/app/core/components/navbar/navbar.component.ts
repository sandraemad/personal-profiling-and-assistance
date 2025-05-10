import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserProfileService } from '../../services/userProfile/user-profile.service';
import { IUser } from '../../interface/iuser';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly platformId=inject(PLATFORM_ID);
 public readonly UserProfileService=inject(UserProfileService);
 profileAdminData:IUser={} as IUser;
  isLogin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
      // if (localStorage.getItem('token') !== null) {
      //   this.UserProfileService.getProfileUser().subscribe({
      //     next:(res)=>{
      //       console.log(res.data);
      //       this.profileAdminData=res.data;
      //     }
      //   })
      //   return true;
      // }
      // else{
      //   return false;
      // }
    }
    else {
      return false;
    }
   
  }
    mentalTips: string[] = [
      '🧘‍♀️ خذ نفسًا عميقًا.. الراحة تبدأ من النفس.',
      '🌞 لا تنسَ أن تخرج إلى ضوء الشمس كل يوم.',
      '💬 تحدث مع شخص تثق به.. الفضفضة علاج.',
      '📝 اكتب ما يقلقك.. التفريغ الكتابي يُريح الذهن.',
      '😴 نم جيدًا.. النوم نصف العلاج.',
      '🚶‍♀️ الحركة اليومية تساعد على تحسين المزاج.',
      '🥗 اعتنِ بجسمك.. العقل السليم في الجسم السليم.',
      '🔕 خذ فترات راحة من السوشيال ميديا.',
      '😊 لا تكن قاسيًا على نفسك، كلنا نخطئ ونتعلم.',
      '🌈 تذكر دائمًا: هذه الأيام ستمر.'
    ];
    selectedTip: string = '';
  
    ngOnInit(): void {
      this.getRandomTip();
     
    }
    getRandomTip() {
      const randomIndex = Math.floor(Math.random() * this.mentalTips.length);
      this.selectedTip = this.mentalTips[randomIndex];
    }
    darkMode: boolean = false;
    changMode(): void {
      this.darkMode = !this.darkMode;
      
      if (this.darkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }

}
