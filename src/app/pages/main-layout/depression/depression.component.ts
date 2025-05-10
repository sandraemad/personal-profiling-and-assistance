import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TestService } from '../../../core/services/Test/test.service';
import { ActivatedRoute } from '@angular/router';
import { IQuestion } from '../../../core/interface/iquestion';

@Component({
  selector: 'app-depression',
  imports: [ResultComponent, HeaderComponent, IconComponent],
  templateUrl: './depression.component.html',
  styleUrl: './depression.component.css',
})
export class DepressionComponent implements OnInit{
  @ViewChild('header', { static: false }) myheader!: ElementRef; // Reference to header element

  cnt: number = 0; // السكور الحالي
  showResultComponent: boolean = false; // التحكم في ظهور الـ ResultComponent

  showResult(num: number): void {
    this.cnt += num; // تحديث السكور
  }

  toggleResult(): void {
    this.showResultComponent = true; // إظهار الـ component
  }
  private readonly testService=inject(TestService);
  private readonly activatedRoute=inject(ActivatedRoute);
  TestId!:number;
  questions:IQuestion[]=[];
  testName!:string;
  count:number=0;
  

  getAllQuection():void{
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        const idParam = res.get('id');
      if (idParam !== null) {
        this.TestId = +idParam;
        this.testService.getAllQuestions(this.TestId).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.testName=res.data.testName;
            this.questions=res.data.questions;
            console.log("objest",res.data.questions)

          }
        })
      }
    }

    })

  }
  ngOnInit(): void {
    this.getAllQuection();
  }


}
