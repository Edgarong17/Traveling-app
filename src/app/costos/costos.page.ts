import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications,ScheduleOptions} from "@capacitor/local-notifications";



@Component({
  selector: 'app-costos',
  templateUrl: './costos.page.html',
  styleUrls: ['./costos.page.scss'],
})
export class CostosPage implements OnInit {
  costototal:number=0;
  Hotel:number=0;
  Comida:number=0;
  Viaje:number=0;
  Actividades:number=0;
  Ciudad: string='';
  url:string='';

  productos: any[]=[
   {"id":1,"Pais":"Mexico","Ciudad":"San Miguel de Allende (Guanajuato)","Hotel":"1500","Comida":"1200","Viaje":"700","Actividades":"320","Distancia":"270km","Description":"Un viaje a San Miguel de Allende desde la ciudad de Mexico. La ciudad de San Miguel de Allende cuenta con una buena arquitectura y la parroquia de San Miguel de Arcángel inspirada en las iglesias góticas del antiguo continente. Esta ciudad obtuvo en 2020 el Sello de Viaje Seguro del Consejo Mundial de Viajes y Turismo (WTTC) y fue la segunda mejor ciudad del mundo para viajar por los premios World 's Best Awards en 2020.","images":["../../assets/Map/SanMiguel.png"],"lat":"13.483","long":"-88.183","zoom":"5"},
   {"id":2,"Pais":"Mexico","Ciudad":"Cancun","Hotel":"3433","Comida":"2450","Viaje":"2766","Actividades":"1461","Distancia":"1,610km","Description":" ","images":["../../assets/Map/CANCUN.png"],"lat":"21.1334","long":"-86.845","zoom":"5"},
   {"id":3,"Pais":"Mexico","Ciudad":"Ciudad de Mexico","Hotel":"1500","Comida":"400","Viaje":"1321","Actividades":"890","Distancia":"0","Description":" ","images":["../../assets/Map/CDMX.png"],"lat":"19.432608","long":"-99.133209","zoom":"5"},
   {"id":4,"Pais":"Indonesia","Ciudad":"Yakarta","Hotel":"655","Comida":"520","Viaje":"48193","Actividades":"1380","Distancia":"16,835","Description":" ","images":["../../assets/Map/YAKARTA.png"],"lat":"-6.2","long":"106.816666","zoom":"2"},
   {"id":5,"Pais":"Indonesia","Ciudad":"Ubud","Hotel":"814","Comida":"531","Viaje":"46465","Actividades":"1000","Distancia":"15,648","Description":" ","images":["../../assets/Map/UBUD.png"],"lat":"-8.519268","long":"115.263298","zoom":"2"},
   {"id":6,"Pais":"Indonesia","Ciudad":"Surabaya","Hotel":"589","Comida":"465","Viaje":" 86747","Actividades":"935","Distancia":"16,308km","Description":"Surabaya es una metrópoli e importante puerto de Indonesia, situada en la costa norte de la isla de Java, sobre la boca del río Mas y a un lado del estrecho de Madura. Surabaya es capital de la provincia de Java Oriental y cuenta con 3.520.874 habitantes, siendo la segunda metrópoli más poblada del país","images":["../../assets/Map/SURABAYA.png"],"lat":"-7.250445","long":"112.768845","zoom":"2"},
   {"id":7,"Pais":"Nueva Zelanda","Ciudad":"Auckland ","Hotel":"1438","Comida":"1600","Viaje":"47170","Actividades":"770","Distancia":"270km","Description":"Conocida como la ciudad de las velas, Auckland es la localidad más grande de Nueva Zelanda y una de las más llamativas. Ha sido bendecida con un espectacular paseo marítimo, un magnífico horizonte y numerosasplayas.","images":["../../assets/Map/AUCKLAND.png"],"lat":"-36.85","long":"174.78333","zoom":"1"},
   {"id":8,"Pais":"Nueva Zelanda","Ciudad":"Wellington ","Hotel":"1438","Comida":"1700","Viaje":"48742","Actividades":"930","Distancia":"270km","Description":"Situada en un bucólico entorno junto al mar, Wellington es la capital de un mundo en miniatura llamado Nueva Zelanda. En esta tierra de película te esperan playas de ensueño, espectaculares fiordos, piscinas geotérmicas, selvas tropicales, impresionantes glaciares y bosques encantados.","images":["../../assets/Map/WELLINGTON.png"],"lat":"-41.28664","long":"174.77557","zoom":"1"},
   {"id":9,"Pais":"Nueva Zelanda","Ciudad":"Queenstown ","Hotel":"2242","Comida":"1400","Viaje":"45111","Actividades":"2636","Distancia":"11,683km","Description":"Esta ciudad es una de las más bonitas de la isla sur de Nueva Zelanda. Además, Queenstown es la capital mundial de los deportes de aventura. A través de sus valles, lagos, montañas y ríos se pueden realizar todo tipo de deportes como parapente, puenting, deportes acuáticos, rutas de trekking, etc.","images":["../../assets/Map/QUEENSTOWN.png"],"lat":"-45.03023","long":"168.66271","zoom":"1"},
   {"id":10,"Pais":"Colombia","Ciudad":"Medellín","Hotel":"565","Comida":"144","Viaje":" 4443","Actividades":"460","Distancia":"2,938 km","Description":"Es la capital del departamento de Antioquia y la segunda ciudad más poblada del país después de Bogotá. Tambien su clima es mayormente templado llegando a ser reconocida como la ciudad de la Eterna Primavera","images":["../../assets/Map/MEDELLIN.png"],"lat":"6.25184","long":"-75.56359","zoom":"3"},
   {"id":11,"Pais":"Colombia","Ciudad":"Bogotá","Hotel":"1112","Comida":"158","Viaje":"5834 ","Actividades":"1200","Distancia":"3169km","Description":"Bogotá es la capital y ciudad más poblada de Colombia. Tiene más de siete millones de habitantes, lo que la convierte en una de las grandes urbes del continente sudamericano. Aunque existían asentamientos indígenas precolombinos, la fundación de facto de la ciudad se produjo en 1538 por los españoles.","images":["../../assets/Map/BOGOTA.png"],"lat":"4.60971","long":"-74.08175","zoom":"3"},
   {"id":12,"Pais":"Colombia","Ciudad":"Santa Marta","Hotel":"519","Comida":"177","Viaje":"8841","Actividades":"760","Distancia":" 2,822 km","Description":"Santa Marta es el segundo puerto maritimo de Colombia en el oceano Atlantico. Aparte de sus bellas playas en Santa Maria se encuentra la Sierra Nevada de Santa Marta la cual es la montaña intertropical más alta del mundo a la orilla del mar","images":["../../assets/Map/SANTA.png"],"lat":"11.24079","long":"-74.19904","zoom":"3"},
   {"id":13,"Pais":"India","Ciudad":"Delhi","Hotel":"3218","Comida":"214","Viaje":"22414","Actividades":"585","Distancia":"14638km","Description":"Delhi es la capital de la República de la India y también una ciudad con fines administrativos. Es una de las metrópolis más grandes del país. Delhi comparte sus fronteras con los estados de Uttar Pradesh y Haryana. Es el centro de la política internacional, el comercio, la cultura y la literatura en la India.","images":["../../assets/Map/DELHI.png"],"lat":"28.65195","long":"77.23149","zoom":"2"},
   {"id":14,"Pais":"India","Ciudad":"Bombai","Hotel":"2562","Comida":"462","Viaje":" 26224","Actividades":"436","Distancia":"15636km","Description":"Bombay también conocida como Mumbai, es la capital del estado federal de Maharashtra. Es la ciudad más poblada de la India y la cuarta más poblada del mundo. La ciudad se encuentra en la costa del mar Arábigo en el oeste de la India, y tiene un puerto natural de gran profundidad.","images":["../../assets/Map/BOMBAY.png"],"lat":"19.07283","long":"72.88261","zoom":"2"},
   {"id":15,"Pais":"India","Ciudad":"Bangalore","Hotel":"1940","Comida":"320","Viaje":"33376","Actividades":"734","Distancia":"16384km","Description":"Bangalore es la capital del estado de Karnataka, en la India. Es conocida como la ciudad jardín (Garden City), debido a la cantidad de árboles y flores que contiene. Su población es de 4,5 millones de habitantes, lo que la convierte en la cuarta mayor ciudad del país.","images":["../../assets/Map/BANGALORE.png"],"lat":"12.91723","long":"74.85603","zoom":"2"},
   {"id":16,"Pais":"Francia","Ciudad":"Paris","Hotel":"1549 ","Comida":"1130","Viaje":" 27800","Actividades":"742","Distancia":"9,210km","Description":"  París, una de las más bonitas ciudades del mundo, seduce en primer lugar por su excepcional patrimonio arquitectónico y cultural. Un patrimonio vivo, que no deja de modernizarse y enriquecerse. París es también la capital de la gastronomía, de la moda y de las compras.","images":["../../assets/Map/PARIS.png"],"lat":"48.85341","long":"2.3488","zoom":"2"},
   {"id":17,"Pais":"Francia","Ciudad":"Niza","Hotel":"2351","Comida":"659","Viaje":" 28215","Actividades":"752","Distancia":"9,766km","Description":" Niza es una ciudad de Francia que se encuentra frente al mar Mediterráneo, en el sureste del país, cerca de la frontera con Italia. Es la capital de la Riviera Francesa o Costa Azul, una zona turística con un clima templado y una arquitectura elegante. Es la segunda ciudad más poblada de la costa sur de Francia, después de Marsella, y la ciudad con más museos en Francia, después de París","images":["../../assets/Map/NIZA.png"],"lat":"48.85341","long":"2.3488","zoom":"2"},
   {"id":18,"Pais":"Francia","Ciudad":"Marsella","Hotel":"1054","Comida":"941","Viaje":" 23270","Actividades":"821","Distancia":"9,647km","Description":" Marseille es ciudad más antigua de Francia, ya que fue fundada por los foceos en el año 600 a. C. Después de que los romanos dejaron su huella, la ciudad siguió desarrollándose mediante una verdadera mezcolanza de culturas, alrededor del puerto Viejo, protegido por sus dos fuertes, Saint-Nicolas y Saint-Jean.","images":["../../assets/Map/MARSELLA.png"],"lat":"43.29695","long":"5.38107","zoom":"2"},
   {"id":19,"Pais":"Ecuador","Ciudad":"Quito","Hotel":"1355","Comida":"382","Viaje":"5941","Actividades":"151.25","Distancia":"3134km ","Description":"Quito, la capital de Ecuador, se encuentra a más de 2800 msnm y está rodeada de volcanes como el Pichincha y el Atacazo que superan los 4000. Cuenta con algo más de un millón y medio de habitantes.","images":["../../assets/Map/QUITO.png"],"lat":"-0.22985","long":"-78.52495","zoom":"3"},
   {"id":20,"Pais":"Ecuador","Ciudad":"Guayaquil","Hotel":"1732","Comida":"179","Viaje":"4989","Actividades":"133","Distancia":" 3192km","Description":"Santiago de Guayaquil es la ciudad más poblada de la República del Ecuador. El área urbana de Guayaquil la ubica entre las ciudades más grandes del mundo. Es además un importante centro de comercio con influencia a nivel regional en el ámbito comercial, de finanzas, cultural, y de entretenimiento.","images":["../../assets/Map/GUAYAQUIL.png"],"lat":"-2.19616","long":"-79.88621","zoom":"3"},
   {"id":21,"Pais":"Ecuador","Ciudad":"Manta","Hotel":"1936","Comida":"342","Viaje":" 7676","Actividades":"144","Distancia":"3029km","Description":"Manta es el primer puerto turístico, marítimo y pesquero del Ecuador. Está asentado en una espléndida bahía, que le ha dado la característica de puerto internacional en el Océano Pacífico.","images":["../../assets/Map/MANTA.png"],"lat":"-0.96212","long":"-80.71271","zoom":"3"},
   {"id":22,"Pais":"Estados Unidos","Ciudad":"Nueva York","Hotel":"3587","Comida":"4636.37","Viaje":" 8915","Actividades":"25376","Distancia":"4,109.2km","Description":"Nueva York es la ciudad más poblada del Estado de Nueva York, en los Estados Unidos de América, y la segunda aglomeración urbana del continente. Es el centro del área metropolitana de Nueva York, la cual está entre las cinco aglomeraciones urbanas más grandes del mundo.","images":["../../assets/Map/NYC.png"],"lat":"40.71427","long":"-74.00597","zoom":"3"},
   {"id":23,"Pais":"Estados Unidos","Ciudad":"Boston","Hotel":"4413","Comida":"225","Viaje":" 10512","Actividades":"1305","Distancia":"4,463.7km","Description":"Boston es una ciudad pequeña, pero encantadora. Es la capital del estado de Massachusetts, en Estados Unidos. Se caracteriza por ser una de las ciudades más antiguas del país y estar cargada de historia, cultura y lugares emblemáticos.","images":["../../assets/Map/BOSTON.png"],"lat":"42.35843","long":"-71.05977","zoom":"3"},
   {"id":24,"Pais":"Estados Unidos","Ciudad":"Ohio","Hotel":"2182","Comida":"1129","Viaje":"17544 ","Actividades":"2430","Distancia":"3,544 km","Description":"Es uno de los cincuenta estados de los Estados Unidos, situado en la Región de los Grandes Lagos y uno de sus principales centros industriales. Localizado en el Medio Oeste de Estados Unidos (la región más industrializada del país), Ohio tiene a la industria como su principal fuente de ingresos. Otras fuentes de ingresos importantes son las finanzas, la minería del carbón (que ayudó a hacer de Ohio una de las principales potencias industriales del país), la agricultura y el turismo.","images":["../../assets/Map/OHIO.png"],"lat":"39.96118","long":"-82.99879","zoom":"3"},
   {"id":25,"Pais":"Japon","Ciudad":"Tokio","Hotel":"1400","Comida":"772","Viaje":" 37620","Actividades":"1015","Distancia":"11,325km","Description":" Tokio (Tokyo en inglés) es la capital de Japón y la metrópolis más grande del mundo con 34,5 millones de habitantes. La densidad de población es el doble que la de, por ejemplo, Nueva York.La ciudad de Tokio (ocho millones y medio) cuenta con 23 barrios y es la zona que concentra los principales lugares de interés turístico.","images":["../../assets/Map/TOKIO.png"],"lat":"35.6895","long":"139.69171","zoom":"1"},
   {"id":26,"Pais":"Japon","Ciudad":"Osaka","Hotel":"920","Comida":"741","Viaje":"43263","Actividades":"635","Distancia":"11,698km","Description":" Osaka es una ciudad relajada y llena de encanto, famosa por su gastronomía, ocio y vida nocturna, pero en la que también tienen cabida la historia y la cultura. Hay lugares de interés histórico, entre los que destaca el Castillo de Osaka, donde conocerás la historia japonesa y podrás pasear por sus jardines, especialmente hermosos durante la época de floración de los cerezos en abril.","images":["../../assets/Map/OSAKA.png"],"lat":"34.69374","long":"135.50218","zoom":"1"},
   {"id":27,"Pais":"Japon","Ciudad":"Nagoya","Hotel":"678","Comida":"617","Viaje":" 44279","Actividades":"990","Distancia":"11,563km","Description":" Nagoya es la cuarta ciudad más grande de Japón pero ni de lejos es una de las más visitadas. Ahí se encuentra el Castillo de Nagoya, que dicen ser uno de los más bonitos del país. Fue construido a principios de 1.600 por Tokugawa Ieyasu, uno de los shōguns más importantes del periodo Edo, aunque fue arrasado durante los bombardeos de la II GM.","images":["../../assets/Map/BAGOYA.png"],"lat":"35.18147","long":"136.90641","zoom":"1"},
   {"id":28,"Pais":"Italia","Ciudad":"Milan(Lombardía)","Hotel":"5576","Comida":"1900","Viaje":"37150","Actividades":"9,815","Distancia":"270km","Description":"Milán, la capital de la región italiana de Lombardía, tiene algo para impresionar a todos los viajeros. Considerada como la capital mundial de la moda y el diseño, esta ciudad italiana seduce a sus visitantes con su abundante patrimonio cultural y arquitectónico, sus lugares inusuales y su gastronomía. .","images":["../../assets/Map/MILAN.png"],"lat":"45.46427","long":"9.18951","zoom":"2"},
   {"id":29,"Pais":"Italia","Ciudad":"Maranello(Emilia-Romaña)","Hotel":"2224","Comida":"1718","Viaje":"44537","Actividades":"2640","Distancia":"9,084km","Description":"Maranello es una ciudad al norte de Italia sin monumento alguno, pero que representa una catedral que debe visitar todo aficionado al motor desde que, en 1942, Enzo Ferrari decidiese instalar ahí la sede del que sería el equipo de competición más laureado de todos los tiempos… Maranello tiene un encanto especial. Quizás sea un pueblo sin vida, pero desprende una pasión que atrapa al contemplar que cada calle, comercio, plaza o tienda gira en torno a la marca que representa la máxima pasión por el automóvil deportivo.","images":["../../assets/Map/MARANELLO.png"],"lat":"44.53101","long":"10.86888","zoom":"2"},
   {"id":30,"Pais":"Italia","Ciudad":"Palermo(Sicilia)","Hotel":"2067","Comida":"1500","Viaje":"39397","Actividades":"2084","Distancia":"10,502km","Description":"Palermo es un verdadero rompecabezas, una ciudad llena de contrastes, donde la belleza y el abandono a menudo comparten los mismos espacios. La capital siciliana, sin embargo, sigue siendo una de las ciudades más fascinantes de Italia: es una amalgama de pueblos, culturas y tradiciones. Palermo tiene miles de caras: aquí se han reunido y mezclado personas de países lejanos, dejando señales indelebles en la arquitectura y en el alma de sus habitantes.","images":["../../assets/Map/PALERMO.png"],"lat":"38.13205","long":"13.33561","zoom":"2"}
   ];
filteredProducts: any[]=[];
pag: any='';
personas: number=1;
dias: number=1;
lat:number=0;
long:number=0;
latm:number=0;
longm:number=0;
zoom:number=0;
meses:number=1;
ahorrar:number=0;
cap:number=0;
constructor(private router: Router, toastController: ToastController,private route: ActivatedRoute) { }

async ngOnInit() {
  let id = this.route.snapshot.paramMap.get('id');
  this.pag=id;
  for(let i = 0 ; i <= this.productos.length; i++){
    if(this.pag==i){
      this.url=this.productos[i-1].images;
      this.Ciudad=this.productos[i-1].Ciudad;
      this.Hotel=this.productos[i-1].Hotel;
      this.Comida=this.productos[i-1].Comida;
      this.Viaje=this.productos[i-1].Viaje;
      this.Actividades=this.productos[i-1].Actividades;
      this.lat=this.productos[i-1].lat;
      this.long=this.productos[i-1].long;
      this.lat=+this.lat;
      this.long=+this.long;
      this.costototal=+this.Hotel;
      this.costototal=+this.Comida + this.costototal;
      this.costototal=+this.Viaje + this.costototal;
      this.costototal=+this.Actividades + this.costototal;
      this.zoom=this.productos[i-1].zoom;
      this.zoom=+this.zoom;
    }
  }
  this.ahorrar=this.costototal;
  const coordinates = await Geolocation.getCurrentPosition();
  const apiKey = 'AIzaSyDozjIMizOcghj8l7epwn_Jm28VMMj--qY';
  const mapRef: any = document.getElementById('map');
  this.latm=coordinates.coords.latitude;
  this.latm=this.latm+this.lat;
  this.latm=this.latm/2;
  this.longm=coordinates.coords.longitude;
  this.longm=this.longm+this.long;
  this.longm=this.longm/2;
  const newMap = await GoogleMap.create({
            id: 'my-map', // Unique identifier for this map instance
            element: mapRef, // reference to the capacitor-google-map element
            apiKey: apiKey, // Your Google Maps API Key
            forceCreate:true,
            config: {
              center: {
                    // The initial position to be rendered by the map
                lat: this.latm,
                lng: this.longm,
              },
            zoom: this.zoom, // The initial zoom level to be rendered by the map
          },
        });
  const markerId = await newMap.addMarker({
    coordinate: {
      lat: this.lat,
      lng: this.long,
    }
  });
  const mark = await newMap.addMarker({
    coordinate: {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    }
  });
} 
handleChange(event: any){

  for(let i = 0 ; i <= this.productos.length; i++){
    if(this.pag==i){
      this.Ciudad=this.productos[i-1].Ciudad;
      this.Hotel=this.productos[i-1].Hotel*this.dias;
      if(this.personas!=1){
        this.Hotel=this.Hotel*(this.personas/2);
      }
      this.Comida=this.productos[i-1].Comida*this.personas*this.dias;
      this.Viaje=this.productos[i-1].Viaje*this.personas;
      this.Actividades=this.productos[i-1].Actividades*this.personas*this.dias;
      this.costototal=+this.Hotel;
      this.costototal=+this.Comida + this.costototal;
      this.costototal=+this.Viaje + this.costototal;
      this.costototal=+this.Actividades + this.costototal;
    }
  }
  this.ahorrar=this.costototal-this.cap
  this.ahorrar=this.ahorrar/this.meses;
}

async not(){
  let options:ScheduleOptions={
    notifications:[
    {
      id:111,
      title:"Viaje a "+this.Ciudad,
      body: "",
      largeIcon: 'res://drawable/res',
      smallIcon: 'res://drawable/res',
      largeBody:"El Costo total del viaje es de "+this.costototal+"$, este sera pagado en "+this.meses+" meses y en cada mes tendras que ahorrar:"+this.ahorrar+"$. Este sera un viaje de "+this.personas+" personas y de "+this.dias+" noches"
    }
    ]
  }
  try{
    await LocalNotifications.schedule(options);
  }
  catch(ex){

  }
}
}