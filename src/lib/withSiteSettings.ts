import { GetStaticProps, GetStaticPropsContext } from "next";
import { fetchSiteSettings } from "@/lib/fetchSiteSettings";
import { ISiteSettings } from "@/common/interfaces/site-settings.interface";

export type PropsWithSite<P = Record<string, unknown>> = P & {
  siteSettings: ISiteSettings;
};

export function withSiteSettings<P extends Record<string, unknown> = Record<string, never>>(
  getStaticPropsFunc?: GetStaticProps<P>
): GetStaticProps<PropsWithSite<P>> {
  return async (context: GetStaticPropsContext) => {
    const siteSettings = await fetchSiteSettings();

    if (!getStaticPropsFunc) {
      return { props: { siteSettings } as PropsWithSite<P>, revalidate: 30 };
    }

    const result = await getStaticPropsFunc(context);

    if ("notFound" in result && result.notFound) return result;
    if ("redirect" in result && result.redirect) return result;

    const pageProps =
      "props" in result
        ? ((await result.props) as P)
        : ({} as P);

    return {
      props: { ...pageProps, siteSettings },
      revalidate: "revalidate" in result ? result.revalidate : 30,
    };
  };
}
