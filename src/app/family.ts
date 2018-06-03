export class Member {
	u_id: number;
    name: string;
    m_id: number;    
}

export class Relationship {
	r_id: number;
	f_id: number;
	r_m_id1: number;
	r_m_id2: number;
	r_parent_id: number;    
}

export class Family {
	f_u_id: number;
    f_name: string;    
}