import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';

export default class ClientesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCliente: Cliente = await Cliente.findOrFail(params.id)
    
            return theCliente;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cliente.query().paginate(page, perPage)
            } else {
                return await Cliente.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCliente: Cliente = await Cliente.create(body);
        return theCliente;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCliente: Cliente = await Cliente.findOrFail(params.id);
        const body = request.body();
        theCliente.telefono = body.telefono;
        theCliente.cantidadPedidos = body.cantidadPedidos;
        theCliente.producto_id = body.producto_id;
        return await theCliente.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCliente: Cliente = await Cliente.findOrFail(params.id);
            response.status(204);
            return await theCliente.delete();
    }
}
