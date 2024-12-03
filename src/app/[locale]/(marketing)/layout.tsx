export default async function Layout(props: { children: React.ReactNode }) {
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'RootLayout',
  // });

  return (
    // eslint-disable-next-line react/no-useless-fragment
    <>
      <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
    </>
  );
}
