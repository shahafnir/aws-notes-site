import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from './../notes.service';
import { Note } from './../note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[];
  notesSubscription: Subscription;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesSubscription = this.notesService.notesChanged.subscribe(
      (notes) => (this.notes = notes)
    );
  }
}
