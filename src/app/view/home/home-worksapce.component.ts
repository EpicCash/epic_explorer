import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Utils } from 'src/app/shared/utils';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChartService } from 'src/app/shared/services/chart.service';

@Component({
  selector: 'epic-explorer-home-worksapce',
  templateUrl: './home-workspace.component.html',
  styles: [],
})
export class HomeWorksapceComponent extends Utils
  implements OnInit, AfterViewInit {
  viewchartvar: boolean;
  countDownDate: any;
  demo: any;
  targetBlock;
  constructor(@Inject(DOCUMENT) public document: Document,
  private router: Router,private route: ActivatedRoute,private titleService: Title, private chartService: ChartService) {
    super(document);
    if (this.router.url == '/all') {
      this.viewchartvar = false;
    } else {
      this.viewchartvar = false;
    }
    this.targetBlock = environment.TARGETBLOCK;
  }

  ngOnInit() {
    this.titleService.setTitle(
      this.route.snapshot.data.title,
    );
    
// new Promise<void>((resolve, reject) => {
//   this.chartService
//     .apiGetRequest("", "/blockchain_block/latesblockdetails")
//     .subscribe(
//       res => {
//         if (res["status"] == 200) {
//           this.countDownDate = environment.TARGETBLOCK - res.response.block_height;
//           resolve();
//         }
//       },
//       error => {}
//     );
// });

    var d1 = new Date ();
    
      let x = setInterval(() => {
      var d2 = new Date ( d1 );
      d2.setMinutes ( d1.getMinutes() + this.countDownDate );
      let now = new Date().getTime();
      let distance = d2.getTime() - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      this.demo = days + ' days ' + hours + ' hours ' + minutes + ' mins ' + seconds + ' sec';
  
      if (distance < 0) {
        clearInterval(x);
        this.demo = 'Expired...';
      }
    }, 1000);
  }

  viewchartenable() {
    this.viewchartvar = false;
  }
  ngAfterViewInit() {
    this.removeLoader();
  }
}
