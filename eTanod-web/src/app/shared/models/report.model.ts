import { User } from './user.model';
export class Report {
	constructor(
	public type:string = null,
	public description:string = null,
	public created_at:string = null,
	public latitude:string = null,
	public longitude:string = null,
	public valid:boolean = null,
	public user:User
	){}
}
