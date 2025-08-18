import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/entities';

@Injectable({ providedIn: 'root' })
export class UsuariosState {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  private apiUrl = 'https://689f921d6e38a02c5816a5d9.mockapi.io/sistema-gestion/users';

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((users) => {
        this.usersSubject.next(users);
      })
    );
  }

  addUser(newUser: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser).pipe(
      tap((createdUser) => {
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next([...currentUsers, createdUser]);
      })
    );
  }

  editUser(editedUser: User): Observable<User> {
    const userToUpdate = this.usersSubject
      .getValue()
      .find((u) => u.id === editedUser.id);

    if (!userToUpdate) {
      return throwError(() => new Error('No se encontró el usuario para actualizar.'));
    }

    const url = `${this.apiUrl}/${userToUpdate.id}`;

    return this.http.put<User>(url, editedUser).pipe(
      tap((updatedUserFromServer) => {
        const currentUsers = this.usersSubject.getValue();
        const updatedList = currentUsers.map((u) =>
          u.id === updatedUserFromServer.id ? updatedUserFromServer : u
        );
        this.usersSubject.next(updatedList);
      })
    );
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;

    return this.http.delete<void>(url).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue();
        const updatedList = currentUsers.filter((u) => u.id !== userId);
        this.usersSubject.next(updatedList);
      })
    );
  }

  getUsers(): User[] {
    return this.usersSubject.getValue();
  }

  setUser(users: User[]): void {
    this.usersSubject.next(users);
  }
}