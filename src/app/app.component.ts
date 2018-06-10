import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FamilyService } from './family.service';

// import OrgChart from '../assets/orgchart-webcomponents.js';

// import { FamilyService } from './family.service';

import {
    AuthService,
    //FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	
  	//datasource = {};

  	constructor(private socialAuthService: AuthService, private router: Router, 
  		private familyService: FamilyService) {  	  		
   	}

   	public socialSignIn(socialPlatform : string) {
   	let that = this;
    let socialPlatformProvider;
    // if(socialPlatform == "facebook"){
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // }else 
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        that.familyService.newUser(userData)
	  			.subscribe(result => {  
	  		console.log(result);
	  		document.cookie = "uid=" + result['rows'][0].u_id;
	  		console.log(document.cookie.split(';').filter((item) => { return item.includes('uid=')})[0].split('=')[1]);
	  		localStorage.setItem('token', result['auth'].token);
        	this.router.navigate(['home']);
        });
        // Now sign-in with userData
        //...
            
      });
	}

	logout() {
   		this.socialAuthService.signOut().then(() => {

   		},(err) => {
   			console.log(err);
   		});
 	//   	.then(
	// 	(data) => {
	//     	console.log(data);
	//     })
	// }
	}

   	ngOnInit() {   		
      	//this.createD3Gauge();            	
   	}

  	// newRelationship(row) {
  	// 	return {
			// 'id': row.r_id,
			// 'name': row.m1,
			// 'title': row.m2,
			// 'children': []
	  // 	};
  	// }
  	
  	// getTreeStructure(relationships, parentId) {  		
  	// 	for(let row of relationships) {  			
  	// 		if(row.parentid === parentId) {  				
  	// 			if(Object.keys(this.datasource).length === 0) {
	  // 				this.datasource = this.newRelationship(row);
	  // 			} else {	  					  					  						
			// 		this.addChildrens([this.datasource], parentId, row);  							  					
	  // 			}
  	// 			this.getTreeStructure(relationships, row.r_id);
  	// 		}
  	// 	}  		
  	// }

  	// addChildrens(childrens, parentId, row) {
  	// 	for(let children of childrens) {   			 			
  	// 		if(children.id === parentId) {  				  				  				
  	// 			children.children.push(this.newRelationship(row));		  		
  	// 		}
  	// 		this.addChildrens(children.children, row.parentid, row);
  	// 	}
  	// }

  //   createD3Gauge() { 
  //  		let that = this;   		
		// document.addEventListener('DOMContentLoaded', function () {
		// 	that.familyService.getRelationships()
	 //  			.subscribe(result => {   					  				
	 //  				that.getTreeStructure(result['rows'], 0);	  				
	  				
		// 			let orgchart = new OrgChart({
		// 	  	  		'data' : that.datasource,
		// 	    		'depth': 4,
		// 	    		'nodeContent': 'title'
		// 	  		});

		// 	  		document.querySelector('#chart-container').appendChild(orgchart); 
	 //  			});	

		// let datascource = {
		//     'name': 'Lao Lao',
		//     'title': 'general manager',
		//     'children': [
		//       	{ 'name': 'Bo Miao', 'title': 'department manager' },
		//       	{ 'name': 'Su Miao', 'title': 'department manager',
		//         'children': [
		//           { 'name': 'Tie Hua', 'title': 'senior engineer' },
		//           { 'name': 'Hei Hei', 'title': 'senior engineer',
		//             'children': [
		//               { 'name': 'Pang Pang', 'title': 'engineer' },
		//               { 'name': 'Xiang Xiang', 'title': 'UE engineer' }
		//             ]
		//           }
		//         ]
		//     	},
		//       	{ 'name': 'Yu Jie', 'title': 'department manager' },
		//       	{ 'name': 'Yu Li', 'title': 'department manager' },
		//       	{ 'name': 'Hong Miao', 'title': 'department manager' },
		//       	{ 'name': 'Yu Wei', 'title': 'department manager' },
		//       	{ 'name': 'Chun Miao', 'title': 'department manager' },
		//       	{ 'name': 'Yu Tie', 'title': 'department manager' }
		//     ]
		//  };

		  // orgchart = new OrgChart({
		  //   'data' : datascource,
		  //   'depth': 3,
		  //   'nodeContent': 'title'
		  // });

		  // document.querySelector('#chart-container').appendChild(orgchart); 

	// 	});
	// }
}
