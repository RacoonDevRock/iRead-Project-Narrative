import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Story } from "../Modelo/Story";
import { Activity } from "../Modelo/Activity";
import { StoryDTO } from "../Modelo/StoryDTO";
import {environments} from "../../environments/environments";


@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  url:string = environments.baseUrl;

  private storyIdSource = new BehaviorSubject<number>(0);
  currentStoryId = this.storyIdSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  createStory(story: Story): Observable<Story> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': `application/json`,
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.url}/api/stories/createStory/${story.teacherId}`;
    return this.httpClient.post<Story>(url, story, {headers});
  }

  assignActivityToStory(activity: Activity): Observable<Activity> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': `application/json`,
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.url}/api/stories/${activity.storyId}/activity`;
    return this.httpClient.put<Activity>(url, activity, {headers});
  }


  getStoriesByTeacherId(teacherId: number): Observable<StoryDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': `application/json`,
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.url}/api/stories/byTeacher/${teacherId}`;
    return this.httpClient.get<StoryDTO[]>(url, {headers});
  }

  activateStory(storyId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': `application/json`,
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.url}/api/stories/activate/${storyId}`;
    return this.httpClient.put(url, null, {headers});
  }

  //trae la actividad al niño: publicEndpoint
  getAllActivities(storyId: number): Observable<Activity> {
    const headers = new HttpHeaders({
      'Content-Type': `application/json`,
    });
    const url = `${this.url}/api/stories/${storyId}/activity`;
    return this.httpClient.get<Activity>(url, {headers});
  }


  deactivateStory(storyId: number|undefined): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': `application/json`,
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.url}/api/stories/deactivate/${storyId}`;
    return this.httpClient.put(url, null, {headers});
  }

}
