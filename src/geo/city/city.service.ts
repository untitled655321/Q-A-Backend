import { Injectable } from '@nestjs/common';
import {Coor} from "../coor.entity";
import {User} from "../../auth/user.entity";

var fs = require('fs');
var inside = require('point-in-polygon');

var data = '';
var readStream = fs.createReadStream('../qabackend/src/files/countries.json', 'utf8');


@Injectable()
export class CityService {

    public async getCity(coordinates: Coor): Promise< any | { status: number }>{
        return this.findCountry(coordinates).then((data)=> {
            return {data:data};
        });

    }

    public async findCountry(coordinates: Coor): Promise< any | { status: number }>{


        let inside_polygon_flag = false;
        console.log(coordinates);
        let lat = coordinates.lat;
        let lng = coordinates.lng;
    let country: String;
    let citiesArray:any = [];
        var data = fs.readFileSync('../qabackend/src/files/countries.json');
        var cities = fs.readFileSync('../qabackend/src/files/majorCities.json');

                let json = JSON.parse(data);
                let citiesJson = JSON.parse(cities);

                //your code using json object
                for(let number in json.features){
                    //coordinates for polygon of each country

                    if(json.features[number].geometry.coordinates.length>1){

                        for(let poligon_part in json.features[number].geometry.coordinates){

                            //console.log(json.features[number].geometry.coordinates[0][poligon_part]);
                            let multi_polygon_coordinates = json.features[number].geometry.coordinates[poligon_part][0];
                           // console.log(polygon_coordinates);
                            inside_polygon_flag = inside([ lng,lat ], multi_polygon_coordinates);
                            if(inside_polygon_flag == true){
                                break;
                            }
                        }
                    }
                    else{
                        let polygon_coordinates = json.features[number].geometry.coordinates[0];
                        inside_polygon_flag = inside([ lng,lat ], polygon_coordinates);
                        //console.log(polygon_coordinates);
                    }

                   //console.log(json.features[number].geometry.coordinates[0].length);

                    //console.log(coordinates);


                    if(inside_polygon_flag == true){
                        country = json.features[number].properties.ISO_A3;
                        console.log(country);
                        for(let citiesIndex in citiesJson){
                            if(citiesJson[citiesIndex].iso3==country){

                                citiesArray.push(citiesJson[citiesIndex]);
                            }
                        }

                        return citiesArray;
                        break;
                    }

                    }



    }

}







