import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';
import ClienteValidator from 'App/Validators/ClienteValidator';

export default class ClientesController {
    //Params son los parametros que vienen en la URL
    public async find({ request, params }: HttpContextContract) {
        //Entonces si viene un id en los parametros, busco el teatro con ese id
        if (params.id) {
            let theCliente: Cliente = await Cliente.findOrFail(params.id)
            return theCliente;
            //Sino, se buscan todos los teatros
        } else {
            const data = request.all()
            //Para no mandar todos los registros de una, se maneja la paginacion
            if ("page" in data && "per_page" in data) {
                //Si lo mandan, coja el atributo, sino asuma lo de la derecha
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cliente.query().paginate(page, perPage)
            } else {
                //Devuelve la lista de todos los teatros
                return await Cliente.query()
            }

        }

    }

    //HttpContextContract es la que recibe la peticion (request) y la respuesta (response)
    public async create({ request }: HttpContextContract) {
        await request.validate(ClienteValidator);
        const body = request.body();
        const theCliente: Cliente = await Cliente.create(body);
        return theCliente;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCliente: Cliente = await Cliente.findOrFail(params.id);
        const body = request.body();
        theCliente.nit = body.nit;
        theCliente.dpi = body.dpi;
        return await theCliente.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCliente: Cliente = await Cliente.findOrFail(params.id);
        response.status(204);
        return await theCliente.delete();
    }
}
