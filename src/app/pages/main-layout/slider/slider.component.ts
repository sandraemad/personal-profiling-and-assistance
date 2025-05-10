import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None, // يسمح باستخدام أنماط Swiper
})
export class SliderComponent  {
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  // ngAfterViewInit() {
  //   new Swiper(this.swiperContainer.nativeElement, {
  //     modules: [Navigation, Pagination, Autoplay],
  //     direction: 'vertical',
  //     loop: true,
  //     autoplay: {
  //       delay: 1000,
  //       disableOnInteraction: false,
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true,
  //     },
  //   });
  // }
}
