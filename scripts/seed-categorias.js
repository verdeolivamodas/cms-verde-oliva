"use strict";

const strapiFactory = require("@strapi/strapi");

(async () => {
  // 🔹 CONFIGURACIÓN MÍNIMA EMBEBIDA
  process.env.NODE_ENV = "development";
  process.env.ADMIN_AUTH_SECRET = "verdealiva_admin_secret";
  process.env.APP_KEYS = "verdealiva1,verdealiva2";
  process.env.JWT_SECRET = "verdealiva_jwt_secret";
  process.env.TRANSFER_TOKEN_SALT = "verdealiva_transfer";
  process.env.API_TOKEN_SALT = "verdealiva_api_token";
  process.env.DATABASE_CLIENT = "sqlite";
  process.env.DATABASE_FILENAME = ".tmp/data.db";

  // 🔹 Iniciar Strapi manualmente
  const app = await strapiFactory.createStrapi();
  await app.start();

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
  await app.destroy();
  process.exit(0);
})();
