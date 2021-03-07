import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Note } from './note.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = [];
  private serverEndpointUrl = environment.serverEndpointUrl;
  notesChanged = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) {}

  async setNotes() {
    try {
      this.notes = <Note[]>(
        await this.httpClient.get(this.serverEndpointUrl).toPromise()
      );

      this.notesChanged.next(this.notes.slice().reverse());
    } catch (error) {
      console.log(error);
    }
  }

  async addNote(note: Note) {
    try {
      const noteAdded = await this.httpClient
        .post(this.serverEndpointUrl, note)
        .toPromise();

      await this.setNotes();
    } catch (error) {
      console.log(error);
    }
  }
}
