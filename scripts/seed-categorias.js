"use strict";

const { Strapi } = require("@strapi/strapi");

(async () => {
  const app = await Strapi().load();

  const categorias = [
    "Mujer",
    "Hombre",
    "Calzado",
    "Complementos",
    "Nueva Colección",
    "Ofertas"
  ];

  for (const nombre of categorias) {
    const slug = nombre.toLowerCase().replace(/ /g, "-");
    const existente = await strapi.db.query("api::categoria.categoria").findOne({
      where: { slug },
    });

    if (!existente) {
      await strapi.db.query("api::categoria.categoria").create({
        data: {
          nombre,
          slug,
          seo_titulo: `${nombre} | Verde Oliva Atelier`,
          seo_descripcion: `Descubre la colección ${nombre} en Verde Oliva Atelier. Moda y estilo para cada ocasión.`,
          publishedAt: new Date(),
        },
      });
      console.log(`✅ Categoría creada: ${nombre}`);
    } else {
      console.log(`⚠️ Ya existía: ${nombre}`);
    }
  }

  console.log("✨ Importación completada.");
  process.exit(0);
})();
