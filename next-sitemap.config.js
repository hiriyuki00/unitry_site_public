/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://unitry.vercel.app",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.7,
};
