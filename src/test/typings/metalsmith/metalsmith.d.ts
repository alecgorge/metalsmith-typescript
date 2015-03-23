
declare class Metalsmith {
  constructor(directory: string);

  directory: string;
  source: string;
  destination: string;
  clean: boolean;
  frontmatter: boolean;

  use(plugin: (files, metalsmith, done) => any): Metalsmith;
  build(): any;
}

declare module "metalsmith" {
  export = Metalsmith;
}
