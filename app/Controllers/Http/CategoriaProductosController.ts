import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriaProducto from 'App/Models/CategoriaProducto';

export default class CategoriaProductoProductosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id)
            return theCategoriaProducto;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await CategoriaProducto.query().paginate(page, perPage)
            } else {
                return await CategoriaProducto.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.create(body);
        return theCategoriaProducto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
        const body = request.body();
        theCategoriaProducto.producto_id = body.producto_id;
        theCategoriaProducto.categoria_id = body.categoria_id;
        return await theCategoriaProducto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
            response.status(204);
            return await theCategoriaProducto.delete();
    }
}
