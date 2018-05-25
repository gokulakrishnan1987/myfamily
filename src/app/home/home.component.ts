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

	
  	constructor(private familyService: FamilyService, private dialog: MatDialog) { }

  	ngOnInit() {  		
  		this.createD3Gauge();  
  		this.getFamily();
  	}

  	openMemberDialog() {
    	const dialogConfig = new MatDialogConfig();    	
    	dialogConfig.data = document.cookie.split('uid=')[1].split(';')[0];
    	this.dialog.open(AddMemberDialogComponent, dialogConfig);
  	}

  	openRelationshipDialog() {
    	const dialogConfig = new MatDialogConfig();
    	dialogConfig.data = this.selected2;
    	this.dialog.open(AddRelationshipDialogComponent, dialogConfig);
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
			'children': []
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
	  				children.children.push(this.newRelationship(row));		  		
	  			}
	  			this.addChildrens(children.children, row.parentid, row);
	  		}
	  	}
  	}

    createD3Gauge() { 
   		let that = this;   		
		//document.addEventListener('DOMContentLoaded', function () {			
			that.familyService.getRelationships(this.selected2)
	  			.subscribe(result => {   	
	  				console.log(result);
	  				that.datasource = {};
	  				that.getTreeStructure(result['rows'], 0);
	  				
	  				
					let orgchart = new OrgChart({
			  	  		'data' : that.datasource,
			    		'depth': 4,
			    		'nodeContent': 'title'
			  		});

					//document.querySelector('#chart-container').innerHTML('');
					var game = document.querySelector('#chart-container');
					game.innerHTML = '';
			  		document.querySelector('#chart-container').appendChild(orgchart); 
	  			});	
	 	//});
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

}
