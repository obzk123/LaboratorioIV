import { Injectable } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , sendPasswordResetEmail, updatePassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth:Auth) { 
  }

  public SignUp(email:string, password:string)
  {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  public SignIn(email:string, password:string)
  {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public GetDataUser()
  {
    return this.auth.currentUser;
  }

  public ResetPassword(email:string)
  {
    return sendPasswordResetEmail(this.auth, email);
  }

  public UpdatePassword(newPassword:string)
  {
    const user = this.auth.currentUser;
    if(user)
    {
      return updatePassword(user, newPassword);
    }
    
    return null;
  }

  public SignOut()
  {
    return signOut(this.auth);
  }

  public GetUID()
  {
    return this.auth.currentUser?.uid;
  }
}


