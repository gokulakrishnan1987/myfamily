import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,
		MAT_DIALOG_DATA } from "@angular/material";
import { Relationship } from "../family";
import { FamilyService } from '../family.service';


@Component({
  selector: 'app-add-relationship-dialog',
  templateUrl: './add-relationship-dialog.component.html',
  styleUrls: ['./add-relationship-dialog.component.css']
})
export class AddRelationshipDialogComponent implements OnInit {

	elementData = [];
	relationships = [];
	member1 = null;
	member2 = null;
	parent = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialogRef: MatDialogRef<AddRelationshipDialogComponent>,
  	private familyService: FamilyService,) { }

  	ngOnInit() {
  		this.getMembers();
  		this.getRelationships();
  	}

  	relationship: Relationship = new Relationship();

   close() {
        let that = this;
        console.log(that.data);
        this.dialogRef.close();
    }

    getMembers(): void {

  		let that = this;
  		console.log(that.data);
  		this.familyService.getMembers(that.data.fId)
  			.subscribe(result => {   				
  				that.elementData = result['rows'];          
          this.member1 = that.data.m1;
          this.member2 = that.data.m2;
          this.parent = that.data.parentId
  				console.log(that.elementData);
  			});
  	}

  	getRelationships(): void {

  		let that = this;
  		
  		this.familyService.getRelationships(that.data.fId)
  			.subscribe(result => {   				
  				that.relationships = result['rows'];
  				console.log(that.relationships);
  			});
  	}

    save(){
        let that = this;
        this.relationship.f_id = that.data.fId;
        this.relationship.r_m_id1 = this.member1;
        this.relationship.r_m_id2 = this.member2;
        this.relationship.r_parent_id = that.parent;
        this.relationship.r_id = that.data.rId;
        that.familyService.newRelationship(this.relationship)
            .subscribe(result => {
                this.dialogRef.close();
            });
        //console.log(this.member.name);
    }

}
