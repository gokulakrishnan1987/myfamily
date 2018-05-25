import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef,
        MAT_DIALOG_DATA } from "@angular/material";

import { Family } from "../family";
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-add-family-dialog',
  templateUrl: './add-family-dialog.component.html',
  styleUrls: ['./add-family-dialog.component.css']
})
export class AddFamilyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<AddFamilyDialogComponent>,
                private familyService: FamilyService) { }

  ngOnInit() {
  }

  family: Family = new Family();

    close() {
        let that = this;
        console.log(that.data);
        this.dialogRef.close();
    }

    save(){
        let that = this;
        this.family.f_u_id = that.data;  
        console.log(this.family);
        that.familyService.newFamily(this.family)
            .subscribe(result => {
                this.dialogRef.close();
            });
        //console.log(this.member.name);
    }

}
