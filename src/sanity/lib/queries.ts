import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  ogImage,
  socialLinks
}`;

export const heroQuery = groq`*[_type == "hero"][0]{
  eyebrow,
  heading,
  description,
  ctaButtons,
  profileImage
}`;

export const bentoCardsQuery = groq`*[_type == "bentoCard"] | order(order asc){
  _id,
  title,
  iconName,
  colSpan,
  rowSpan,
  order
}`;

export const skillsQuery = groq`*[_type == "skill"] | order(order asc){
  _id,
  name,
  size,
  category,
  order
}`;

export const caseStudiesQuery = groq`*[_type == "caseStudy"] | order(order asc){
  _id,
  category,
  title,
  subtitle,
  description,
  result,
  order,
  link,
  slug,
  icon,
  featured,
  tags
}`;

export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  category,
  title,
  subtitle,
  description,
  result,
  order,
  link,
  slug,
  icon,
  featured,
  tags
}`;

export const experienceQuery = groq`*[_type == "experience"] | order(order asc){
  _id,
  title,
  company,
  period,
  description,
  order
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(order asc){
  _id,
  title,
  excerpt,
  image,
  category,
  featured,
  slug,
  content,
  order
}`;

export const ctaSectionQuery = groq`*[_type == "ctaSection"][0]{
  eyebrow,
  heading,
  buttonText,
  buttonLink
}`;
