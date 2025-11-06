'use strict';

const slugify = require('slugify');

/**
 * Bootstrap de depuración: muestra en los logs todas las categorías existentes
 * y crea las que falten (solo para pruebas o despliegues iniciales).
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
    // Esperar unos segundos (necesario en despliegues Cloud)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Leer todas las categorías existentes en la base de datos
    const existentes = await strapi.db.query('api::categoria.categoria').findMany();

    strapi.log.info(`📦 Categorías actualmente en la base de datos: ${existentes.length}`);

    if (existentes.length > 0) {
      strapi.log.info('📋 Listado de categorías existentes:');
      existentes.forEach((cat) => {
        strapi.log.info(`   • ${cat.id} → ${cat.nombre} (${cat.slug})`);
      });
    }

    // Crear solo las que falten
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
