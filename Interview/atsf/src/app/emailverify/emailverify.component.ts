import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { escapeRegExp } from '@angular/compiler/src/util';

@Component({
  selector: 'app-emailverify',
  templateUrl: './emailverify.component.html',
  styleUrls: ['./emailverify.component.css']
})
export class EmailverifyComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth: AuthService) {}
  emailStatus: boolean;
  ngOnInit() {
    this.auth
      .emailVerify(this.route.snapshot.paramMap.get('id'))
      .subscribe(response => {
        console.log('%%%%%%%', response.status);
        if (response.status === 'true') {
          this.emailStatus = true;
        } else {
          this.emailStatus = false;
        }
      });
  }
}
