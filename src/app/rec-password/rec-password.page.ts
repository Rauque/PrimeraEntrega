import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-rec-password',
  templateUrl: './rec-password.page.html',
  styleUrls: ['./rec-password.page.scss'],
})
export class RecPasswordPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async rec_pass() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');

    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      if (usuario.nombre == f.nombre && usuario.password ==! f.password) {
        console.log('Password recuperada');
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateRoot('login');
      } else {
        const alert = await this.alertController.create({
          header: 'Usuario no encontrado',
          message: 'Tienes que ingresar un usuario registrado',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    } 

    localStorage.setItem('password',JSON.stringify(usuario));
  }
}
