import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestService } from '../../../core/services/Test/test.service';
import { ITest } from '../../../core/interface/itest';

@Component({
  selector: 'app-test-content',
  imports: [RouterLink,RouterLink],
  templateUrl: './test-content.component.html',
  styleUrl: './test-content.component.css',
})
export class TestContentComponent implements OnInit{

  private readonly testService=inject(TestService);
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
