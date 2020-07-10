import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/common/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  get title(): string {
    return this.sharedService.NavTitle;
  }

}
