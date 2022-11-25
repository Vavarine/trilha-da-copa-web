export function getHashParams(url: string) {
  const hash = url.split("#")?.[1];

  if (!hash) return {};

  const hashParams: any = {};
  let e: RegExpExecArray | null;

  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = url.split("#")[1];

  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }

  return hashParams;
}
