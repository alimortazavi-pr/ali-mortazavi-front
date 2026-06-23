import Head from "next/head";
import { FC } from "react";
import { useSite } from "@/context/SiteContext";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

export const SEOHead: FC<SEOHeadProps> = ({ title, description, path = "" }) => {
  const site = useSite();
  const { profile, seo } = site;
  const fullTitle = title ? `${title} | ${profile.name}` : `${profile.name} | ${profile.title}`;
  const desc = description ?? seo.defaultDescription;
  const url = `${seo.siteUrl}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default SEOHead;
