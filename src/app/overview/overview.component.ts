import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AngularFireModule, FirebaseDatabase } from '@angular/fire'; 
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { take } from "rxjs/operators"

interface Assesment {
  date: string,
  message: string,
  subject: string,
  title: string,
  type: string
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  usersRef: AngularFireList<any>;      // Reference to users list, Its an Observable
  userRef: AngularFireObject<any>;     // Reference to user object, Its an Observable too
  todo = [];
  done = [];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.GetUsersList().valueChanges();
    this.todo = [
      this.GetUser("-Lah2nYd2uVvY9LO88wT"),
      this.GetUser("-LahIJb_nJKPH1acCxVH"),
      this.GetUser("-LahNFW7CPDC1hti7ejh"),
    ];
    
    console.log(this.todo);

    this.done = [
      { title: "Titration Lab",
        date: "Wednesday"
      },
      { title: "Workout Plan",
        date: "Monday"
      }
    ];
  }

  GetUsersList() {
    this.usersRef = this.db.list('Assesments');
    return this.usersRef;
  }  

  // Create User
  AddUser(assesment: Assesment) {
    this.usersRef.push({
      date: assesment.date,
      message: assesment.message,
      subject: assesment.subject,
      title: assesment.title,
      type: assesment.type
    })
  }

  // Read User
  GetUser(id: string) {
    this.userRef = this.db.object('Assesments/' + id).take(1);
    return this.userRef;
  }

  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
