import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-id-generator',
  templateUrl: './id-generator.page.html',
  styleUrls: ['./id-generator.page.scss'],
})
export class IdGeneratorPage implements OnInit {



  public Code:number =0;
  public Code2:number =1;
  public char:string='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public index:number=0;
  public ID:string='';
  public copié:boolean=false;

  createID(){
// ici je définis que code sera égal à un nombre au hasard via mathRandom
// ici je définis que indexsera égal à un chiffre au hasard via mathRandom
//  Math.floor((Math.random() * 2000))+1000 permet de sélectionner un nombre entre 1000 et 2000

   this.Code=Math.floor((Math.random() * 9000))+1000;
   this.Code2=Math.floor((Math.random() * 9000))+1000;
   this.index=Math.floor(Math.random()*10);
   this.ID='LO-'+this.Code+'-'+this.Code2+'-'+this.char.charAt(this.index);

   // faire une ligne stipula,nt que le ID généré sera celui updaté dans Firebase.
   
  
  }

  // méthode permettant de copier coller l'id dans le presse-papier
  copier(ID) {

    if (ID=="") {
      alert('Vous n avez pas généré de code !');
    }else { 
      alert('Votre code locataire est copié dans le presse-papier!');
    }

    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (ID));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }


  constructor() { }

  ngOnInit() {
  }

}
