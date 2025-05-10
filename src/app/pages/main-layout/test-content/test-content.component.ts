import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestService } from '../../../core/services/Test/test.service';
import { ITest } from '../../../core/interface/itest';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-content',
  imports: [RouterLink,CommonModule],
  templateUrl: './test-content.component.html',
  styleUrl: './test-content.component.css',
})
export class TestContentComponent implements OnInit{

  private readonly testService=inject(TestService);
  private readonly platformId=inject(PLATFORM_ID);
  private readonly toastrService=inject(ToastrService);
  test:ITest[]=[];

  

  ngOnInit(): void {
    this.testService.getAllTests().subscribe({
      next:(res)=>{

        this.test=res;
        console.log(this.test);

      }
    })
  }

}
