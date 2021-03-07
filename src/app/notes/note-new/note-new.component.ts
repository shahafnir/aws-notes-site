import { NotesService } from './../notes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note.model';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss'],
})
export class NoteNewComponent implements OnInit {
  newNoteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl(''),
  });

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {}

  async onAddNote() {
    const note = new Note(
      this.newNoteForm.value.title,
      this.newNoteForm.value.body
    );
    await this.notesService.addNote(note);

    this.newNoteForm.reset();
  }
}
