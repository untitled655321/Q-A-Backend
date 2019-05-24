import { Injectable } from '@nestjs/common';
import {Coor} from "../coor.entity";
import {User} from "../../auth/user.entity";

var fs = require('fs');
var inside = require('point-in-polygon');

var data = '';
var readStream = fs.createReadStream('../qabackend/src/files/countries.json', 'utf8');
@Injectable()
export class CityService {
    private country: Promise;

    public async getCity(coordinates: Coor): Promise< any | { status: number }>{
        return this.findCountry(coordinates).then((data)=> {
            return {data:data};
        });

    }

    public async findCountry(coordinates: Coor): Promise< any | { status: number }>{


        var inside_polygon_flag = false;
        console.log(coordinates);
        var lat = coordinates.lat;
        var lng = coordinates.lng;
        fs.readFile('../qabackend/src/files/countries.json', (err, data) => {
            if (err)
                console.log(err);
            else {
                var json = JSON.parse(data);
                //your code using json object
                for(var number in json.features){
                    //coordinates for polygon of each country

                    if(json.features[number].geometry.coordinates.length>1){

                        for(var poligon_part in json.features[number].geometry.coordinates){

                            //console.log(json.features[number].geometry.coordinates[0][poligon_part]);
                            var multi_polygon_coordinates = json.features[number].geometry.coordinates[poligon_part][0];
                           // console.log(polygon_coordinates);
                            inside_polygon_flag = inside([ lng,lat ], multi_polygon_coordinates);
                            if(inside_polygon_flag == true){
                                break;
                            }
                        }
                    }
                    else{
                        var polygon_coordinates = json.features[number].geometry.coordinates[0];
                        inside_polygon_flag = inside([ lng,lat ], polygon_coordinates);
                        //console.log(polygon_coordinates);
                    }

                   //console.log(json.features[number].geometry.coordinates[0].length);

                    //console.log(coordinates);


                    if(inside_polygon_flag == true){
                        this.country = json.features[number].properties.ADMIN;

                        break;
                    }

                    }

                }

        })
        return this.country;
    }



}







