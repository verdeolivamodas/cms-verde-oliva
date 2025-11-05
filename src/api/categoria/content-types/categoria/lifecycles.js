const slugify = require("slugify");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.nombre) {
      data.slug = slugify(data.nombre, { lower: true, strict: true });
      if (!data.seo_titulo)
        data.seo_titulo = `${data.nombre} | Verde Oliva Atelier`;
      if (!data.seo_descripcion)
        data.seo_descripcion = `Descubre la colección ${data.nombre} de Verde Oliva Atelier. Moda y estilo únicos.`;
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.nombre) {
      data.slug = slugify(data.nombre, { lower: true, strict: true });
    }
  },
};
