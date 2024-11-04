import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/categoria_productos", "CategoriaProductosController.find");
    Route.get("/categoria_productos/:id", "CategoriaProductosController.find");
    Route.post("/categoria_productos", "CategoriaProductosController.create");
    Route.put("/categoria_productos/:id", "CategoriaProductosController.update");
    Route.delete("/categoria_productos/:id", "CategoriaProductosController.delete");
})