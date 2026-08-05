const subsidiaryRoutePrefixes = [
  "/agritech",
  "/sparrow-studio",
  "/fastrider",
  "/prime-college",
  "/fast-cleaners",
  "/spring-cooperative",
];

export function isSubsidiaryRoute(pathname: string) {
  return subsidiaryRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
