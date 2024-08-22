import { Component , OnInit} from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { RouterModule,Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Hide the splash (you should do this on app launch)
  productos: any[]=[
   {"id":1,"title":"Mexico","Description":"Es el décimo cuarto país más extenso del mundo, con una superficie cercana a los 2 millones de kilómetros cuadrados. Es el undécimo país más poblado del mundo, con una población de aproximadamente 118 millones de habitantes. La lengua materna es el español, que convive junto con 67 lenguas indígenas.","images":["../../assets/img/P1.jpg"]},
   {"id":2,"title":"Indonesia","Description":"El mayor archipiélago del mundo, está formada por más de 17.500 islas, y se encuentra en el extremo suroriental de Asia, enlazando geográficamente con el continente australiano. Cuenta con 54.000 km. de costa, la segunda más larga del mundo después de la canadiense.","images":["../../assets/img/p2.jpg"]},
   {"id":3,"title":"Nueva Zelanda","Description":"Un pais con 4.4 millones de personas. Es uno de los paises desarrollados mas aislados del mundo, lo cual provoco la creaciòn de una flora y fauna unica en el mundo convirtiendose en uno de los paisajes perfectos para las peliculas de ficciòn como el señor de los anillos. ","images":["../../assets/img/p3.jpg"]},
   {"id":4,"title":"Colombia","Description":"Es uno de los paises megadiversos contando con almenos 130,000 especies de plantas y 1,800 especies de aves. En clombia hay aproximadamente 49 millones de habitantes pero en cada region de su pais alberga una cultura, ritmos y tradiciones distintas. A su vez este es el 2 mayor productor de cafe a nivel mundial y el primero en producir cafe suave.","images":["../../assets/img/p4.jpg"]},
   {"id":5,"title":"India","Description":"La India es reconocida como el país de los mil colores contando con el mausoleo más popular del mundo el Taj Mahal. El Taj Mahal es un Patrimonio de la Humanidad de la UNESCO por su combinación de arquitectura India, Islamica y Persa construida en 1632. La gastronomía India tiene como ingredientes principales el arroz, atta, garbanzo, lenteja negra y la soja verde.","images":["../../assets/img/p5.jpg"]},
   {"id":6,"title":"Francia","Description":"En Francia se encuentra la ciudad del Amor (París). Este es uno de los países mundialmente reconocidos por su gastronomía como el Omelette, pot-au-feu, pollo al vino, Ratatouille, los crepes franceses y sus quesos y vinos los cuales son considerados como los mejores del mundo para algunos.  En cuanto a su comercio Francia destaca en el sector de los perfumes y en la moda.","images":["../../assets/img/p6.jpg"]},
   {"id":7,"title":"Ecuador","Description":"Los cuatro mundos del ecuador, desde la cálida Costa bañada por el Pacífico, los valles templados de la cordillera de los Andes, la selva Amazónica repleta de diversidad y las maravillosas Islas Galápagos. País el cual tiene como una de sus principales actividades económicas el turismo por lo que existen una gran variedad de planes de viajes.","images":["../../assets/img/p7.jpg"]},
   {"id":8,"title":"Estados Unidos","Description":"Estados Unidos es un referente cultural y político para todo el mundo. Dentro de este se pueden encontrar desde pequeñas metrópolis hasta las más grandes como Nueva York, a su vez si no te gusta la ciudad Estados Unidos es uno de los países megadiversos teniendo cordilleras que atraviesan el continente, ríos larguísimos, playas paradisíacas, lagos interiores como mares y  llanuras que abarcaría países europeos completos.","images":["../../assets/img/p8.jpg"]},
   {"id":9,"title":"Japon","Description":"Es uno de los países que ha logrado mezclar la modernidad con la antigüedad. Su capital Tokio es una de las ciudades más pobladas del mundo con más de 13 millones de habitantes. En las ciudades de Japón se puede encontrar la cultura antigua japonesa casi en todos lados debido a sus templos y palacios dejados atrás. A su vez en cuanto a naturaleza se puede encontrar el famoso Monte Fuji.","images":["../../assets/img/p9.jpg"]},
   {"id":10,"title":"Italia","Description":"La cuna del renacimiento europeo siendo el lugar de nacimiento de muchos artistas. En Italia se encuentran las ruinas romanas como el coliseo Romano el cual expone la grandeza de la antigua roma. Si se quiere admirar el arte se puede visitar Florencia y el Vaticano. En cuanto a la naturaleza Italia tiene una variedad natural que va desde los Alpes, en el norte, con innumerables rutas donde perderse entre valles y montañas hasta las cristalinas playas del sur y sus islas","images":["../../assets/img/p10.jpg"]},
   ];
filteredProducts: any[]=[];
async ngOnInit() {
  await SplashScreen.hide();
  this.filteredProducts = this.productos;

}

constructor(private router: Router, toastController: ToastController, private navCtrl: NavController) {}

Viaje(a:string){
  this.navCtrl.navigateForward('/viaje/'+ a);
}

handleChange(event: any){
    const searchTerm= event.detail.value;
    if(searchTerm==''){
      this.filteredProducts = this.productos;
    }
    else{
      this.filteredProducts = this.productos.filter(p => {
        return p.title.includes(searchTerm) || p.Description.includes(searchTerm);
      });
    }
  }
}

