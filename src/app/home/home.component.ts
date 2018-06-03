import { Component, OnInit, Inject } from '@angular/core';

import OrgChart from '../../assets/orgchart-webcomponents.js';

import { FamilyService } from '../family.service';

import {MatDialog, MatDialogConfig} from "@angular/material";

import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { AddRelationshipDialogComponent } from '../add-relationship-dialog/add-relationship-dialog.component';
import { AddFamilyDialogComponent } from '../add-family-dialog/add-family-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	datasource = {};
	title = 'my family';

 	elementData = [];
	selected2 = 1;
    members = [];
    relationships = [];

	
  	constructor(private familyService: FamilyService, private dialog: MatDialog) { }

  	ngOnInit() {  		
  		this.createD3Gauge();  
  		this.getFamily();
        this.getMembers();
  	}

  	openMemberDialog(memberId, memberName) {
    	const dialogConfig = new MatDialogConfig();    	
    	dialogConfig.data = {
            'uid': document.cookie.split('uid=')[1].split(';')[0],
            'mid': memberId,
            'mname': memberName
        };
    	let dialogRef = this.dialog.open(AddMemberDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {           
        });
  	}

  	openRelationshipDialog(m1, m2, parentId, relationshipId) {
    	const dialogConfig = new MatDialogConfig();
    	dialogConfig.data = {
            'fId': this.selected2,
            'm1': m1,
            'm2': m2,
            'parentId': parentId,
            'rId': relationshipId
        };
    	let dialogRef = this.dialog.open(AddRelationshipDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            this.createD3Gauge();
        })
  	}

    openFamilyDialog() {
        const dialogConfig = new MatDialogConfig();        
        dialogConfig.data = document.cookie.split('uid=')[1].split(';')[0];
        this.dialog.open(AddFamilyDialogComponent, dialogConfig);
    }


  	newRelationship(row) {
  		return {
			'id': row.r_id,
			'name': row.m1,
			'title': row.m2,			
	  	};
  	}
  	
  	getTreeStructure(relationships, parentId) {  		
  		for(let row of relationships) {  			
  			if(row.parentid === parentId) {  				
  				if(Object.keys(this.datasource).length === 0) {
	  				this.datasource = this.newRelationship(row);
	  			} else {	  					  					  						
					this.addChildrens([this.datasource], parentId, row);  							  					
	  			}
  				this.getTreeStructure(relationships, row.r_id);
  			}
  		}  		
  	}

  	addChildrens(childrens, parentId, row) {
  		if(childrens !== undefined) {
	  		for(let children of childrens) {   			 			
	  			if(children.id === parentId) {  				  				  				
                    if(children.children === undefined){
                        children['children'] = [];                        
                    }
                    children['children'].push(this.newRelationship(row));                  
	  			}
	  			this.addChildrens(children.children, row.parentid, row);
	  		}
	  	}
  	}

    createD3Gauge() { 
   		let that = this;   		
		
			that.familyService.getRelationships(this.selected2)
	  			.subscribe(result => {   		  				
	  				that.datasource = {};
                    that.relationships = result['rows'];
	  				that.getTreeStructure(result['rows'], 0);
	  				console.log(that.datasource);
	  				
					let orgchart = new OrgChart({
			  	  		'data' : that.datasource,
			    		'depth': 4,
			    		'nodeContent': 'title'
			  		});

		
					var game = document.querySelector('#chart-container');
					game.innerHTML = '';
			  		document.querySelector('#chart-container').appendChild(orgchart); 
	  			});	
	 	
	}


	getFamily(): void {

  		let that = this;
  		this.familyService.getfamilies()
  			.subscribe(result => {   				
  				that.elementData = result['rows'];
                if(that.elementData.length>0) {
  				  that.selected2 = that.elementData[0].f_id;  				
                }
  			});
  	}

    getMembers(): void {

        let that = this;
        this.familyService.getMembers(document.cookie.split('uid=')[1].split(';')[0])
            .subscribe(result => {                  
                that.members = result['rows'];                  
            });
    }

}
