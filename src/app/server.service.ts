import { Injectable } from '@angular/core';
import { Headers, Http , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Login } from './login';
import {Observable} from 'rxjs/Observable';
import { User } from './user';
import { Register } from './registerUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEvent} from '@angular/common/http';
import { AuUser } from './auuser';

@Injectable()
export class ServerService
{
    private isUserLoggedIn;
    hospitalname;
    hospitalid;
    sample_id;
    npnumber;
    notification_id;
    checkImgSrc;
  
    
    constructor(private http: Http,private https:HttpClient){
        
    }

    
    
    //url to connect to backend
   

        //local server and db
        public baseUrl= 'http://localhost:3052';

        //nimhans server
        //public baseUrl= 'https://labservices.nimhans.ac.in/etracker';

        //nimhans server - checked with below url
        //public baseUrl= 'http://10.11.3.140/etracker';
        

        //public baseUrl= 'http://10.11.3.140:8080/etracker';
        //public baseUrl= 'http://10.11.3.3:8080/etracker';
    
        //AWS server url
        //public baseUrl= 'http://13.126.225.131:8080/etracker';

    data: any= {};

    loginUser(login: Login)
    {  

       
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/login/post',login,{headers: headers})
        .map((res: Response) => res.text()).catch(this.errorHandler);
    }

    storeUser(user: User){

       this.hospitalname=sessionStorage.getItem(name)
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/patient',user,{headers: headers})
        .map((res: Response) => res.text()).catch(this.errorHandler);

    }

    gethospitaldetails(){
        this.hospitalname=sessionStorage.getItem(name)
        return this.http.get(this.baseUrl+'/hospital/'+this.hospitalname)
        .map((res: Response) => res.json()).catch(this.errorHandler);

    }

    getHospital_type(){

        this.hospitalid = sessionStorage.getItem("hospital_id");
        return this.http.get(this.baseUrl+'/hospitalDetails/'+this.hospitalid)
        .map((res: Response) => res.json()).catch(this.errorHandler);

    }
    

    getAllpatients(username:any){
        return this.http.get(this.baseUrl+'/patient/'+username)
        .map((res:Response) => res.json()).catch(this.errorHandler);
    }
    
    getAllDoctors(){
        return this.http.get(this.baseUrl+'/patient/doctors')
        .map((res:Response) => res.json()).catch(this.errorHandler);
    }

    updateSample(user: User) {

        
        //user = JSON.parse(JSON.stringify(user));
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/updatepatient',user,{headers: headers})
        .map((res: Response) => res.json()).catch(this.errorHandler);
    }

    filterData(category:string,subcategory:string){
        this.hospitalname=sessionStorage.getItem(name)
        const headers = new Headers({'Content-Type': 'text/plain'});
         return this.http.post(this.baseUrl + '/patientfilter/'+category+'/'+this.hospitalname,subcategory,{headers: headers})
        .map((res: Response) => res.json()).catch(this.errorHandler);
    }

    getSortedPatients(value:string){
        this.hospitalname=sessionStorage.getItem(name)
        return this.http.get(this.baseUrl+'/patientsort/'+value+'/'+this.hospitalname)
        .map((res:Response) => res.json()).catch(this.errorHandler);
    }
    
    getDetails(index:number){
        return this.http.get(this.baseUrl+'/patienttemp/'+index)
        .map((res:Response) => res.json()).catch(this.errorHandler);
        //const headers = new Headers({'Content-Type': 'text/plain'});
         //return this.http.post(this.baseUrl+'/patient/${index}',index,{headers: headers})
        //.map((res: Response) => res.json());,{params:index}
    }

    sendImages(fileToUpload:File[],checkImgSrc): Observable<HttpEvent<{}>>{
        console.log(fileToUpload);
        console.log(checkImgSrc);
        
        const _formData=new FormData();
        for(var i=0;i<fileToUpload.length;i++)
        _formData.append('files', fileToUpload[i]);
        _formData.append('checkImgSrc', checkImgSrc);

        const req = new HttpRequest('POST', this.baseUrl+'/uploadMultipleFiles', _formData, {
            reportProgress: true,
            responseType: 'text'
          });
       
          return this.https.request(req);
      
    }

    sendAUImages(fileToUpload:File[],checkImgSrc): Observable<HttpEvent<{}>>{
    console.log(fileToUpload);
    console.log(checkImgSrc);
       
        const _formData=new FormData();
        for(var i=0;i<fileToUpload.length;i++)
        _formData.append('files', fileToUpload[i]);
        _formData.append('checkImgSrc', checkImgSrc);
        console.log(_formData);

        const req = new HttpRequest('POST', this.baseUrl+'/uploadMultipleFiles', _formData, {
            reportProgress: true,
            responseType: 'text'
          });
       
          return this.https.request(req);
      
    }

    // to get all messages for a sample_id for a hospital
    getmessages(){
        this.hospitalname=sessionStorage.getItem(name);
        this.hospitalid = sessionStorage.getItem("hospital_id");
        this.npnumber = sessionStorage.getItem("npnumber");
        // return this.http.get(this.baseUrl+'/notification/1/1')
        return this.http.get(this.baseUrl+'/allnotification/1/'+this.hospitalid)
        .map((res: Response) => res.json()).catch(this.errorHandler);

    }

    //to get notification count
    get_notification_count(){
       
        // return this.http.get(this.baseUrl+'/notification/1/1')
        return this.http.get(this.baseUrl+'/notificationscount/1/'+this.hospitalid)
        .map((res: Response) => res.json()).catch(this.errorHandler);

    }

    //to update the read notification count
    get_readNotificationCount(){
        this.notification_id = sessionStorage.getItem("notify_id");
        
        return this.http.get(this.baseUrl+'/updateReadNotification/'+this.notification_id)
        .map((res: Response) => res.json()).catch(this.errorHandler);

    }

    //to get the messages of a particular sample_id of a hospital
    get_each_message(){
        this.sample_id=sessionStorage.getItem("sampleid");
        this.hospitalid = sessionStorage.getItem("hospital_id");
        // return this.http.get(this.baseUrl+'/notification/1/1')
        return this.http.get(this.baseUrl+'/notification/'+this.hospitalid+'/'+this.sample_id)
        .map((res: Response) => res.json()).catch(this.errorHandler);

    }

    //to post a reply message to a NIMHANS
    post_notification(msg){
        this.sample_id=sessionStorage.getItem("sampleid");
        this.hospitalid = sessionStorage.getItem("hospital_id");
        this.npnumber = sessionStorage.getItem("npnum");

        
        // return this.http.get(this.baseUrl+'/notification/1/1')
        let obj={
            "hospitalid": this.hospitalid,
            "notification_msg": msg,
            "np_num": this.npnumber,
            "portal_flag": 2,
            "read_flag": 0,
            "sample_id": this.sample_id
            }
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/addNotification',obj,{headers: headers})
        .map((res: Response) => res.text()).catch(this.errorHandler);
        

    }

   
    //to save AU lab sample
    storeAUUser(user: AuUser){
 console.log(user);
       this.hospitalname=sessionStorage.getItem(name)
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/aupatient',user,{headers: headers})
        .map((res: Response) => res.text()).catch(this.errorHandler);

    }

    errorHandler(error:Response){

            return Observable.throw(error||"SERVER ERROR");
       }

       //to get all AU lab samples
       getAllAUpatients(hosp_id){

        return this.http.get(this.baseUrl+'/aupatient/'+hosp_id)
        .map((res:Response) => res.json()).catch(this.errorHandler);

       }

       // to display the AU sample details in the add/edit page
       getAUDetails(index:number){

        return this.http.get(this.baseUrl+'/aupatienttemp/'+index)
        .map((res:Response) => res.json()).catch(this.errorHandler);

       }

       UpdateAUUser(user: AuUser){

        
        //user = JSON.parse(JSON.stringify(user));
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/updateAupatient',user,{headers: headers})
        .map((res: Response) => res.json()).catch(this.errorHandler);

       }

       getAllLabDetails(){
           
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/labtestDetails',{headers: headers})
       .map((res: Response) => res.json()).catch(this.errorHandler);

       }

       //to register new external hosptial from the external portal
       registerHospital(registerUser: Register){
        console.log(registerUser)
        const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/login',registerUser,{headers: headers})
        .map((res: Response) => res.text()).catch(this.errorHandler);

       }

   
       //to update the email_verfiy_flag so that the superadmin from 
       //sampletracker can approve or reject the external hospital
       emailVerify(email){

      
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(this.baseUrl + '/updateflagByemail/'+email,{headers: headers});
       //.map((res: Response) => res.json()).catch(this.errorHandler);

       }

       //for forgot password
       forgotPassword(email){

        //const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.get(this.baseUrl + '/forgotemail/'+email)
        .map((res: Response) => res.text()).catch(this.errorHandler);

       }

       newPassword(email,new_pw){

        return this.http.get(this.baseUrl + '/updatepwd/'+email+'?password='+new_pw)
        .map((res: Response) => res.text()).catch(this.errorHandler);



       }

}
