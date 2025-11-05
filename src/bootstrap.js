'use strict';

const slugify = require('slugify');

/**
 * Este bootstrap crea automáticamente las categorías base de Verde Oliva
 * cuando el proyecto se despliega (local o en Strapi Cloud).
 */
module.exports = async ({ strapi }) => {
  const baseCategorias = [
    'Mujer',
    'Hombre',
    'Calzado',
    'Complementos',
    'Nueva Colección',
    'Ofertas',
  ];

  strapi.log.info('🚀 [Bootstrap] Comprobando categorías base Verde Oliva...');

  try {
    // Esperar a que Strapi esté completamente listo (importante para Cloud)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Buscar las categorías ya existentes
    const existentes = await strapi.db.query('api::categoria.categoria').findMany();

    for (const nombre of baseCategorias) {
      const existe = existentes.find(
        (c) => c.nombre.toLowerCase() === nombre.toLowerCase()
      );

      if (!existe) {
        const slug = slugify(nombre, { lower: true, strict: true });

        await strapi.db.query('api::categoria.categoria').create({
          data: {
            nombre,
            slug,
            seo_titulo: `${nombre} | Verde Oliva Atelier`,
            seo_descripcion: `Descubre la colección ${nombre} de Verde Oliva Atelier. Moda y estilo únicos.`,
            publishedAt: new Date(),
          },
        });

        strapi.log.info(`✅ Categoría creada: ${nombre}`);
      } else {
        strapi.log.info(`⚠️ Ya existía: ${nombre}`);
      }
    }

    strapi.log.info('✨ [Bootstrap] Categorías de Verde Oliva listas.');
  } catch (err) {
    strapi.log.error('❌ Error al crear categorías base:', err);
  }
};
