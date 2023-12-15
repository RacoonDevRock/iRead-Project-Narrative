import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoryDTO } from '../Modelo/StoryDTO';
import { StudentDetails } from "../Modelo/studentDetails";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private selectedStorySource = new BehaviorSubject<StoryDTO | null>(null);
  selectedStory = this.selectedStorySource.asObservable();

  private activeSource = new BehaviorSubject<boolean>(false);
  active$ = this.activeSource.asObservable();


  setSelectedStory(story: StoryDTO) {
    this.selectedStorySource.next(story);
  }


  private storyId: number = 0;
  private studentId: number = 0;
  private storyIdActivity: number = 0;
  private activityId: number|undefined =0;
  private text: string ="";
  private text2: string ="";
  private active: boolean = false;
  private students: StudentDetails;
  private nombreAc: string| undefined;

  setStoryId(id: number): void {
    this.storyId = id;
  }

  setStoryActivityId(storyIdActivity: number): void {
    this.storyIdActivity = storyIdActivity;
  }

  setStudentId(studentId: number): void {
    this.studentId = studentId;
  }

  setText(text: string): void {
    this.text = text;
  }

  setText2(text2: string): void {
    this.text2 = text2;
  }

  setActive(active: boolean): void {
    this.active = active;
  }



  getStoryId(): number {
    return this.storyId;
  }

  getStoryActivityId(): number {
    return this.storyIdActivity;
  }



  getStudentId(): number {
    return this.studentId;
  }


  getActive(): boolean {
    return this.active;
  }

  getText(): string {
    return this.text;
  }

  getTex2t(): string {
    return this.text2;
  }

  setActivityId(activityId: number | undefined): void {
    this.activityId = activityId;
  }

  getActivityId(): number | undefined {
    return this.activityId;
  }


  setStudentDetails(students: StudentDetails){
    this.students=students;
  }

  getStudentDetails():StudentDetails{
    return this.students;
  }

  setNombreAc(nombreAc:string| undefined){
    this.nombreAc =nombreAc;
  }

  getNombreAc():string| undefined{
    return this.nombreAc;
  }

}
