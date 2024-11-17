import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';
import VehiculoValidator from 'App/Validators/VehiculoValidator';

export default class VehiculosController {
     //Params son los parametros que vienen en la URL
     public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id)
            return theVehiculo;
        //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Vehiculo.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Vehiculo.query()
            }

        }

    }
    
    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(VehiculoValidator);
        const body = request.body();
        const theVehiculo: Vehiculo = await Vehiculo.create(body);
        return theVehiculo;
    }

    public async update({ params, request }: HttpContextContract) {
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
        const body = request.body();
        theVehiculo.plate = body.plate;
        theVehiculo.model = body.model;
        theVehiculo.capacity = body.capacity;
        theVehiculo.cargo_type = body.cargo_type;
        return await theVehiculo.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
            response.status(204);
            return await theVehiculo.delete();
    }
}
