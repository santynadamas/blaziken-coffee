// lib/queries.ts


export const getProductsQuery = `
  *[_type == "product" && available == true
    && (!defined($origin) || origin == $origin)
    && (!defined($taste) || taste == $taste)
  ]{
    _id,
    name,
    description,
    price,
    image,
    slug,
    available,
    origin,
    taste,
    category->{_id,name,slug,image}
  }
`;

export const getProductBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
    price,
    image,
    slug,
    available,
    origin,
    taste,
    category->{_id,name,slug,image}
  }
`;

export const getCategoriesQuery = `
  *[_type == "category"]{
    _id,
    name,
    slug,
    description,
    image
  }
`;

export const getProductsByCategoryQuery = `
  *[_type == "product"
    && category->slug.current == $categorySlug
    && available == true
  ]{
    _id,
    name,
    description,
    price,
    image,
    slug,
    available,
    origin,
    taste,
    category->{_id,name,slug,image}
  }
`;