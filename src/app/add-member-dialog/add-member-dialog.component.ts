import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef,
        MAT_DIALOG_DATA } from "@angular/material";

import { Member } from "../family";
import { FamilyService } from '../family.service';

@Component({
    selector: 'app-add-member-dialog',
    templateUrl: './add-member-dialog.component.html',
    styleUrls: ['./add-member-dialog.component.css']
})

export class AddMemberDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<AddMemberDialogComponent>,
                private familyService: FamilyService) { }

    ngOnInit() {
        this.getMember();
    }

    member: Member = new Member();

    getMember() {
        let that = this;
        if(that.data.mname != undefined) {
            this.member.name = that.data.mname.trim();
            this.member.m_id = that.data.mid;
        };
    }

    close() {
        let that = this;
        console.log(that.data);
        this.dialogRef.close();
    }

    save(){
        let that = this;
        this.member.u_id = that.data.uid;
        that.familyService.newMember(this.member)
            .subscribe(result => {
                this.dialogRef.close();
            });
        //console.log(this.member.name);
    }

}
