import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, public router: Router) {
    
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: "Error de Registro",
        message:"Tienes que completar todos los campos",
        buttons: ["Aceptar"]
      })
      await alert.present();
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Registro completo!',
        message: 'Serás redireccionado a la página de Login',
        buttons: [{
          text:'Aceptar',
          handler: () => {
            this.router.navigateByUrl('/login');
          }
        },]
      });
      await alert.present();
    }

    var usuario = {
      nombre: f.nombre,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

}
