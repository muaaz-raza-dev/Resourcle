export const whitelist = [
  'https://canva.com',
  'https://netflix.com',
  'https://netflix.com',
  'https://github.com',
  'https://google.com',
  'https://vercel.com',
  'https://udemy.com',
  'https://udemy.com',
  'https://coursera.org',
  'https://khanacademy.org',
  'https://linkedin.com',
  'https://edx.org',
  'https://skillshare.com',
  'https://medium.com'
];

export function isWhitelisted(url:string):boolean {
  const GenericURI = url.split("www.").join("")
  return whitelist.some((trustedUrl) => GenericURI.startsWith(trustedUrl));
}

