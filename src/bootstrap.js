"use strict";

module.exports = async ({ strapi }) => {
  strapi.log.info("🚀 [Bootstrap] Iniciando comprobación de categorías base...");

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
      strapi.log.info(`✅ Categoría creada: ${nombre}`);
    } else {
      strapi.log.info(`⚠️ Ya existía: ${nombre}`);
    }
  }

  strapi.log.info("✨ [Bootstrap] Importación automática de categorías completada.");
};
