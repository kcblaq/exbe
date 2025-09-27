import { factories } from "@strapi/strapi";

const populate = {
  Blocks: {
    on: {
      "hero.hero": {
        populate: {
          featuredImage: {
            fields: ["url"],
          },
        },
      },
      "global.services-second-section": {
        populate: {
          serviceCards: {
            populate: {
              icon: {
                fields: ["url"],
              },
            },
          },
        },
      },
      "global.value-card": {
        populate: {
          cta: true,
        },
      },
      "global.testimonial-section": {
        populate: {
          testimonialCards: {
            populate: {
              profileImage: {
                fields: ["url"],
              },
            },
          },
        },
      },
      "global.faq-section": {
        populate: {
          faqs: true,
        },
      },
      "global.explore-more-services-section": {
        populate: {
          exploreMoreServiceCards: {
            populate: {
              exploreMoreServicesCta: true,
            },
          },
        },
      },
      "global.from-our-blog-section": {
        populate: {
          fromOurBlogCards: true,
        },
      },
      "global.need-to-take-action-section": {
        populate: ["cta"],
      },
    },
  },
};

export default factories.createCoreController(
  "api::service.service",
  ({ strapi }) => ({
    // Use regular function syntax to access `this`
    async findOne(ctx) {
  const { slug } = ctx.params;
  if (!slug) {
    return ctx.badRequest("Slug is required");
  }

  const entities = await strapi.documents("api::service.service").findMany({
    filters: { slug },
    populate: populate as any,
    limit: 1, // safeguard
  });

  if (!entities || entities.length === 0) {
    return ctx.notFound("Service not found");
  }

  const entity = entities[0];
  const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  return this.transformResponse(sanitizedEntity);
},


    async find(ctx) {
      const entities = await strapi.documents("api::service.service").findMany({
        populate: populate as any,
      });
      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
      return this.transformResponse(sanitizedEntities);
    },
  })
);
